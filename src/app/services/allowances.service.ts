import { Allowance } from './../models/allowance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllowanceComponent } from '../allowance/allowance.component';
@Injectable({
  providedIn: 'root',
})
export class AllowancesService {
  private REST_API_SERVER =
    'https://chitaranjanapi.azurewebsites.net/api/EmployeeAllowanceDetals';
  // private REST_API_SERVER =
  //   'http://localhost/ChitaAPI/api/EmployeeAllowanceDetals';
  constructor(private httpClient: HttpClient) {}

  public gettodayattendance() {
    return this.httpClient.get(this.REST_API_SERVER + '/gettodayattendance');
  }

  public getallallowances() {
    return this.httpClient.get(this.REST_API_SERVER + '/getallallowances');
  }

  public getCheckIdPassword(userId: string, password: string) {
    return this.httpClient.get<boolean>(
      this.REST_API_SERVER +
        '/isIdPassCurrect?UserName=' +
        userId +
        '&Pass=' +
        password
    );
  }

  public saveAllowance(postListAllowance: Allowance[]) {
    return this.httpClient.post(this.REST_API_SERVER, Allowance);
  }
}
