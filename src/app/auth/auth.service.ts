import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwHw-_VOc_T8eekHBBe_trYNWv3rfN4D0';

    constructor(private http: HttpClient) {}

    signup(email: string, password: string){
      return this.http.post<AuthResponseData>(this.BASE_URL, 
        {
          email: email,
          password: password,
          returnSecureToken: true
        }).pipe(catchError(errorRes => {
          let errorMessage = 'An unknown erro occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMessage));
          }
          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS': 
              errorMessage = 'This email exists already!';
          } 
          return throwError(() => new Error(errorMessage));
        }));
    }
}