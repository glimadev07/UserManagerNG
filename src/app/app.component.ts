import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserService } from './service/user.service';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

interface Column {
  field: string;
  header: string;
}

export interface user {
  nome: string;
  username: string;
  email: string;
  telefone: string;
  endereco: string;
  ativo: boolean | string ;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {

  title = 'UserManagerNG';

  users!: user[]



  cols: Column[] = [
    { field: 'nome', header: 'NOME' },
    { field: 'username', header: 'USERNAME' },
    { field: 'email', header: 'EMAIL' },
    { field: 'telefone', header: 'CONTATO' },
    { field: 'endereco', header: 'ENDEREÇO' },
    { field: 'ativo', header: 'ATIVO' },
    { field: 'operacoes', header: 'OPERAÇÕES'}
];

  false = false;

  showDialogResgiter = false;
  showDialogUpdate = false;
  showDialogDelete = false;
  userUpdate!: user;

  constructor(private userService: UserService){

  }

  ngOnInit() {
    this.getUsers();
  }

  showDelete(user: user) {
    this.showDialogDelete = true;
  }

  showUpdateUser(user: user) {
    this.showDialogUpdate = true;
    this.userUpdate = user;
  }

  showRegisterUser() {
    this.showDialogResgiter = true;
  }

  deleteUser(){
    this.showDialogDelete = false;
  }

  registerUser(user: any){
    this.createUser(user);
    this.showDialogResgiter = false;
  }

  updateUser(event: any){
    console.log(event);

    this.showDialogUpdate = false;
  }

  isAtivo(ativo: boolean | string){
    return ativo ? 'ATIVO' : 'INATIVO'
  }
  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res.data;
      this.users.forEach( user =>{
        user.ativo = this.isAtivo(user.ativo)
      })
    }, error => {
      console.error('There was an error!', error);
    });
  }

  createUser(user: any) {
    this.userService.createUser(user).subscribe(
      response => {
        console.log('User created successfully:', response);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

}
