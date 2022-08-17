import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnInit {

  tdForm = new FormGroup({
    gender: new FormControl('Female'),
    code: new FormControl('Angular'),
    fName: new FormControl('Ngoc'),
    lName: new FormControl('Doai'),
    dob: new FormControl('V'),
    email: new FormControl('nguyendoai7777@gmail.com'),
    phone: new FormControl('0336224228')
  })

  constructor() { }

  ngOnInit(): void {
    this.addOne();
  }
  addOne() {
    for (const key in this.tdForm.controls) {
      const controlName = key as keyof typeof this.tdForm.controls;
      if(key) {
        const valueField = (this.tdForm.controls[controlName]).value;
        console.log(controlName, '-->', valueField)
      }
    }
  }

}
