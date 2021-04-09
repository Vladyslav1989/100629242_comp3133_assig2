import { Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service'
import {Router} from '@angular/router'
import {DataService} from '../data.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {



  loginUserData ={
    email: '',
    password: ''

  }


  constructor(private _auth: AuthService , private _router: Router,private datas: DataService) { }


  ngOnInit(): void {

  }


  loginUser(){
    this.datas.changemsg(this.loginUserData.email)
    //this.emdata=this.loginUserData.email
    //console.log(this.emdata)

    //console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token);
        this._router.navigate(['/booking'])
      },
      err => console.log(err)
    )

  }
  getData(){
    let data:any
     data =this.loginUserData

     console.log(data)
     return data
  }
  emdata:any;
}
