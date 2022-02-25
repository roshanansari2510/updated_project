import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public avail:boolean = false;
  public msg:string="";
  private baseUri: string = "http://localhost:3000";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient, private router: Router) { }

  getorderdetail(body: any) {
    return this.http.post('http://localhost:3000/app/orders/add', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

}
