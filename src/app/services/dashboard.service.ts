import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private REST_API_SERVER = 'https://chitaranjanapi.azurewebsites.net/api/dashboard';
  // private REST_API_SERVER = 'http://localhost:42009/api/dashboard';

  constructor(private httpClient: HttpClient) { }

  public getEmployeeCount(){
    return this.httpClient.get(this.REST_API_SERVER +'/employeecount');
  }
  public getWorkingHoursPerDay():Observable<Dashboard[]>{
    return this.httpClient.get<Dashboard[]>(this.REST_API_SERVER +'/workinghoursperday');
  }

  public getSalaryPerDay():Observable<Dashboard[]>{
    return this.httpClient.get<Dashboard[]>(this.REST_API_SERVER +'/salaryperday');
  }

}
