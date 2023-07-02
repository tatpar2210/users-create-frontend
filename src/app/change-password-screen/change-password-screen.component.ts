import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../dashboard/profile/profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-change-password-screen',
  templateUrl: './change-password-screen.component.html',
  styleUrls: ['./change-password-screen.component.scss'],
})
export class ChangePasswordScreenComponent implements OnInit {
  loginForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, public dialog: MatDialog, private loginService: LoginService, private profileService: ProfileService) {}

  ngOnInit(): void {}

  async submit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();

      if(data.currentPassword != data.newPassword){
        if(data.newPassword === data.confirmNewPassword){
          this.errorMessage = ""
          
          this.profileService.changePassword({password: data.currentPassword, newPassword: data.newPassword}).then((result) => {
            console.log(result)
          })
        }else{
          this.errorMessage = "New Password and Confirm New password must be same"
        }
      }else {
        this.errorMessage = "New Password can't be same as Current Password"
      }

    }
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/profile-screen/RishabhJain2210T3');
  }

  get currentPassword() {
    return this.loginForm.get('currentPassword');
  }

  get newPassword() {
    return this.loginForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.loginForm.get('confirmNewPassword');
  }
}
