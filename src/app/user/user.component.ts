import { Component, OnInit } from '@angular/core';
import { Column } from './model/Column.model';
import { User } from './model/user.model';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api'; // Importando o tipo correto

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  title = 'UserManagerNG';

  users: User[] = [];
  cols: Column[] = [
    { field: 'nome', header: 'NOME' },
    { field: 'username', header: 'USERNAME' },
    { field: 'email', header: 'EMAIL' },
    { field: 'telefone', header: 'CONTATO' },
    { field: 'endereco', header: 'ENDEREÇO' },
    { field: 'ativo', header: 'ATIVO' },
    { field: 'operacoes', header: 'OPERAÇÕES' }
  ];

  rows = 10;
  totalRecords = 0;

  showDialogResgiter = false;
  showDialogUpdate = false;
  showDialogDelete = false;
  userUpdate!: User;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadUsers({ first: 0, rows: this.rows });
  }

  paginate(event: any) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    const page = first / rows;

    this.userService.getUsers(page, rows).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
        if (!Array.isArray(this.users)) {
          this.users = [];
        }
        this.users.forEach(user => {
          user.ativo = this.isAtivo(user.ativo);
        });
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  loadUsers(event: { first: number, rows: number }) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    const page = first / rows;

    this.userService.getUsers(page, rows).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
        if (!Array.isArray(this.users)) {
          this.users = [];
        }
        this.users.forEach(user => {
          user.ativo = this.isAtivo(user.ativo);
        });
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  getAtivoText(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
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

  registerUser(user: any) {
    this.createUser(user);
    this.showDialogResgiter = false;
  }

  updateUser(event: any) {
    console.log(event);
    this.showDialogUpdate = false;
  }

  isAtivo(ativo: boolean | string): boolean {
    return ativo === true || ativo === 'true';
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: (response: any) => {
        console.log('Usuário criado com sucesso:', response);
        this.loadUsers({ first: 0, rows: this.rows }); // Recarregar usuários após criar
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
