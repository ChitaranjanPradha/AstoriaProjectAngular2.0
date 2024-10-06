import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserInfo } from '../models/userInfo';
import { AllowancesService } from './../services/allowances.service';
import { UsersService } from '../services/users.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  user: UserInfo = new UserInfo();
  credentials: UserInfo = new UserInfo();
  isIdPassCurrect: boolean = false;
  constructor(private usersService: UsersService, private router:Router) { } 
  ngOnInit(): void {
    if(this.usersService.isUserLogined()){
      this.router.navigate(['home']);
    }
  }
  validateForm: FormGroup = new FormGroup({
    UserId: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });
  public hasError = (controlName: string, errorName: string) => {
    return this.validateForm.controls[controlName].hasError(errorName);
  };

  Login() {
    console.log(this.credentials);
    if (this.validateForm.valid) {
      this.usersService.isPasswordCorrect(this.credentials).subscribe(data => {
        if (data == true) {
          localStorage.setItem('isUserLogined','yes');
          this.router.navigate(['home']);
        }
        else {
          Swal.fire({
            title: 'Alert!',
            text: 'Wrong Id / Password',
            icon: 'warning',
          });
        }
      })
      // this.AllowancesService.getCheckIdPassword(this.user.userName,this.user.password).subscribe((data) => {
      //   this.isIdPassCurrect = data as boolean;
      //   if (this.isIdPassCurrect == true) {
      //     this.dialogRef.close();
      //   }
      //   else{
      //     Swal.fire({
      //       title: 'Alert!',
      //       text: 'Wrong Id / Password',
      //       icon: 'warning',
      //     });
      //   }
      // })
    }
  }
}
