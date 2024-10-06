import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../models/userInfo';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;
  // user: UserInfo = new UserInfo();
  credentials: UserInfo = new UserInfo();
  isIdPassCurrect: boolean = false;
  constructor(private usersService: UsersService, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    if (this.usersService.isUserLogined()) {
      this.router.navigate(['home']);
    }
  }
  validateForm: FormGroup = new FormGroup({
    UserId: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email])
  });
  public hasError = (controlName: string, errorName: string) => {
    return this.validateForm.controls[controlName].hasError(errorName);
  };

  createAccount() {

    console.log(this.credentials);
    if (this.validateForm.valid) {
      this.usersService.createAccount(this.credentials).subscribe(data => {
        if (data == true) {
          this.router.navigate(['login-page']);
          this.openSnackBar("Account Created Sucessfully!", "Ok");

        }
        else {
          Swal.fire({
            // title: 'Alert!',
            text: 'Something Went Wrong',
            icon: 'error',
          });
        }
      })
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

