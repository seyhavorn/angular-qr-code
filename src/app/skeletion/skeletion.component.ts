import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { ImageCroppedEvent, CropperPosition } from 'ngx-image-cropper';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-skeletion',
  templateUrl: './skeletion.component.html',
  styleUrls: ['./skeletion.component.css']
})
export class SkeletionComponent {
  // public webcamImage: WebcamImage;
  public showWebcam = true;
  public showCropper = false;
  // public cropperPosition: CropperPosition;
  // public cropperWidth: number;
  // public cropperHeight: number;

  

  constructor(
    private webcamImage: WebcamImage,
    public cropperPosition: CropperPosition
  ) {}

  // public capturePhoto(): void {
  //   const constraints: MediaStreamConstraints = {
  //     video: { facingMode: 'environment' },
  //     audio: false
  //   };
  //   console.log('constraints', constraints);

  //   navigator.mediaDevices.getUserMedia(constraints)
  //   .then(stream => {
  //     const video = this.videoElement.nativeElement;
  //     video.srcObject = stream;
  //     video.play();
  //     const webcamImage: WebcamImage = new WebcamImage('', '', new ImageData(1, 1));
  //     const captureButton = document.querySelector('#button-capture')
  //     captureButton.addEventListener('click', () => {
  //       const canvas = document.createElement('canvas');
  //       canvas.width = video.videoWidth;
  //       canvas.height = video.videoHeight;
  //       canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  //       const imageDataUrl: string = canvas.toDataURL();
  //       webcamImage.imageAsDataUrl = imageDataUrl;
  //       this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(imageDataUrl);
  //       console.log('this photo url', this.photoUrl);

  //       stream.getTracks().forEach(track => track.stop());
  //       video.srcObject = null;
  //       captureButton.remove();
  //       canvas.remove();
  //     });
  //   })
  //   .catch(error => {
  //     console.error('Error capturing photo:', error);
  //   });
  // }
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImageCapture(image: WebcamImage): void {
    this.showWebcam = false;
    this.showCropper = true;
    this.webcamImage = image;
    // this.croppedImage = this.webcamImage.imageAsDataUrl;
  }
  

  public handleImageCropped(event: ImageCroppedEvent): void {
    this.showCropper = false;
    this.showWebcam = true;
    this.webcamImage = {
      imageAsDataUrl: event.base64,
      width: event.width,
      height: event.height
    };
  }

  
  // snapshot(event: WebcamImage) {
  //   console.log(event);
  //   this.previewImage = event.imageAsDataUrl;
  //   this.btnLabel = 'Re capture image'
  // }

  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 500,
        height: 500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  // captureImage() {
  //   this.trigger.next();
  // }

  proceed() {
    console.log(this.previewImage);
  }

}
