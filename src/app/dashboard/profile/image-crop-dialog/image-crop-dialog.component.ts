import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ImageCroppedEvent, ImageCropperComponent, ImageTransform, LoadedImage} from 'ngx-image-cropper';
import {faExchangeAlt, faSort, faSync, faUndo} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: './image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.scss']
})
export class ImageCropDialogComponent implements OnInit {
  @ViewChild('imageCropper') imageCropper: ImageCropperComponent | undefined;
  imageChangedEvent: any;
  croppedImage: any;
  icons = {
    rotateLeft: faUndo,
    flipH: faExchangeAlt
  }
  transform: ImageTransform = {};
  canvasRotation = 0;
  constructor(public dialogRef: MatDialogRef<ImageCropDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.imageChangedEvent = this.data.event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  submit() {
    this.close(this.base64ToFile(this.croppedImage));
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  base64ToFile(data: any, filename?: string) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    if (!filename) {
      filename = '_profile.jpeg';
    }

    return new File([u8arr], filename, {
      type: mime
    });
  }
}
