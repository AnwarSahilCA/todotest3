import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Login } from '../model/login';
import { Signup } from '../model/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

   
  addUser(signup: Signup): Observable<Signup> {
    return this.httpClient.post<Signup>('http://localhost:8098/api/user/register', signup);
  }

  constructor(private httpClient: HttpClient) {}

 
  getusers(userr: Login) {
    console.log("GET USER");
    console.log(userr.username);
    console.log(userr.password);
    console.log(userr.type);

    return this.httpClient.post<any>(`http://localhost:8098/api/users/login`, userr, { headers: new HttpHeaders().set('responseType', 'text') }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', userr.username);
          let tokenStr = userData.token;
          console.log("Token string: " + tokenStr);
          localStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );
  }

  setBearerToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}
