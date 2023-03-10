import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from './app-routing.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

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
      SharedModule,
      CoreModule
    ],
    //providers: [LoggingService]
})
export class AppModule { }
