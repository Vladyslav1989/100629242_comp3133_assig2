import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BokingsService {
  private _bokingsUrl = "http://localhost:4000/booking";
  private _bookhotelsUrl = "http://localhost:4000/bookhotel";

  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get<any>(this._bokingsUrl)

  }
  getBookhotel() {
    return this.http.get<any>(this._bookhotelsUrl)

  }

}
