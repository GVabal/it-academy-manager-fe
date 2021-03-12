import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {addStudent} from '../../store/students/students.actions';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private store: Store,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      pictureUrl: [''],
      occupation: [''],
      direction: ['']
    });
  }

  get firstName(): FormControl {
    return this.studentForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.studentForm.get('lastName') as FormControl;
  }

  get pictureUrl(): FormControl {
    return this.studentForm.get('pictureUrl') as FormControl;
  }

  get occupation(): FormControl {
    return this.studentForm.get('occupation') as FormControl;
  }

  get direction(): FormControl {
    return this.studentForm.get('direction') as FormControl;
  }

  submitForm(): void {
    this.store.dispatch(addStudent(this.studentForm.value));
  }
}
