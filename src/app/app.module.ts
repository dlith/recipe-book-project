import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from './app-routing.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent
    ],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      StoreModule.forRoot({shoppingList: shoppingListReducer}),
      SharedModule,
      CoreModule
    ],
    //providers: [LoggingService]
})
export class AppModule { }
