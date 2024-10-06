import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usersService:UsersService, private router: Router){}
  canActivate() {
    if(!this.usersService.isUserLogined()){
      this.router.navigate(['login-page']);
      return false;
    }
    return true;
  }
  
}
