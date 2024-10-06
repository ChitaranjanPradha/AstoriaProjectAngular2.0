import { UserInfo } from './../models/userInfo';
import { Allowance } from '../models/allowance';
import { AllowancesService } from './../services/allowances.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { NoopAnimationPlayer } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['./allowance.component.css']
})
export class AllowanceComponent implements OnInit {
  hide = true;
  AllowanceList!: Allowance[];
  allowance: Allowance[] = [];
  listAllowance: Allowance[]=[];
  postListAllowance: Allowance[] = [];
  user:UserInfo = new UserInfo();
  allowID!:number;

  constructor(private AllowancesService: AllowancesService) { }
  showAllowanceHome:boolean=false;
  showEmployeename:boolean=false;
  isIdPassCurrect:boolean = false;
  showallowanceLoginPage:boolean=true;
  showLogo:boolean= true;
  DateTime!:Date;

  title!: string;
  ngOnInit(): void {
    timer(0,1000).subscribe(() => {
      this.DateTime = new Date()
    })
    this.title="Allowance - Login";

    this.allowances();
    this.GetTodayPresentEmployee();
  }
  validateForm: FormGroup = new FormGroup({
    UserId: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });
  public hasError = (controlName: string, errorName: string) => {
    return this.validateForm.controls[controlName].hasError(errorName);
  };
  displayedColumns = ['employeeName'];
  // public dataSource = new MatTableDataSource<Allowance>();
  dataSource = new MatTableDataSource<Allowance>();
  Login(){
    // if(this.validateForm.valid){
      // this.AllowancesService.getCheckIdPassword(this.user.userName,this.user.password).subscribe((data) => {
      //   console.log("id",this.user.userName,this.user.password)
      //   this.isIdPassCurrect = data as boolean;
      //   if (this.isIdPassCurrect == true) {
          this.showAllowanceHome = true;
          this.showEmployeename = true;
          this.showallowanceLoginPage=false;
          this.showLogo=false;
          this.title ="Allowance";
        // }
        // else{
        //   Swal.fire({
        //     title: 'Alert!',
        //     text: 'Wrong Id / Password',
        //     icon: 'warning',
        //   });
        // }
    //  })
   // }
  }
  Back(){
    this.showAllowanceHome = false;
    this.showEmployeename = false;
    this.showallowanceLoginPage=true;
    this.showLogo=true;
    this.title ="Allowance - Login";
  }

  public allowances() {
    this.AllowancesService.getallallowances().subscribe((data) => {
      this.AllowanceList = data as Allowance[];
    });
  }
  public GetTodayPresentEmployee(){
    this.AllowancesService.gettodayattendance().subscribe((data) => {
      this.dataSource.data= data as Allowance[];
      console.log("present",this.dataSource.data);
    })
  }
  saveAllowance(){
    debugger;
   // this.postListAllowance=[];

 //    this.listAllowance = this.dataSource.data;
    // this.listAllowance.forEach((item, index) => {
    //   console.log("Data",item);
    //   let allow = new Allowance();
    //   allow.employeekey = item.employeekey;
    //   allow.allowAmount = item.allowAmount;
    //   allow.allowanceId = item.allowanceId;
    //   this.postListAllowance.push(allow);
    //   console.log("post",this.postListAllowance);
    // });
    console.log("DD",this.AllowanceList);
    this.AllowancesService.saveAllowance(this.postListAllowance).subscribe((data) =>{
      console.log("DD",this.postListAllowance);
    })
  }
}
