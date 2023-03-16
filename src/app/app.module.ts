import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkeletionComponent } from './skeletion/skeletion.component';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { GenerateQrCodeService } from './core/generate-qr-code.service';

@NgModule({
  declarations: [
    AppComponent,
    SkeletionComponent,
    GenerateQrCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    GenerateQrCodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
