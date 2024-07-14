import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from '../../app/app.component';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() visible = false;
  @Input() user!: user;


  @Output() onHide: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<void> = new EventEmitter();


  userForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();

  }

  isUptade(){
    if(this.user){
      this.userForm.patchValue(this.user)
    }
  }

  hideModal(){
    this.onHide.emit();
    this.userForm.reset();
  }

  confirmButton(){
    this.confirm.emit(this.userForm.value);
  }

  private initForm(){
    this.userForm = this.fb.group({
      nome: [''],
      username: [''],
      email: [''],
      ativo: [''],
      telefone: [''],
      endereco: [''],
      senha: [''],
      confirmarSenha: [''],
    });
  }

}
