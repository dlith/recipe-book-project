import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
        });
    }
}