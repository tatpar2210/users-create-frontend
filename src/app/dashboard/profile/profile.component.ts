import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog){}
  showUserData: any = [];
  edit: boolean = false
  profileImagePath: string | undefined
  formValid: boolean = true;


  userProfileForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    status: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    
  });

  async ngOnInit(): Promise<void> {
    console.log("hi")
    await this.profileService.fetchProfile().then((result)=> {
      console.log(result)
      this.showUserData = result
      this.profileImagePath = result.profile_pic || "../../../assets/images/profile.png"
      this.userProfileForm.controls['name'].setValue(result.name);
      this.userProfileForm.controls['email'].setValue(result.email);
      this.userProfileForm.controls['gender'].setValue(result.gender);
      this.userProfileForm.controls['status'].setValue(result.status);
      this.userProfileForm.controls['phone'].setValue(result.phone);
    })
  }

  async imageUpdate(event: any) {
    const ref = this.dialog.open(ImageCropDialogComponent, {
      width: '600px',
      height: 'auto',
      data: {
        event
      }
    });

    const file = await ref.afterClosed().toPromise();
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    var formData: any = new FormData();
    formData.append("profile-image", file);
    this.profileService.uploadProfileImage(formData).then((result) => {
    this.profileImagePath = result['path']

    })
  }
  
  removeImage() {
    this.profileService.deleteProfileImage()
    this.profileImagePath = "../../../assets/images/profile.png"
  }

  editButton() {
    this.edit = this.edit ? false : true;
  }

  saveButton() {
    this.formValid = this.userProfileForm.valid;
    if (this.formValid) {
      var post_data:any = this.userProfileForm.getRawValue()
      delete post_data.email
      delete post_data.status
      post_data.phone = String(post_data.phone)
      this.profileService.updateProfile(post_data)
      this.edit = this.edit ? false : true; 
    }
  }

  changePassword() {
    this.router.navigateByUrl('/dashboard/change-password');
  }

  cancelButton() {
    this.edit = this.edit ? false : true;
  }

  get name() {
    return this.userProfileForm.get('name');
  }

  get gender() {
    return this.userProfileForm.get('gender');
  }

  get phone() {
    return this.userProfileForm.get('phone');
  }

  get email() {
    return this.userProfileForm.get('email');
  }

  get status() {
    return this.userProfileForm.get('status');
  }
}
