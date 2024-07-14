// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USERS } from '../../constants/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, senha: string): Observable<any> {
    return this.http.post<any>(`${USERS}/login`, { username, senha })
      .pipe(map(response => {
        if (response && response.data) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
        }
        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  public get currentUserValue(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
}
