import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UserManagerNG';

  false = false;

  showDialogDelete = false

  showDialog() {
    this.showDialogDelete = true;
  }

  deleteUser(){
    console.log("deletado");
    this.showDialogDelete = false;
  }
}
