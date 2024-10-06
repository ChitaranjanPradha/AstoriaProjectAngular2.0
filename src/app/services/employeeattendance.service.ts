import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendance } from '../models/attendance';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EmployeeattendanceService {
  private REST_API_SERVER = 'https://chitaranjanapi.azurewebsites.net/api/EmployeeAttendances';
  // private REST_API_SERVER = 'http://localhost:42009/EmployeeAttendances';

  constructor(private httpClient: HttpClient) {}

  public getAllAttendances(clockDate: any, companyId: number) {
    return this.httpClient.get(this.REST_API_SERVER +'/allattendances?FilterClockDate=' +
        clockDate +'&FilterCompanyId=' + companyId);
  }

  public getCheckAttRecordExists(employeeKey:number){
    return this.httpClient.get<boolean>(this.REST_API_SERVER + "/isAttendanceRecordExists?EmployeeKey=" + employeeKey);
  }

  public postAttendance(postListAttendance:Attendance[]){
    return this.httpClient.post(this.REST_API_SERVER,postListAttendance);
  }

  public deleteattendance(postListAttendance:Attendance[]){
    return this.httpClient.post(this.REST_API_SERVER,postListAttendance);
  }

  // public deleteattendances(kon: string,postListAttendance:Attendance[]){
  //   return this.httpClient.post(this.REST_API_SERVER+"kon="+,postListAttendance);
  // }

}
