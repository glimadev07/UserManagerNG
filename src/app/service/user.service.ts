import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user/model/user.model';
import { USERS } from '../../constants/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(page: number, size: number): Observable<{ data: User[], totalRecords: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ data: { data: User[], totalRecords: number } }>(`${USERS}`, { params }).pipe(
      map(response => {
        const innerData = response.data;
        return {
          data: innerData.data.map(user => ({
            ...user,
            isMaster: !!user.isMaster, // Garantir que isMaster é booleano
            ativo: !!user.ativo // Garantir que ativo é booleano
          })),
          totalRecords: innerData.totalRecords
        };
      }),
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${USERS}`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${USERS}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

}
