import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "http://localhost:4000/login";

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user:any){
      return this.http.post<any>(this._loginUrl, user)
  }
  loggedIn(){
    return !!localStorage.getItem('token') // !!-> return true of fals not token
  }
  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])

  }
  getToken(){
    return localStorage.getItem('token')
  }
}
