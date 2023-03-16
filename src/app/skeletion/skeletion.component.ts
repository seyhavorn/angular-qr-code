import { Component } from '@angular/core';

@Component({
  selector: 'app-skeletion',
  templateUrl: './skeletion.component.html',
  styleUrls: ['./skeletion.component.css']
})
export class SkeletionComponent {

  isLoading: boolean = true;

  constructor() {
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
  }

}
