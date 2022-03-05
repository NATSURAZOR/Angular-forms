import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  constructor(
    private fb: FormBuilder,
    private _registrationService: RegistrationService
  ) {}

  get userName() {
    return this.registrationForm.get('userName');
  }

  get userSurname() {
    return this.registrationForm.get('userSurname');
  }

  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }

  get userEmail() {
    return this.registrationForm.get('userEmail');
  }

  get userPhone() {
    return this.registrationForm.get('userPhone');
  }

  registrationForm = this.fb.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        // and we can add another forbidden words
        forbiddenNameValidator(/password/),
        forbiddenNameValidator(/admin/),
        forbiddenNameValidator(/name/),
        Validators.pattern,
      ],
    ],
    userSurname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        // and we can add another forbidden words
        forbiddenNameValidator(/password/),
        forbiddenNameValidator(/admin/),
        forbiddenNameValidator(/name/),
        Validators.pattern,
      ],
    ],
    dateOfBirth: ['', [Validators.required, Validators.pattern]],
    userEmail: [
      '',
      [
        Validators.minLength(5),
        Validators.maxLength(50),
        forbiddenNameValidator(/admin@gmail.com/),
        forbiddenNameValidator(/password@gmail.com/),
        Validators.pattern,
      ],
    ],
    userPhone: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern,
      ],
    ],
  });

  onSubmit() {
    this.registrationForm.reset();
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value).subscribe(
      (response) => console.log('Success!', response),
      (error) => console.error('Error!', error)
    );
    alert('You have Successfully Registered for Vaccination');
  }
}
