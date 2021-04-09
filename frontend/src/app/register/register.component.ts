import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";
import {Router} from '@angular/router'
const addUser = gql`
  mutation addUser($username: String!, $password: String!,$email: String!) {
    addUser( username:$username,password:$password, email:$email,)
    {
      username
    }
  }
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData ={
    email: String,
    password: String


  }
  constructor(private apollo: Apollo, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log(this.registerUserData)
  }

  create(username: string, password: string ,email: string)
  {
    this.apollo.mutate({
      mutation:addUser,
      variables:{
        username:username,
        password:password,
        email:email

      }
    })
    .subscribe(()=>{
      this._router.navigate(['/login'])
      console.log("created")
    })
    console.log(username,password,email)
  }
}
