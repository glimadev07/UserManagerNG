import { Component } from '@angular/core';

interface Column {
  field: string;
  header: string;
}

interface users {
  nome: string;
  username: string;
  email: string;
  telefone: string;
  endereco: string;
  ativo: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UserManagerNG';

  users: users[] = [
    {
        "nome": "João Silva",
        "username": "joaosilva",
        "email": "joao.silva@example.com",
        "telefone": "(11) 1234-5678",
        "endereco": "Rua das Flores, 123, São Paulo, SP",
        "ativo": true
    },
    {
        "nome": "Maria Oliveira",
        "username": "mariaoliveira",
        "email": "maria.oliveira@example.com",
        "telefone": "(21) 2345-6789",
        "endereco": "Av. Brasil, 456, Rio de Janeiro, RJ",
        "ativo": false
    },
    {
        "nome": "Carlos Souza",
        "username": "carlossouza",
        "email": "carlos.souza@example.com",
        "telefone": "(31) 3456-7890",
        "endereco": "Rua Minas Gerais, 789, Belo Horizonte, MG",
        "ativo": true
    },
    {
        "nome": "Ana Costa",
        "username": "anacosta",
        "email": "ana.costa@example.com",
        "telefone": "(41) 4567-8901",
        "endereco": "Rua Paraná, 101, Curitiba, PR",
        "ativo": false
    },
    {
        "nome": "Pedro Martins",
        "username": "pedromartins",
        "email": "pedro.martins@example.com",
        "telefone": "(51) 5678-9012",
        "endereco": "Av. Ipiranga, 202, Porto Alegre, RS",
        "ativo": true
    }
];

  cols: Column[] = [
    { field: 'nome', header: 'NOME' },
    { field: 'username', header: 'USERNAME' },
    { field: 'email', header: 'EMAIL' },
    { field: 'telefone', header: 'CONTATO' },
    { field: 'endereco', header: 'ENDEREÇO' },
    { field: 'ativo', header: 'ATIVO' }
];

  false = false;

  showDialogDelete = false

  showDialog() {
    this.showDialogDelete = true;
  }

  deleteUser(){
    this.showDialogDelete = false;
  }
}
