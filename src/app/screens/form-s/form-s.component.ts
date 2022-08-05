import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface FormArrayInstance {
  instance: FormArray<FormGroup<FormProps>>;
}

interface FormProps {
  name: FormControl<string>;
  age: FormControl<string>;
}


@Component({
  selector: 'app-form-s',
  templateUrl: './form-s.component.html',
  styleUrls: ['./form-s.component.scss']
})
export class FormSComponent implements OnInit {
  form!: FormGroup<FormArrayInstance>;
  inputType: string[] = []
  options = [
    { label: 'Name', value: 'text' },
    { label: 'Birthday', value: 'datetime-local' },
    { label: 'Age', value: 'number' },
    { label: 'Gender', value: 'radio' },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = new FormGroup<FormArrayInstance>({
      instance: new FormArray<FormGroup<FormProps>>([])
    });
    console.log(this.form)
  }

  getIndex(index: number) {
    this.inputType[index] = this.form?.controls?.instance?.controls[index]?.controls?.age?.value;

  }

  addNewAddressGroup() {
    (this.form.get('instance') as FormArray).push(
      new FormGroup<FormProps>({
        name: new FormControl('', {nonNullable: true}),
        age:  new FormControl('text', {nonNullable: true}),
      })
    );
    this.inputType.push('text')
    console.log(this.formArrayVal )
  }

  get formArrayVal() {
    // return this.form.controls?.['instance'] as FormArray;
    return this.form.controls?.['instance'].controls as FormGroup<FormProps>[];
  }

  deleteAddressGroup(index?: number) {
    console.log(this.form.getRawValue())
  }

}
