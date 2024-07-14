// src/app/register-form/register-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../app/service/user.service';
import { User } from '../../app/user/model/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() visible = false;
  @Input() user!: User;

  @Output() onHide: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<any> = new EventEmitter();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.initForm();
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  isUpdate() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  hideModal() {
    this.onHide.emit();
    this.userForm.reset();
  }

  confirmButton() {
    if (this.userForm.valid) {
      this.confirm.emit(this.userForm.value);
    }
  }

  private initForm() {
    this.userForm = this.fb.group({
      nome: [''],
      username: [''],
      email: [''],
      telefone: [''],
      endereco: [''],
      senha: [''],
      confirmarSenha: [''],
      isMaster: [false],
      ativo: [false]
    });
  }
}
