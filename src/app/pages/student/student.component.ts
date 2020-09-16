import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Student } from './../../models/student';
import { StudentService } from 'src/app/services/student.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PnotifyService } from 'src/app/utils/pnotify.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, forkJoin, Observable } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Major } from 'src/app/models/major';
import { MajorService } from 'src/app/services/major.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnDestroy, OnInit {
  @ViewChild('f', { static: true }) frm: NgForm;
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  students: Student[] = [];
  majors: Major[] = [];
  selectedMajor = 0;
  aStudent: Student = {} as Student;
  action: string;

  // Panigation declaration
  currentPage = 1;
  itemsPerPage = 5;

  //    datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isNew = true;
  // reactive Form
  form: FormGroup;
  constructor(private majorService: MajorService, private cdref: ChangeDetectorRef, private fb: FormBuilder, private studentService: StudentService, private pnotify: PnotifyService) { }

  ngOnInit(): void {

    const majorsOb = this.majorService.getAll();
    const studentsOb = this.studentService.getByMajor(0);
    // tslint:disable-next-line: deprecation
    forkJoin(majorsOb, studentsOb).subscribe(([majorsRes, studentsRes]) => {
      this.majors = majorsRes.data;
      this.students = studentsRes.data;
    });

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
      studentStuID: [{ value: this.aStudent.stuId }
        , Validators.compose([Validators.required, Validators.minLength(3)])],
      studentFirstName: [{ value: this.aStudent.firstName },
      Validators.compose([Validators.required, Validators.minLength(3)])],
      studentLastName: [{ value: this.aStudent.lastName },
      Validators.compose([Validators.required, Validators.minLength(3)])],
      studentPhone: [{ value: this.aStudent.phone }],
      studentEmail: [{ value: this.aStudent.email },
      Validators.compose([Validators.required, Validators.email])],
      studentGender: [{ value: this.aStudent.gender },
      Validators.compose([Validators.required])],
      studentMajor: [{ value: this.aStudent.majorId }, Validators.required]

    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    // Also using with @AutoUnsubcribe
    this.dtTrigger.unsubscribe();
  }

  doDelete(event, id: number) {
    event.preventDefault();
    this.pnotify.confirm("Warning", "Are you trying to delete this row?", ok => {
      if (ok) {
        this.studentService.delete(id).subscribe(res => {
          this.reloadData();
        });
      }


    });
  }

  // tslint:disable-next-line: ban-types
  showModal(id: Number) {
    this.form.reset();
    if (id === 0) {
      this.aStudent = { id: 0 } as Student;
      this.action = 'Add';
      this.editModal.show();
      // this.form.get('studentStuID').enable();

    }
    else {
      this.action = 'Edit';
      this.isNew = false;
      // this.form.get('studentStuID').disable();
      this.studentService.getId(+id).subscribe(res => {
        this.aStudent = res.data;
        this.editModal.show();
      });
    }

  }
  hideModal() {
    this.selectedMajorChange();
    this.editModal.hide();

  }
  getMajorName(id: number) {
    return this.majors.find(x => x.id === id).name;
  }
  save() {
    if (this.aStudent.id === 0) {// add new
      this.studentService.add(this.aStudent).subscribe(res => {
        //console.log(res.data);
        if (res.errorCode === 0) {
          this.pnotify.success('Info', 'Add successfully!');
          this.hideModal();
          this.reloadData();
        }
      });
    }
    else { // update
      this.studentService.update(this.aStudent).subscribe(res => {
        // this.aMajor = res.data;
        if (res.errorCode === 0) {
          this.pnotify.success('Info', 'Update successfully!');
          this.hideModal();
          this.reloadData();
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
    this.studentService.getAll().subscribe(resAll => {
      this.students = resAll.data;
      this.dtTrigger.next();
    });


  }
  reloadData() {
    this.studentService.getAll().subscribe(resAll => {
      this.students = resAll.data;
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  selectedMajorChange() {
    this.studentService.getByMajor(this.selectedMajor).subscribe(res => {
      this.students = res.data;
      // console.log(this.selectedMajor);
      // console.log(res.data);
    });
  }
}
