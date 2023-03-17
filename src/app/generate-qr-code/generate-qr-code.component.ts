import { Component, OnInit } from '@angular/core';
import { GenerateQrCodeService } from '../core/generate-qr-code.service';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.css'],
})
export class GenerateQrCodeComponent implements OnInit {
  qrCodeDataURL: any;

  constructor(
    private generateQrCodeService: GenerateQrCodeService,
  ) {
  }

  ngOnInit(): void {
    const value = 'https://www.youtube.com/';
    this.qrCodeDataURL = this.generateQrCodeService.generateQRCode(value);
  }
}
