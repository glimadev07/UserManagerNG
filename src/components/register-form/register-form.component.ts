import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefone: ['', Validators.maxLength(15)],
      endereco: ['', Validators.maxLength(255)],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      isMaster: [false],
      ativo: [false]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { notMatching: true };
  }
}
