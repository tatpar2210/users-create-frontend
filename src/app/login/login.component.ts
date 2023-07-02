import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "./login.service"
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    errorMessage = '';

  _url = environment.baseURL

  constructor(private fb: FormBuilder, public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  navToForgotPassword() {
    this.router.navigate(['/', 'forgot-password'])
  }

  navToSignUp() {
    this.router.navigate(['/', 'create-user'])
  }

  submit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();
      this.loginService.login(data, true)
    }
  }

  get email() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
