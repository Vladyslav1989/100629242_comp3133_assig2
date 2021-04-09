import { Component, OnInit } from '@angular/core';
import {BokingsService} from '../bokings.service';
import {Router} from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";
import {AuthService} from '../auth.service'
import {DataService} from '../data.service'

const GET_Hotel = gql`
query{
  getHotel{
    hotel_name
    city
    street
    postal_code
    price
  }
}
`;



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],

})
export class BookingComponent implements OnInit {


  private query: QueryRef<any> | undefined;
  employees: any[] = [];
  booking: any[] = [];
  msg = '';



constructor(private _booking: BokingsService,private _router: Router,private apollo: Apollo,private _auth: AuthService , private _logi : DataService) { }

  ngOnInit():void {
    /// geting email from login form
    this._logi.currntmsg.subscribe(message=>this.msg=message)
    console.log(this.msg)
    //////// this block check token
    this._booking.getBookings()
    .subscribe(
      res => console.log(res),
      err =>{
        if (err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
//////// geting all hotels from db
    this.query = this.apollo.watchQuery({
      query: GET_Hotel,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.employees = result.data.getHotel;
      console.log(result.data.getHotel);
      console.log(this.employees)
    });

/////////////// geting bookimg based on email credtantial from login form paases throuth data service
    var getBooking= gql`
    query{
      getBooking(user:"${this.msg}"){
        booking_date
        booking_start
        booking_end

      }
    }
    `;
    this.query = this.apollo.watchQuery({
      query: getBooking,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.booking = result.data.getBooking;
      console.log(result.data.getBooking);

    });
///////////////

  }



}
