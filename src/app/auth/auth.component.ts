import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;


  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}
  
  ngOnInit(): void {
    this.storeSub =  this.store.select('auth').subscribe(authState=> {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error) {
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    } else {
      // authObs = this.authService.signup(email, password);
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }

    // authObs.subscribe(responseData => {
    //   console.log(responseData);
    //   this.isLoading = false;
    //   this.router.navigate(['./recipes']);
    // }, errorMessage => {
    //   console.log(errorMessage);
    //   this.error = errorMessage.message;
    //   this.showErrorAlert(errorMessage.message);
    //   this.isLoading = false;
    // });

    form.reset();
  }

  onHandleError() {
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(message: string) {
    // you cant create component like that!
    //const alertCmp = new AlertComponent();

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=> {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
