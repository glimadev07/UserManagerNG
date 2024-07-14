import { Component } from '@angular/core';


export interface user {
  nome: string;
  username: string;
  email: string;
  telefone: string;
  endereco: string;
  ativo: boolean | string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {


}
