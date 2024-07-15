import { Component, OnDestroy, OnInit } from '@angular/core';
import { Column } from './model/Column.model';
import { User } from './model/user.model';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  title = 'UserManagerNG';

  private subscriptions: Subscription[] = [];

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
  items!: MenuItem[];
  username!: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.username = this.authService.getCurrentUser().username;
    this.items = [
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
    this.loadUsers({ first: 0, rows: this.rows });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  paginate(event: any) {
    if (event.rows === undefined) {
      event.rows = this.rows;
    }
    const page = event.first! / event.rows!;
    const sub = this.userService.getUsers(page, event.rows!).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
      },
      error: (error: any) => {
        console.error('Aconteceu um erro!', error);
      }
    });
    this.subscriptions.push(sub);
  }

  loadUsers(event: LazyLoadEvent) {
    if (event.rows === undefined) {
      event.rows = this.rows;
    }
    const page = event.first! / event.rows!;
    const sub = this.userService.getUsers(page, event.rows!).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
      },
      error: (error: any) => {
        console.error('Aconteceu um erro!', error);
      }
    });
    this.subscriptions.push(sub);
  }

  showDelete(user: User) {
    this.userToDelete = user;
    this.showDialogDelete = true;
  }

  confirmDelete() {
    if (this.userToDelete) {
      const sub = this.userService.deleteUser(this.userToDelete.id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Usuário excluído com sucesso');
          this.loadUsers({ first: 0, rows: this.rows });
          this.showDialogDelete = false;
          this.userToDelete = null;
        },
        error: (error: any) => {
          this.notificationService.showError('Erro ao excluir o usuário');
          this.showDialogDelete = false;
        }
      });
      this.subscriptions.push(sub);
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

  registerUser(user: User) {
    this.users.unshift(user);
    this.totalRecords += 1;
    this.showDialogResgiter = false;
    this.loadUsers({ first: 0, rows: this.rows });
  }

  updateUser(event: any) {
    this.showDialogUpdate = false;
    this.loadUsers({ first: 0, rows: this.rows });
  }

  getAtivoText(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }

  createUser(user: User) {
    const sub = this.userService.createUser(user).subscribe({
      next: (response: any) => {
        console.log('Usuário criado com sucesso:', response);
        this.loadUsers({ first: 0, rows: this.rows });
      },
      error: (error: any) => {
        console.error('Aconteceu um erro!', error);
      }
    });
    this.subscriptions.push(sub);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleButtonClick() {
    // Lógica adicional para quando o botão principal é clicado (se necessário)
  }
}
