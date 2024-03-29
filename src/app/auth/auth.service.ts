import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { enviroment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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

    private readonly BASE_API_KEY = enviroment.firebaseAPIKey;
    private readonly BASE_URL_SINGUP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.BASE_API_KEY;
    private readonly BASE_URL_LOGIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.BASE_API_KEY;
    
    //user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

    // signup(email: string, password: string){
    //   return this.http.post<AuthResponseData>(this.BASE_URL_SINGUP, 
    //     {
    //       email: email,
    //       password: password,
    //       returnSecureToken: true
    //     }).pipe(catchError(this.handleError), tap(resData=>{
    //       this.handleAuthntication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    //     }));
    // }

    // login(email: string, password: string) {
    //   return this.http.post<AuthResponseData>(this.BASE_URL_LOGIN, 
    //     {
    //       email: email,
    //       password: password,
    //       returnSecureToken: true
    //     }
    //   ).pipe(catchError(this.handleError), tap(resData=>{
    //     this.handleAuthntication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    //   }));
    // }

    logout(){
      //this.user.next(null);
      this.store.dispatch(new AuthActions.Logout());
      // this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if(this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
      console.log(expirationDuration);
      this.tokenExpirationTimer = setTimeout(()=> {
        this.logout();
      }, expirationDuration);
    }

    setLogoutTimer(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(()=> {
        this.store.dispatch(new AuthActions.Logout());
      }, expirationDuration);
    }

    clearLogoutTimer(){
      if(this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
    }

    autoLogin() {
      const userData: {
        email:string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if(!userData) {
        return;
      }

      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if(loadedUser.token) {
        //this.user.next(loadedUser);
        this.store.dispatch(
          new AuthActions.AuthenticateSuccess({
            email: loadedUser.email, 
            userId: loadedUser.id, 
            token: loadedUser.token, 
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          }));
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
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
      // this.user.next(user);
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect: false
      }));
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }
}