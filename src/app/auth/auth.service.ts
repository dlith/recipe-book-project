import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly BASE_API_KEY = 'AIzaSyDwHw-_VOc_T8eekHBBe_trYNWv3rfN4D0';
    private readonly BASE_URL_SINGUP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.BASE_API_KEY;
    private readonly BASE_URL_LOGIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.BASE_API_KEY;

    constructor(private http: HttpClient) {}

    signup(email: string, password: string){
      return this.http.post<AuthResponseData>(this.BASE_URL_SINGUP, 
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

    login(email: string, password: string) {
      return this.http.post<AuthResponseData>(this.BASE_URL_LOGIN, 
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      );
    }
}