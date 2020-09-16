import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Major } from '../../models/major';
import { MajorService } from '../../services/major.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';

@AutoUnsubscribe()
@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent implements OnDestroy, OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  majors: Major[] = []; // import major From major Array
  aMajor: Major = {} as Major;
  message: string;

  // Panigation declaration
  p = 1;
  itemPerPage = 3;

  // Data Tables
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;


  // Reactive form
  form: FormGroup;

  constructor(private cdref: ChangeDetectorRef, private fb: FormBuilder,
    private majorService: MajorService, private pnotify: PnotifyService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      columnDefs: [{ orderable: false, targets: [0, 2] }],
      order: [[1, 'asc']],
      rowCallback: (row: Node, data: any[] | object, index: number) => {
        try {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            const info = dtInstance.page.info();
            //console.log(info);
            $('td:first', row).html(`${info.start + index +1}`);
          });
        }
        catch{ console.log('Error') }
        return row;
      },
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        paginate: {
          first: '<i class="fas fa-fast-backward"></i>',
          previous: '<i class="fas fa-step-backward"></i>',
          next: '<i class="fas fa-step-forward"></i>',
          last: '<i class="fas fa-fast-forward"></i>',
        },
      }

    };

    this.loadData();


    // build form
    this.form = this.fb.group({
      majorName: [{ value: this.aMajor.name }
        , [Validators.required, Validators.minLength(3)]]
    });

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  doDelete(event, id: number) {
    event.preventDefault();
    // this.majorService.delete(id).subscribe(res => {
    //   this.loadData();
    // });
    this.pnotify.confirm('Warning', 'Are you trying to delete this row?', ok => {
      if (ok) {
        this.majorService.delete(id).subscribe(res => {
          this.pnotify.success('Info', ' A row has been deleted!');
          this.loadData();
        });
      }
    });
  }
  showModal(id: Number) {
    this.form.reset();
    if (id === 0) {
      this.aMajor = { id: 0 } as Major;
      this.message = "Add";
      this.editModal.show();
    }
    else {
      this.message = "Edit";
      this.majorService.getId(+id).subscribe(res => {
        this.aMajor = res.data;
        this.editModal.show();
      });
    }

  }
  hideModal() {
    this.editModal.hide();
  }
  save() {
    if (this.aMajor.id === 0) {// add new
      this.majorService.add(this.aMajor).subscribe(res => {
        //  this.aMajor = res.data;
        if (res.errorCode === 0) {
          this.pnotify.success('Info', 'Add successfully!');
          this.hideModal();
          this.loadData();
        }
      });
    }
    else { // update
      this.majorService.update(this.aMajor).subscribe(res => {
        // this.aMajor = res.data;
        if (res.errorCode === 0) {
          this.pnotify.success('Info', 'Update successfully!');
          this.hideModal();
          this.loadData();
        }
      });
    }
  }
  loadData() {
    try {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
    catch {
    }
    //  Revoke again 
    this.majorService.getAll().subscribe(resAll => {
      this.majors = resAll.data;
      this.dtTrigger.next();

    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }







}
