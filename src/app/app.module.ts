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

@NgModule({
  declarations: [
    AppComponent,
    SkeletionComponent,
    GenerateQrCodeComponent,
    QrCodeMdsHashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    GenerateQrCodeService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
