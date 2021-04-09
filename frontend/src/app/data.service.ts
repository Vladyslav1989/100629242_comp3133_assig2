import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mesgSou = new BehaviorSubject<string>("msgfromlogin")
  currntmsg = this.mesgSou.asObservable()

  constructor() { }
  changemsg(message: string){
    this.mesgSou.next(message)
    }
}
