import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      AuthComponent
    ],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      RecipesModule,
      ShoppingListModule,
      SharedModule,
      CoreModule
    ]
})
export class AppModule { }
