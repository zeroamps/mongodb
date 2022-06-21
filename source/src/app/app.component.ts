import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  guid: FormControl;

  constructor(private clipboardApi: ClipboardService) {
    this.guid = new FormControl('00de21d3-6daf-487f-9f56-a924c53cd880', [
      Validators.required,
      Validators.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    ]);
  }

  ngOnInit(): void {
    this.guid.markAllAsTouched();
  }

  copyText(text: string, event: Event) {
    this.clipboardApi.copyFromContent(text);
    const element = event.target as HTMLElement;
    if (element.classList.contains('bi-clipboard')) {
      element.classList.replace('bi-clipboard', 'bi-clipboard-check');
    }
  }

  uuid(uuid: string) {
    var hex = uuid.replace(/[{}-]/g, '');
    return `BinData(4,'${this.hexToBase64(hex)}')`;
  }

  csuuid(uuid: string) {
    var hex = uuid.replace(/[{}-]/g, '');
    var a = hex.substr(6, 2) + hex.substr(4, 2) + hex.substr(2, 2) + hex.substr(0, 2);
    var b = hex.substr(10, 2) + hex.substr(8, 2);
    var c = hex.substr(14, 2) + hex.substr(12, 2);
    var d = hex.substr(16, 16);
    hex = a + b + c + d;
    return `BinData(3,'${this.hexToBase64(hex)}')`;
  }

  juuid(uuid: string) {
    var hex = uuid.replace(/[{}-]/g, '');
    var msb = hex.substr(0, 16);
    var lsb = hex.substr(16, 16);
    msb =
      msb.substr(14, 2) +
      msb.substr(12, 2) +
      msb.substr(10, 2) +
      msb.substr(8, 2) +
      msb.substr(6, 2) +
      msb.substr(4, 2) +
      msb.substr(2, 2) +
      msb.substr(0, 2);
    lsb =
      lsb.substr(14, 2) +
      lsb.substr(12, 2) +
      lsb.substr(10, 2) +
      lsb.substr(8, 2) +
      lsb.substr(6, 2) +
      lsb.substr(4, 2) +
      lsb.substr(2, 2) +
      lsb.substr(0, 2);
    hex = msb + lsb;
    return `BinData(3,'${this.hexToBase64(hex)}')`;
  }

  pyuuid(uuid: any) {
    var hex = uuid.replace(/[{}-]/g, '');
    return `BinData(3,'${this.hexToBase64(hex)}')`;
  }

  private hexToBase64(hex: string) {
    var base64Digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var base64 = '';
    var group;
    for (var i = 0; i < 30; i += 6) {
      group = parseInt(hex.substr(i, 6), 16);
      base64 += base64Digits[(group >> 18) & 0x3f];
      base64 += base64Digits[(group >> 12) & 0x3f];
      base64 += base64Digits[(group >> 6) & 0x3f];
      base64 += base64Digits[group & 0x3f];
    }
    group = parseInt(hex.substr(30, 2), 16);
    base64 += base64Digits[(group >> 2) & 0x3f];
    base64 += base64Digits[(group << 4) & 0x3f];
    base64 += '==';
    return base64;
  }
}
