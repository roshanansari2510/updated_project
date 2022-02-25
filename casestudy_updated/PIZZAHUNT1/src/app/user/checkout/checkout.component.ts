import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/user';
import { CartserviceService } from 'src/app/service/cartservice.service';
import { OrderService } from 'src/app/service/order.service';
import { IOrder } from 'src/app/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public user!: User;
  public emailId:any;
  public myProfileUser:any;

  public name:any;
  public email:any;
  public contact:any;
  public products:any[]=[];
  public grandTotal !: number;
  // public total !:number;
  // public status:any;

  msg: any = [];
  avail!: boolean;
  // var checkArray;
  arr: any = [];

  constructor(private router: Router,private authService: AuthService,private cartService:CartserviceService,private orderService: OrderService) { }

  ngOnInit(): void {

    this.getOneuser()
    
    this.cartService.getProductList()
    .subscribe(res=>{
      this.products=res;
     // console.log(this.products);
      this.products.forEach(element=>{
        console.log(element.product);
      })
      this.grandTotal=this.cartService.getTotalPrice();
    });
  }
   
   check() {
     this.authService.check().subscribe(
       (data) => {
        console.log(data);
      },
      (error) => {

        if (error instanceof HttpErrorResponse) {

            this.router.navigate(['/login'])
        }
        console.log(error);
      }
     )
   }

   getOneuser()
  {
    this.emailId = localStorage.getItem('userid')

    this.authService.login(this.emailId).subscribe(
      (      data) => {
        this.myProfileUser = data
        console.log(data);
        this.name = this.myProfileUser["userName"]
        this.email = this.myProfileUser["userEmail"]
        this.contact = this.myProfileUser["Phone"]
      },
      (error) => {

        if (error instanceof HttpErrorResponse) {

            this.router.navigate(['/login'])

        }
        console.log(error);
      }
    )
  }

  placeorder() {
    alert('Your orer is placed successfully...')
    this.router.navigate(['/userhome']);
  }


}

 
