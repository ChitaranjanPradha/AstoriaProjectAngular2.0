import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EmployeemasterService {

  private REST_API_SERVER = "https://chitaranjanapi.azurewebsites.net/api";
  // private REST_API_SERVER = "http://localhost:42009/api";

  constructor(private httpClient: HttpClient) { }

  public getallemployees(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters/allemployees");
  }

  public getemployeemaster(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters");
  }

  public getallcompany(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters/getallcompany");
  }

  public getalldesignations(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters/getalldesignation");
  }

  public deleteemployee(empKey:number){
    return this.httpClient.delete(this.REST_API_SERVER + "/EmployeeMasters/"+ empKey);
  }

  public putemployee(empKey:number, virtualEmp:Employee){
    return this.httpClient.put(this.REST_API_SERVER + "/EmployeeMasters/"+ empKey,virtualEmp);
  }

  public postemployee(employee:Employee){
    return this.httpClient.post(this.REST_API_SERVER +  "/EmployeeMasters/" ,employee);
  }

  public getemployeebyId (empKey:number){
    return this.httpClient.get<Employee> (this.REST_API_SERVER +  "/EmployeeMasters/" + empKey);
  }

  public getcheckisempidexists (employeeId:string , empKey: number){
    return this.httpClient.get<boolean> (this.REST_API_SERVER +  "/EmployeeMasters/isEmployeeIsExits?EmployeeID=" + employeeId + "&EmployeeKey="+empKey);
  }

  public getCheckEmployeeKeyInUse (empKey: number){
    return this.httpClient.get<boolean> (this.REST_API_SERVER + "/EmployeeMasters/checkEmployeeKeyInUse?EmployeeKey="+empKey);
  }

  public uploadFilesServices (files: File[]) {
    debugger;
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.httpClient.post(this.REST_API_SERVER + "/EmployeeMasters/fileUpload",files, { reportProgress: true, observe: 'events' });
  }

}
