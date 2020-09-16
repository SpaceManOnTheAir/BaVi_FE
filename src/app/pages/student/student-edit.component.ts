import { Component, OnInit, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @ViewChild('f',{static: true}) frm: NgForm;
  aStudent: Student = {} as Student;
  action: string;
  error: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService) { }

  ngOnInit(): void {
   // console.log(this.frm);




    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id) === 0) {
      this.aStudent = { id: 0 } as Student;
      this.action = 'Add';
    } else {
      this.action = 'Edit';
      this.studentService.getId(+id).subscribe(res => {

        this.aStudent = res.data;
      });
    }
  }
  save() {
    if (this.frm.valid) {
     // console.log("valid" + this.aStudent.id);
     // console.log(this.aStudent);
      if (this.aStudent.id === 0) {// add new
        this.studentService.add(this.aStudent).subscribe(res => {
          if (res.errorCode === 0) {
            //console.log('complete');
            this.router.navigate(['student']);
          }
          else {
            this.error = res.message;
          }
        });
      }
      else { //update
        this.studentService.update(this.aStudent).subscribe(res => {
       //   console.log(res.data);
          // this.aMajor = res.data;
          if (res.errorCode === 0) {
            this.router.navigate(['student']);
          }
          else {
            this.error = res.message;
          }
        });
      }
    }
    else {
      console.log("still invalid");
    }

  }
  checkRequired(str: string) {
    // if (value == null)
    // return '' + 'is-invalid'
    return str ? '' : 'is-invalid';
  }
}
