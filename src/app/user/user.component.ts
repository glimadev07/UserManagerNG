import { Component, OnInit } from '@angular/core';
import { Column } from './model/Column.model';
import { User } from './model/user.model';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  title = 'UserManagerNG';

  users!: User[]

  cols: Column[] = [
    { field: 'nome', header: 'NOME' },
    { field: 'username', header: 'USERNAME' },
    { field: 'email', header: 'EMAIL' },
    { field: 'telefone', header: 'CONTATO' },
    { field: 'endereco', header: 'ENDEREÇO' },
    { field: 'ativo', header: 'ATIVO' },
    { field: 'operacoes', header: 'OPERAÇÕES' }
  ];

  showDialogResgiter = false;
  showDialogUpdate = false;
  showDialogDelete = false;
  userUpdate!: User;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  showDelete(user: User) {
    this.showDialogDelete = true;
  }

  showUpdateUser(user: User) {
    this.showDialogUpdate = true;
    this.userUpdate = user;
  }

  showRegisterUser() {
    this.showDialogResgiter = true;
  }

  deleteUser() {
    this.showDialogDelete = false;
  }

  registerUser(user: User) {
    this.createUser(user);
    this.showDialogResgiter = false;
  }

  updateUser(event: any) {
    console.log(event);
    this.showDialogUpdate = false;
  }

  isAtivo(ativo: boolean) {
    return ativo ? 'ATIVO' : 'INATIVO';
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.users.forEach(user => {
          user.ativo = this.isAtivo(user.ativo) === 'ATIVO';
        });
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: (response: any) => {
        console.log('Usuário criado com sucesso:', response);
      },
      error: (error: any) => {
        console.error('Aconteceu um erro!', error);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
