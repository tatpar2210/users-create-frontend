import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageCropperModule} from 'ngx-image-cropper';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, ImageCropDialogComponent],
  imports: [
    CommonModule,
    ImageCropperModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
