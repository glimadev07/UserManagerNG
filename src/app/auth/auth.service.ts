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
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
          }
        }
        return response;
      }));
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('currentUser');
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      if (this.isLocalStorageAvailable()) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  public get currentUserValue(): any {
    if (this.isLocalStorageAvailable()) {
      const currentUser = localStorage.getItem('currentUser');
      return currentUser ? JSON.parse(currentUser) : null;
    }
    return null;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user;
  }
}
