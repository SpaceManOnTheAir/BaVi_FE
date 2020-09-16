import { Component, OnInit } from '@angular/core';
import { Major } from '../../models/major';
import { ActivatedRoute, Router } from '@angular/router';
import { MajorService } from 'src/app/services/major.service';


@Component({
  selector: 'app-major-edit',
  templateUrl: './major-edit.component.html',
  styleUrls: ['./major-edit.component.css']
})

export class MajorEditComponent implements OnInit {
  aMajor: Major = {} as Major;
  message: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private majorService: MajorService) {
    
     }



  ngOnInit(): void {
   
    // const id = this.route.snapshot.paramMap.get('id');  //   CATCH THE ID 
    // if (Number(id) === 0) {
    //   this.aMajor = { id: 0 } as Major;
    //   this.message = 'Add';
    // }
    // else {
    //   this.message = 'Edit';
    //   this.majorService.getId(+id).subscribe(res => {
    //     this.aMajor = res.data;
    //   });
    // }
   
  }
  // save() {
  //   if (this.aMajor.id === 0) {// add new
  //     this.majorService.add(this.aMajor).subscribe(res => {
  //       //this.aMajor = res.data;
  //       if (res.errorCode === 0) {
  //         this.router.navigate(['major']);
  //       }
  //     });
  //   }
  //   else { //update
  //     this.majorService.update(this.aMajor).subscribe(res => {
  //       // this.aMajor = res.data;
  //       if (res.errorCode === 0) {
  //         this.router.navigate(['major']);
  //       }
  //     });
  //   }
  // }


}
