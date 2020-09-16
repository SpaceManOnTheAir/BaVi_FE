import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorsService } from 'src/app/services/instructors.service';
import { NgForm } from '@angular/forms';
import { Instructor } from 'src/app/models/instructor';


@Component({
  selector: 'app-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.css']
})
export class InstructorEditComponent implements OnInit {
  @ViewChild('f', { static: true }) frm: NgForm;
  aInstructor: Instructor = {} as Instructor;
  action: string;
  error: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private intructorService: InstructorsService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (Number(id) === 0) {
      this.aInstructor = { id: 0 } as Instructor;
      this.action = 'Add';
    } else {
      this.action = 'Edit';
      this.intructorService.getId(+id).subscribe(res => {

        this.aInstructor = res.data;
      });
    }
  }
  save() {
    if (this.frm.valid) {
      console.log("valid" + this.aInstructor.id);
      console.log(this.aInstructor);
      if (this.aInstructor.id === 0) {// add new
        this.intructorService.add(this.aInstructor).subscribe(res => {
          if (res.errorCode === 0) {
            //console.log('complete');
            this.router.navigate(['instructor']);
          }
          else {
            this.error = res.message;
          }
        });
      }
      else { //update
        this.intructorService.update(this.aInstructor).subscribe(res => {
          console.log(res.data);
          // this.aMajor = res.data;
          if (res.errorCode === 0) {
            this.router.navigate(['instructor']);
          }
          else {
            this.error = res.message;
          }
        });
      }
    }
    else {
      console.log("still invalid")
    }

  }
  checkRequired(str: string) {
    // if (value == null)
    // return '' + 'is-invalid'
    return str ? '' : 'is-invalid';
  }

}
