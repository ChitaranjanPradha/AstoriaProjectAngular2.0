import { DatePipe } from '@angular/common';
import { EmployeemasterService } from './../services/employeemaster.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../models/employee';
import { DesignationMaster } from './../models/designationmaster';
import { CompanyMaster } from './../models/companymaster';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-employeemasterdialog',
  templateUrl: './employeemasterdialog.component.html',
  styleUrls: ['./employeemasterdialog.component.css'],
})
export class EmployeemasterdialogComponent implements OnInit {

orgID!:string;
orgCmpId!: number;
orgFirstName!:string;
orgLastName!:string;
orgGender!:string;
orgDesigId!:number;
orgSalary!:number;

  CmpList!: CompanyMaster[];
  designList!: DesignationMaster[];
  virtualEmp: Employee = new Employee();
  isUpdate: boolean = false;
  isSave: boolean = false;
  isEmployeeExists: boolean = false;
  showResignDate: boolean = false;
  orgJoiningDate!: Date;
  orgResignationDate!: Date;
  employeefrom: FormGroup = new FormGroup({
    empId: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9- ]*')]),
    cmpName: new FormControl('', [Validators.required]),
    empFirstname: new FormControl('', [Validators.required,Validators.maxLength(100),Validators.pattern('[a-zA-Z]*')]),
    empLastName: new FormControl('', [
    Validators.required,Validators.maxLength(100),Validators.pattern('[a-zA-Z]*')]),
    empGender: new FormControl('', [Validators.required]),
    empJoiningDate: new FormControl('', [Validators.required]),
    empDesignation: new FormControl('', [Validators.required]),
    empResinationDate: new FormControl(),
    empSalary: new FormControl(0, [Validators.required, Validators.max(999),Validators.pattern('[0-9.]*')]),
  });
  title: string;
  dataService: any;
  allcompanynames: CompanyMaster[] = [];
  alldesignations: DesignationMaster[] = [];
  data!: number;
  minDate:any;
  constructor(private datePipe: DatePipe,
    private EmployeemasterService: EmployeemasterService,
    public dialogRef: MatDialogRef<EmployeemasterdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public empKey: number
  ) {
    this.data = empKey;
    if (empKey == 0) {
      this.title = 'Add Employee';
      this.isSave = true;
      this.isUpdate = false;
      this.showResignDate = true;
    } else {
      this.getemployeebyId(this.empKey);
      this.title = 'Update Employee';
      this.isSave = false;
      this.isUpdate = true;
      this.showResignDate = false;
    }
  }

  ngOnInit(): void {
    this.empKey = this.data as number;
    this.getallcompany();
    this.getalldesignations();
    this.minDate =  new Date();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeefrom.controls[controlName].hasError(errorName);
  };

  public getallcompany() {
    this.EmployeemasterService.getallcompany().subscribe((data) => {
      this.CmpList = data as CompanyMaster[];
    });
  }

  public getalldesignations() {
    this.EmployeemasterService.getalldesignations().subscribe((data) => {
      this.designList = data as DesignationMaster[];
    });
  }

  public getemployeebyId(empKey: number) {
    this.EmployeemasterService.getemployeebyId(empKey).subscribe((data) => {
      this.virtualEmp = data as Employee;
      this.orgJoiningDate = this.virtualEmp.empJoingDate;
      this.orgResignationDate = this.virtualEmp.empResinationDate;
      this.orgID =this.virtualEmp.employeeId;
      this.orgCmpId =this.virtualEmp.empCompanyId;
      this.orgFirstName = this.virtualEmp.empFirstName;
      this.orgLastName = this.virtualEmp.empLastName;
      this.orgGender =this.virtualEmp.empGender;
      this.orgDesigId = this.virtualEmp.empDesignationId;
      this.orgSalary = this.virtualEmp.empHourlySalaryRate;
    });
  }

  saveEmployee() {
    this.employeefrom.markAllAsTouched();
    if(this.employeefrom.valid) {
    this.EmployeemasterService.getcheckisempidexists(this.virtualEmp.employeeId,this.empKey).subscribe((data) => {
      this.isEmployeeExists = data as boolean;
      if (this.isEmployeeExists == false) {
        this.virtualEmp.empJoingDate.setHours(
          this.virtualEmp.empJoingDate.getHours() + 5);
        this.virtualEmp.empJoingDate.setMinutes(
          this.virtualEmp.empJoingDate.getMinutes() + 30);
        this.EmployeemasterService.postemployee(this.virtualEmp).subscribe(
          (data) => {
            Swal.fire({
              title: 'Sucess',
              text: 'Employee Saved Sucessfully',
              icon: 'success',
            });
            this.dialogRef.close();
          }
        );
      } else {
        Swal.fire({
          title: 'Alert!',
          text: 'Employee ID Already Exists',
          icon: 'warning',
        });
      }
    });
  }
  }

  updateEmloyee() {
    if(this.employeefrom.valid){
      this.EmployeemasterService.getcheckisempidexists(this.virtualEmp.employeeId,this.data)
      .subscribe((data) => {
        this.isEmployeeExists = data as boolean;
        if (this.isEmployeeExists == false) {
          if(this.orgJoiningDate != this.virtualEmp.empJoingDate){
               this.virtualEmp.empJoingDate.setHours(this.virtualEmp.empJoingDate.getHours() +5);
               this.virtualEmp.empJoingDate.setMinutes(this.virtualEmp.empJoingDate.getMinutes() + 30);
          }
          if(this.virtualEmp.empResinationDate != null && this.orgResignationDate != this.virtualEmp.empResinationDate){
            this.virtualEmp.empResinationDate.setHours(this.virtualEmp.empResinationDate.getHours() +5 );
            this.virtualEmp.empResinationDate.setMinutes(this.virtualEmp.empResinationDate.getMinutes() + 30);
          }
          if(this.virtualEmp.empResinationDate != null){
            let joiningDate  = this.datePipe.transform(this.virtualEmp.empJoingDate, 'yyyy-MM-dd');
            let resignationDate = this.datePipe.transform(this.virtualEmp.empResinationDate, 'yyyy-MM-dd');
              if(joiningDate! >= resignationDate!){
                Swal.fire({
                            title: 'warning!',
                            text: 'Resignation Date Should Be Bigger Then Joining Date',
                            icon: 'warning',
                          });
               return ;
              }
          }
          if( this.orgID == this.virtualEmp.employeeId &&
            this.orgCmpId == this.virtualEmp.empCompanyId &&
            this.orgFirstName == this.virtualEmp.empFirstName &&
            this.orgLastName == this.virtualEmp.empLastName &&
            this.orgGender == this.virtualEmp.empGender &&
            this.orgJoiningDate == this.virtualEmp.empJoingDate &&
            this.orgDesigId == this.virtualEmp.empDesignationId &&
            this.orgSalary == this.virtualEmp.empHourlySalaryRate &&
            ((this.virtualEmp.empResinationDate != null && this.orgResignationDate == this.virtualEmp.empResinationDate) ||(this.virtualEmp.empResinationDate == null) ))
            {
              Swal.fire({
                title: 'info',
                text: 'Do Some Changes!',
                icon: 'info',
              });
                return;
            }
            console.log(this.virtualEmp);
          this.EmployeemasterService.putemployee(this.empKey, this.virtualEmp).subscribe(data =>{
            Swal.fire({
              title: 'Sucess',
              text: 'Employee Update Sucessfully',
              icon: 'success',
            });
            this.dialogRef.close();
          });
        }
        else{
          Swal.fire({
                 title: 'Alert!',
                 text: 'Employee ID Already Exists',
                 icon: 'warning',
           });
        }
      });
    }
  }
}
