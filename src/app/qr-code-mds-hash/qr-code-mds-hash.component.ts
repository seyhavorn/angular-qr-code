import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import * as CryptoJS from 'crypto-js';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qr-code-mds-hash',
  templateUrl: './qr-code-mds-hash.component.html',
  styleUrls: ['./qr-code-mds-hash.component.css'],
})
export class QrCodeMdsHashComponent implements OnInit {
  formGroup: any;
  today: Date = new Date();
  dataToday: any;
  code: string = 'TGCXBRQ5';
  qrCodeDataUrl: string = '';
  data: any;
  day: any;
  image: any;
  qrValue: any;

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder) {
    const img = new Image();
    const value = (img.src = '../../assets/brand.png');
    this.image = value;

    this.dataToday = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.day = this.datePipe.transform(this.today, 'dd');
  }

  ngOnInit(): void {
    this.initForm();
    const qrValue = `${this.dataToday}` + '-' + `${this.code}`;
    const hash = CryptoJS.MD5(qrValue).toString();
    console.log('qrValue', qrValue);
    this.data = hash;
    this.generateQRCodeWithMD5(hash);

    // this.generateQRCode(hash, this.image);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const dataPick = this.formGroup.value;
      const qrValue = `${dataPick.date}` + '-' + `${this.code}`;
      this.day = this.datePipe.transform(dataPick.date, 'dd');
      console.log('this day', this.day);
      
      console.log(qrValue);
    }
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      date: [null, Validators.required],
    });
  }

  downloadQrCode() {
    const linkElement = document.getElementById(
      'downloadButton'
    ) as HTMLAnchorElement;
    linkElement.href = this.qrCodeDataUrl;
    linkElement.download = this.day;
  }

  generateQRCodeWithMD5(data: string) {
    QRCode.toDataURL(data, { scale: 4, width: 300, margin: 1 }, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        this.qrCodeDataUrl = url;
      }
    });
  }

  generateQRCode(data: string, imageUrl: string): void {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    QRCode.toCanvas(
      data,
      { scale: 4, width: 500, margin: 1 },
      (err, qrCodeCanvas) => {
        if (err) {
          console.error(err);
          return;
        }

        if (!context) {
          console.error('Could not create canvas context');
          return;
        }

        // Set the size of the combined image
        const canvasWidth = 500;
        const canvasHeight = 500;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Draw the QR code image onto the combined canvas
        const qrCodeWidth = qrCodeCanvas.width;
        const qrCodeHeight = qrCodeCanvas.height;
        const qrCodeX = (canvasWidth - qrCodeWidth) / 2;
        const qrCodeY = (canvasHeight - qrCodeHeight) / 2;
        context.drawImage(qrCodeCanvas, qrCodeX, qrCodeY);

        // Load the image to be placed in the center of the QR code
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
          // Draw the image onto the combined canvas at the center of the QR code
          const imageWidth = 60;
          const imageHeight = 60;
          const imageX = (canvasWidth - imageWidth) / 2;
          const imageY = (canvasHeight - imageHeight) / 2;
          context.drawImage(image, imageX, imageY, imageWidth, imageHeight);

          // Convert the combined canvas to a data URL and display it
          const dataUrl = canvas.toDataURL();
          console.log('canvas.toDataURL', dataUrl);

          const combinedImage = document.createElement('img');
          combinedImage.src = dataUrl;
          document.body.appendChild(combinedImage);
        };
        image.onerror = (err) => {
          console.error(err);
        };
        image.src = imageUrl;
      }
    );
  }

//   import JSZip from 'jszip';
// import QRCode from 'qrcode';

// function generateQRCode(date) {
//   return new Promise((resolve, reject) => {
//     QRCode.toDataURL(date, { scale: 4, width: 400, margin: 1 }, (err, url) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(url);
//       }
//     });
//   });
// }

// async function generateQRCodeZipFile(dates) {
//   const zip = new JSZip();

//   for (const date of dates) {
//     try {
//       const url = await generateQRCode(date);
//       zip.file(`${date}.png`, url.split(',')[1], { base64: true });
//     } catch (err) {
//       console.error(`Failed to generate QR code for ${date}: ${err}`);
//     }
//   }

//   const content = await zip.generateAsync({ type: 'blob' });
//   const url = window.URL.createObjectURL(content);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'qr_codes.zip';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   window.URL.revokeObjectURL(url);
// }

// const dates = ['2022-01-01', '2022-01-02', '2022-01-03'];
// generateQRCodeZipFile(dates);

}
