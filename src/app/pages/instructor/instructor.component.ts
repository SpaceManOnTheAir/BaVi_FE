import { Component, OnInit, ViewChild, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { InstructorsService } from 'src/app/services/instructors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Instructor } from 'src/app/models/instructor';
import { FormAction } from 'src/app/controls/enums/form-action.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
})
export class InstructorComponent implements OnDestroy, OnInit {
  instructors: Instructor[] = [];
  // @ViewChild('f', { static: true }) frm: NgForm;
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  aInstructor: Instructor = {} as Instructor;
  action: string;

  // Panigation declaration
  currentPage = 1;
  itemsPerPage = 5;

  //    datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  // reactive Form
  form: FormGroup;


  // tslint:disable-next-line: max-line-length
  constructor(private cdref: ChangeDetectorRef, private fb: FormBuilder, private instructorServices: InstructorsService, private pnotify: PnotifyService) { }

  ngOnInit(): void {
    this.dtOptions = {
      columnDefs: [{ orderable: false, targets: [0, 4, 5, 6, 7] }],
      order: [[1, 'asc']],
      rowCallback: (row: Node, data: any[] | object, index: number) => {
        try {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            const info = dtInstance.page.info();
            // console.log(info);
            $('td:first', row).html(`${info.start + index + 1}`);
          });
        }
        catch { console.log('Error'); }
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
      instructorCode: [{ value: this.aInstructor.code }
        , Validators.compose([Validators.required, Validators.minLength(3)])],
      instructorFirstName: [{ value: this.aInstructor.firstName },
      Validators.compose([Validators.required, Validators.minLength(3)])],
      instructorLastName: [{ value: this.aInstructor.lastName },
      Validators.compose([Validators.required, Validators.minLength(3)])],
      instructorPhone: [{ value: this.aInstructor.phone }],
      instructorEmail: [{ value: this.aInstructor.email },
      Validators.compose([Validators.required, Validators.email])],
      instructorGender: [{ value: this.aInstructor.gender },
      Validators.compose([Validators.required])]

    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // Also using with @AutoUnsubcribe
    this.dtTrigger.unsubscribe();
  }

  doDelete(event, id: number) {
    event.preventDefault();
    this.pnotify.confirm('Warning', 'Are you trying to delete this row?', ok => {
      if (ok) {
        this.instructorServices.delete(id).subscribe(res => {
          //  Revoke again
          this.loadData();
        });
      }
    });

  }
  showModal(id: number) {
    this.form.reset();
    if (id === 0) {
      this.aInstructor = { id: 0 } as Instructor;
      this.action = FormAction.ADD;
      this.editModal.show();
    }
    else {
      this.action = FormAction.EDIT;
      this.instructorServices.getId(+id).subscribe(res => {
        this.aInstructor = res.data;
        this.editModal.show();
      });
    }

  }
  hideModal() {
    this.editModal.hide();
  }
  save() {
    if (this.aInstructor.id === 0) {// add new
      this.instructorServices.add(this.aInstructor).subscribe(res => {
        //  this.aMajor = res.data;
        if (res.errorCode === 0) {
          this.pnotify.success('Info', 'Add successfully!');
          this.hideModal();
          this.loadData();
        }
      });
    }
    else { // update
      this.instructorServices.update(this.aInstructor).subscribe(res => {
        // this.aInstructor = res.data;
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
    this.instructorServices.getAll().subscribe(resAll => {
      this.instructors = resAll.data;
      this.dtTrigger.next();
    });
  }
  checkRequired(str: string) {
    // if (value == null)
    // return '' + 'is-invalid'
    return str ? '' : 'is-invalid';
  }

}
