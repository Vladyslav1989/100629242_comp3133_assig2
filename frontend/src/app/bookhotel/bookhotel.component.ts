import { Component, OnInit } from '@angular/core';
import {BokingsService} from '../bokings.service';
import {Router} from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";
import {DataService} from '../data.service'

const BookHotel = gql`
  mutation BookHotel($email: String!, $hotel_name: String!,$booking_date: Date!,$booking_start: Date!,$booking_end: Date!) {
    BookHotel( email:$email, hotel_name:$hotel_name, booking_date:$booking_date, booking_start:$booking_start, booking_end:$booking_end,)
    {
      booking_end
    }
  }
`;
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
const getHotelByCity = gql`
query BookHotel($city: String!){
  getHotelByCity (city: $city)
    {
      hotel_name
    }
  }
`;

@Component({
  selector: 'app-bookhotel',
  templateUrl: './bookhotel.component.html',
  styleUrls: ['./bookhotel.component.css']
})
export class BookhotelComponent implements OnInit {
  private query: QueryRef<any> | undefined;
  employees: any[] = [];
  msg = '';
  hotels :any;

  constructor(private apollo: Apollo,private _booking: BokingsService,private _router: Router,private _logi : DataService) { }

  ngOnInit(): void {
    //this.search("test")
    this._logi.currntmsg.subscribe(message=>this.msg=message)
    console.log(this.msg)
    this._booking.getBookhotel()
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


    this.query = this.apollo.watchQuery({
      query: GET_Hotel,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.employees = result.data.getHotel;
      console.log(result.data.getHotel);
      console.log(this.employees)
    });

  }



  create(username: string, password: string ,email: string,)
  {
    console.log(this.msg)
    this.apollo.mutate({
      mutation:BookHotel,
      variables:{
        email:`${this.msg}`,
        hotel_name:username,
        booking_date:Date(),
        booking_start:password,
        booking_end:email

      }
    })
    .subscribe(()=>{
      console.log("created")
    })
    console.log(username,password,email)
  }

/////


searchr(search: string, )
{

  this.apollo.query({
    query:getHotelByCity,
    variables:{
     city:search

    }
  })
  .subscribe((response)=>{
    this.hotels = response.data
    this.hotels = this.hotels.getHotelByCity
    console.log(this.hotels)
  })

}


}
