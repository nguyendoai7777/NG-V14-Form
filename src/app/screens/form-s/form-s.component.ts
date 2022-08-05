import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface FormComponentGlobal {

}

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
  form: FormGroup<FormArrayInstance>;
  inputType: string[] = []
  options = [
    { label: 'Name', value: 'text' },
    { label: 'Birthday', value: 'datetime-local' },
    { label: 'Age', value: 'number' },
    { label: 'Gender', value: 'radio' },
  ];
  instance =  this.fb.nonNullable.group<FormProps>({
    name: this.fb.nonNullable.control(''),
    age: this.fb.nonNullable.control('text')
  });
  currentIndexChange!: number;
  constructor(private fb: FormBuilder) {
    this.form = fb.nonNullable.group<FormArrayInstance>({
     instance: (this.fb.nonNullable.array<FormProps>([])) as unknown as FormArray<FormGroup<FormProps>>
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(console.log)
  }

  getIndex(index: number) {
    // this.inputType[index] = (this.form.get('instance') as FormGroup)?.['controls'][index]?.get('age')?.value; without typing
    this.inputType[index] = this.form?.controls?.instance?.controls[index]?.controls?.age?.value
    this.currentIndexChange = index;
  }

  addNewAddressGroup() {
    (this.form.get('instance') as FormArray).push(
     this.instance
    );
    this.inputType.push('text')
  }

  get formArrayVal() {
    return this.form.controls?.['instance'] as FormArray;
  }

  deleteAddressGroup(index?: number) {
    console.log(this.form.getRawValue())
  }

}
