import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkeletionComponent } from './skeletion/skeletion.component';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { GenerateQrCodeService } from './core/generate-qr-code.service';
import { DatePipe } from '@angular/common';
import { QrCodeMdsHashComponent } from './qr-code-mds-hash/qr-code-mds-hash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    SkeletionComponent,
    GenerateQrCodeComponent,
    QrCodeMdsHashComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    WebcamModule,
    ImageCropperModule
  ],
  providers: [
    GenerateQrCodeService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
