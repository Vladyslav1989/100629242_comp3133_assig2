import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import { BookingComponent } from './booking/booking.component'
import {AuthGuard} from './auth.guard'
import {TokenInterceptorService} from './token-interceptor.service'
import {BokingsService} from './bokings.service';
import { BookhotelComponent } from './bookhotel/bookhotel.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BookingComponent,
    BookhotelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GraphQLModule,

    HttpClientModule
  ],
  providers: [AuthService, BokingsService,AuthGuard,LoginComponent,{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
