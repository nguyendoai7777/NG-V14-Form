import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface FormArrayInstance {
  instance: FormArray<FormGroup<FormProps>>;
}

interface FormProps {
  name: FormControl<string>;
  type: FormControl<string>;
  selectedType: FormControl<string>;
}


@Component({
  selector: 'app-form-s',
  templateUrl: './form-s.component.html',
  styleUrls: ['./form-s.component.scss']
})
export class FormSComponent implements OnInit {
  form: UntypedFormGroup;
  inputType: string[] = []
  options = [
    { label: 'Name', value: 'text' },
    { label: 'Birthday', value: 'datetime-local' },
    { label: 'Age', value: 'number' },
    { label: 'Gender', value: 'radio' },
  ];
  currentIndexChange!: number;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      instance: fb.array([]),
    });
  }

  ngOnInit() {}

  getIndex(index: number) {
    this.inputType[index] = (this.form.get('instance') as FormGroup)?.['controls'][index]?.get('age')?.value;
    this.currentIndexChange = index;
  }

  addNewAddressGroup() {
    (this.form.get('instance') as FormArray).push(
      this.fb.group({
        name: [],
        age: ['text'],
      })
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
