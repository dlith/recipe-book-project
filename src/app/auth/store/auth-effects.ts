import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { enviroment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthntication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate
  });
}

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS': 
      errorMessage = 'This email exists already!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not found!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct!';
      break;
    default:
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

  private readonly BASE_API_KEY = enviroment.firebaseAPIKey;
  private readonly BASE_URL_SINGUP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.BASE_API_KEY;
  private readonly BASE_URL_LOGIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.BASE_API_KEY;

  authSignup = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart)=> {
        return this.http.post<AuthResponseData>(this.BASE_URL_SINGUP, 
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(resData => {
            return handleAuthntication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
      })
    )
  );

  authLogin = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart)=> {
     return this.http.post<AuthResponseData>(this.BASE_URL_LOGIN,
      {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }
        ).pipe(
          map(resData => {
            return handleAuthntication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
     })
    )
  );
  
  authRedirect = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), 
    tap(()=> {
      this.router.navigate(['/']);
    })
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router){}
}