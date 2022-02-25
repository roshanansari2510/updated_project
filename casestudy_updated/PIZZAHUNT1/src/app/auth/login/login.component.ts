import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public msg: any = [];
  public avail!: boolean;
  public isAdmin!: boolean;
  public isBlocked!: boolean;
  // var checkArray;
  arr: any = [];

  constructor(private router: Router,private authService: AuthService) { }


  ngOnInit(): void {
    this.isAdmin = false;
    this.isBlocked=false;
  }

  readUser() {
    this.authService.readUser().subscribe(
      data => {
        this.arr = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(f: NgForm) {
    // check if the form Attribute are valid or not
    if (!f.valid) {
      this.msg = "Invalid Email or password";
      this.avail = true;
      // console.log(this.msg);
      return;
    }

          // console.log(JSON.stringify(this.loginForm.value));
       this.authService.login(f.value.email).subscribe(
        data => {
          console.log(data);

          if(!data)
          {
            this.msg = "Not a registered user. Kindly check email or register yourself."
            this.avail=true;
            return;
          }
          localStorage.setItem('userid', f.value.email);
          this.router.navigate(['/userhome']);
        },
        error => {
           console.error(error);
           this.msg = error;
          }
      )
  }

}
