import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  @Input() visible = false

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
