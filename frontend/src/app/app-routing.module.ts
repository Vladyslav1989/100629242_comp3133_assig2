import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from '../app/register/register.component';
import {LoginComponent} from './login/login.component'
import {BookingComponent} from './booking/booking.component'
import {AuthGuard} from './auth.guard'
import {BookhotelComponent} from './bookhotel/bookhotel.component'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate : [AuthGuard] // if we go to booking activate gurd is activated
  },
  {
    path: 'bookhotel',
    component: BookhotelComponent,
    canActivate : [AuthGuard] // if we go to booking activate gurd is activated
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
