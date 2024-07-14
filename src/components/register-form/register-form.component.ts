import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from '../../app/app.component';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { UserService } from '../../app/service/user.service';

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
  isMaster = false;
  isAtivo = false;

  constructor(private fb: FormBuilder, private userService: UserService) {

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
    const objToSend = this.userForm.getRawValue()
    objToSend.isMaster = this.isMaster
    objToSend.ativo = this.isAtivo
    this.confirm.emit(objToSend);
  }

  private initForm(){
    this.userForm = this.fb.group({
      nome: [''],
      username: [''],
      email: [''],
      ativo: [this.isAtivo],
      telefone: [''],
      endereco: [''],
      senha: [''],
      confirmarSenha: [''],
      isMaster: [this.isMaster]
    });
  }
}
