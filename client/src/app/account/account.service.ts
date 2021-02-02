import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  // tslint:disable-next-line: typedef
  getCurrentUserValue() {
    return this.currentUserSource.value;
  }

  // tslint:disable-next-line: typedef
  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      // Mapeia objeto recebido em observable do usuário
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          // Atualiza observable do usuário
          this.currentUserSource.next(user);
        }
      })
    );
  }

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line: typedef
  login(values: any)
  {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  // tslint:disable-next-line: typedef
  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  // tslint:disable-next-line: typedef
  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + 'account/emailExists?email=' + email);
  }
}
