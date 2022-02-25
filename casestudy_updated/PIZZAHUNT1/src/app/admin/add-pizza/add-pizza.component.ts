import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../service/adminservice.service';
import { Router } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { NgForm,FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  styleUrls: ['./add-pizza.component.css']
})
export class AddPizzaComponent implements OnInit {
  message:any=[];
  avail!: boolean;
  onepizza:any;
  image:any;
  productImage:any;
  imagePreview!: string;

  constructor(private adminService:AdminserviceService,private httpClient:HttpClient,private router:Router) { }

  ngOnInit(): void {

  }


  onSubmit(f:NgForm){

    const formData = {
      productName:f.value.productName,
      productSize:f.value.productSize,
      productPrice:f.value.productPrice,
      productImage:f.value.productImage
    }
    this.httpClient.post<any>('http://localhost:3000/app/products/add/',formData)
    .subscribe((res)=>{
      console.log("formd"+formData);
      this.adminService.avail=true;
      this.adminService.message="Successfully added a pizza";
      if(this.adminService.message="Successfully added a pizza"){
          alert("Successfully added a pizza");
          this.router.navigateByUrl('/viewpizza');
      }
    })
  }
}


