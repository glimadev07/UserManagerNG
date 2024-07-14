import { Component, OnInit } from '@angular/core';
import { Column } from './model/Column.model';
import { User } from './model/user.model';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

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
  userToDelete: User | null = null;

  showDialogResgiter = false;
  showDialogUpdate = false;
  showDialogDelete = false;
  userUpdate!: User;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadUsers({ first: 0, rows: this.rows });
  }

  paginate(event: any) {
    if (event.rows === undefined) {
      event.rows = this.rows;
    }
    const page = event.first! / event.rows!;
    this.userService.getUsers(page, event.rows!).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  loadUsers(event: LazyLoadEvent) {
    if (event.rows === undefined) {
      event.rows = this.rows;
    }
    const page = event.first! / event.rows!;
    this.userService.getUsers(page, event.rows!).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  showDelete(user: User) {
    this.userToDelete = user;
    this.showDialogDelete = true;
  }

  confirmDelete() {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete.id).subscribe({
        next: () => {
          console.log('Usuário excluído com sucesso');
          this.loadUsers({ first: 0, rows: this.rows }); // Recarregar usuários após exclusão
          this.showDialogDelete = false;
          this.userToDelete = null;
        },
        error: (error: any) => {
          console.error('Aconteceu um erro!', error);
          this.showDialogDelete = false;
        }
      });
    }
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

  getAtivoText(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
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
