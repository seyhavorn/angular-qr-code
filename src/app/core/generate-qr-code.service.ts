import { Injectable } from '@angular/core';
import * as QRCodeGenerator from 'qrcode-generator';

@Injectable({
  providedIn: 'root'
})
export class GenerateQrCodeService {

  generateQRCode(text: string): string {
    const qr = QRCodeGenerator(0, 'L');
    qr.addData(text);
    qr.make();
    return qr.createDataURL();
  }
}
