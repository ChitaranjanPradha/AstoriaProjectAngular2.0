import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../models/userInfo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private REST_API_SERVER = "http://localhost:42009/api";
  private REST_API_SERVER = "https://chitaranjanapi.azurewebsites.net/api";

  constructor(private httpClient: HttpClient, private router:Router) { }
  public isPasswordCorrect(userInfo:UserInfo){
    return this.httpClient.post<boolean>(this.REST_API_SERVER + "/UserInfoes/isIdPassCurrect",userInfo);
  }
  public createAccount(userInfo:UserInfo){
    return this.httpClient.post<boolean>(this.REST_API_SERVER + "/UserInfoes",userInfo);
  }
  

  isUserLogined(){
   return localStorage.getItem('isUserLogined') != null; 
  }

  logout() {
    localStorage.removeItem('isUserLogined');
    this.router.navigate(['login-page']);
  }
}
