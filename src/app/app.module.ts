import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy, PlatformLocation, APP_BASE_HREF } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
