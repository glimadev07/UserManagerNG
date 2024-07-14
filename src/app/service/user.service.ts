import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { user } from '../app.component';
import { USERS } from '../../constants/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUsers(): Observable<{data: user[], erro: any, status: boolean}> {
    return this.http.get<{data: user[], erro: any, status: boolean}>(USERS).pipe(
      map(response => response)
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(USERS, user);
  }
}
