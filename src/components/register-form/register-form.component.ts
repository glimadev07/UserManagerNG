import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from '../../app/app.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input() visible = false;
  @Input() user!: user;


  @Output() onHide: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<void> = new EventEmitter();




  constructor() { }

  ngOnInit() {
  }

  hideModal(){
    this.onHide.emit();
  }

  confirmButton(){
    this.confirm.emit();
  }

}
