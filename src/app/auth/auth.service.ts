import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

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
    
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signup(email: string, password: string){
      return this.http.post<AuthResponseData>(this.BASE_URL_SINGUP, 
        {
          email: email,
          password: password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData=>{
          this.handleAuthntication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
      return this.http.post<AuthResponseData>(this.BASE_URL_LOGIN, 
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleError), tap(resData=>{
        this.handleAuthntication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
    }

    private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMessage));
          }
          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS': 
              errorMessage = 'This email exists already!';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not found!';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct!';
              break;
          } 
          return throwError(() => new Error(errorMessage));
    }

    private handleAuthntication(email: string, userId: string, token: string, expiresIn: number) {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
          const user = new User(email, userId, token, expirationDate);

          this.user.next(user);
    }
}