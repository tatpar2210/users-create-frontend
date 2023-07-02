import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateUserService } from './create-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[1-9]{1}\d{9}$/)]],
    gender: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  errorMessage = '';
  examKey = '';
  loginLink = '/login';
  customErrors: any = {};

  constructor(private fb: FormBuilder, public createUserService: CreateUserService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm.reset();
  }

  navToLogin() {
    this.router.navigate(['/', 'login'])
  }

  loadData() {}

  submit() {
    console.log(this.signUpForm.valid)
    if (this.signUpForm.valid) {
      const data = this.signUpForm.getRawValue();
      this.customErrors = {};
      data.phone = String(data.phone)
      this.createUserService.register(data);
    }
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get gender() {
    return this.signUpForm.get('gender');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}
