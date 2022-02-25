import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from 'src/app/admin/service/adminservice.service';
import { IPizza } from 'src/app/pizza';
import { Router } from '@angular/router';
import { CartserviceService } from 'src/app/service/cartservice.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  public productList:any;
  public pQuantity:number=1;
  constructor(private service:AdminserviceService,private router:Router,private cartservice:CartserviceService) { }

  ngOnInit(): void {
    this.service.getProducts()
    .subscribe((res:any)=>{
      this.productList=res;

      this.productList.forEach((a:any)=>{
        Object.assign(a,{quantity:this.pQuantity,total:a.price});
      })
    })
  }

  addtocart(productList:any,pQuantity:number){
    this.cartservice.addtoCart(productList,pQuantity);
  }

}
