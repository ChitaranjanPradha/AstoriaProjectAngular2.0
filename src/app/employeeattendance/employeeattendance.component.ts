import { EmployeemasterService } from './../services/employeemaster.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { CompanyMaster } from './../models/companymaster';
import { EmployeeattendanceService } from './../services/employeeattendance.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from '../models/attendance';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { TimeScale } from 'chart.js';
import { ThisReceiver } from '@angular/compiler';
import { findIndex } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employeeattendance',
  templateUrl: './employeeattendance.component.html',
  styleUrls: ['./employeeattendance.component.css'],
})
export class EmployeeattendanceComponent implements OnInit {
  originalData!: string;
  invalidTime!: string;
  updateId!: string;
  newAttId!: string;
  disableSaveBtn: boolean = true;
  invalidEmpId!: string;
  updateEmpId!: string;
  showTable: boolean = false;
  Att: Attendance = new Attendance();
  filterDate!: Date;
  CmpList!: CompanyMaster[];
  cmpId!: number;
  maxDate: any;
  isAttRecExists: boolean = false;
  dataSource = new MatTableDataSource<Attendance>();
  listAttendance: Attendance[] = [];
  postListAttendance: Attendance[] = [];
  updateListAttendance: Attendance[] = [];
  originalDatalist: Attendance[] = [];
  fullEmptyData: Attendance[] = [];
  nextLine: string = '\n';

  orgTimeIn!: string;
  orgTimeOut!: string;
  orgTimeRemark!: string;

  validateForm: FormGroup = new FormGroup({
    cmpName: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  displayedColumns = [
    'employeeId',
    'employeeName',
    'clockDate',
    'timeIn',
    'timeOut',
    'remarks',
  ];

  public hasError = (controlName: string, errorName: string) => {
    return this.validateForm.controls[controlName].hasError(errorName);
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (event: any) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  };

  constructor(private translateService: TranslateService,
    private EmployeeattendanceService: EmployeeattendanceService,
    private EmployeemasterService: EmployeemasterService
  ) {
    this.translateService.get('WelcomeMessage').subscribe((data: any) => { console.log(data); });
  }

  ngOnInit() {
    this.getallcompany();
    this.maxDate = new Date();
  }

  switchLanguage(language: string) {
    this.translateService.use(language);
  }

  public getAllAttendances = () => {
    this.validateForm.markAllAsTouched();
    if (this.validateForm.valid) {
      this.disableSaveBtn = false;
      this.showTable = true;
      var date = new DatePipe('en-US');
      var dateFormated = date.transform(this.filterDate, 'YYYY-MM-dd');
      this.EmployeeattendanceService.getAllAttendances(
        dateFormated,
        this.cmpId
      ).subscribe((data) => {
        this.dataSource.data = data as Attendance[];
        this.dataSource.paginator = this.paginator;
        this.originalData = JSON.stringify(this.dataSource.data);
      });
    }
  };

  public getallcompany() {
    this.EmployeemasterService.getallcompany().subscribe((data) => {
      this.CmpList = data as CompanyMaster[];
    });
  }

  save() {
    // debugger;
    this.postListAttendance = [];
    this.updateListAttendance = [];
    let missingDataEmployeeIds: string[] = new Array<string>();
    let invalidDateTimeEmpIds: string[] = new Array<string>();
    let updateListAttendanceIds: string[] = new Array<string>();
    let addNewAttendanceIds: string[] = new Array<string>();
    this.listAttendance = this.dataSource.data;
    this.originalDatalist = JSON.parse(this.originalData);
    this.listAttendance.forEach((item, index) => {
      if (
        (item.timeIn != '' && item.timeOut == '' && item.remarks == '') ||
        (item.timeIn == '' && item.timeOut != '' && item.remarks == '') ||
        (item.timeIn == '' && item.timeOut == '' && item.remarks != '') ||
        (item.timeIn != '' && item.timeOut != '' && item.remarks == '') ||
        (item.timeIn == '' && item.timeOut != '' && item.remarks != '') ||
        (item.timeIn != '' && item.timeOut == '' && item.remarks != '')
      ) {
        this.invalidEmpId = item.employeeId;
        missingDataEmployeeIds.push(this.invalidEmpId);
        console.log('missfiels', missingDataEmployeeIds);
      } else {
        if (item.timeIn != '' && item.timeOut != '' && item.remarks != '') {
          if (item.timeIn > item.timeOut) {
            this.invalidTime = item.employeeId;
            invalidDateTimeEmpIds.push(this.invalidTime);
            return;
          }
          // if (this.originalDatalist[index].timeIn != item.timeIn ||
          //     this.originalDatalist[index].timeOut != item.timeOut ||
          //     this.originalDatalist[index].remarks != item.remarks
          //   ) {
          // let updateAttendance = new Attendance();
          // updateAttendance.employeeKey = item.employeeKey;
          // updateAttendance.clockDate = item.clockDate;
          // updateAttendance.timeIn = item.clockDate.slice(0, 10) + 'T' + item.timeIn + ':00';
          // updateAttendance.timeOut = item.clockDate.slice(0, 10) + 'T' + item.timeOut + ':00';
          // updateAttendance.remarks = item.remarks;
          // updateAttendance.creationDate = item.creationDate;
          // this.updateListAttendance.push(updateAttendance);

          //   this.updateEmpId = item.employeeId;
          //   updateListAttendanceIds.push(this.updateEmpId);    //update
          //   console.log('update1', updateListAttendanceIds);
          // }

          let attendance = new Attendance();
          attendance.employeeKey = item.employeeKey;
          attendance.clockDate = item.clockDate;
          attendance.timeIn = item.clockDate.slice(0, 10) + 'T' + item.timeIn + ':00';
          attendance.timeOut = item.clockDate.slice(0, 10) + 'T' + item.timeOut + ':00';
          attendance.remarks = item.remarks;
          attendance.creationDate = item.creationDate;
          this.postListAttendance.push(attendance);
          console.log(attendance);
          console.log(this.postListAttendance);
          // this.newAttId = item.employeeId;
          // addNewAttendanceIds.push(this.newAttId);    //add

        }
      }
    });

    if (missingDataEmployeeIds.length > 0 && invalidDateTimeEmpIds.length > 0) {
      Swal.fire({
        title: 'Missing Data',
        text: 'Missing data for Empoyee ID(s) : ' + missingDataEmployeeIds +
          'And' +
          'Time Out should be greater than Time In for ID(s) : ' + invalidDateTimeEmpIds,
        icon: 'info',
      });
    }
    else if (invalidDateTimeEmpIds.length > 0) {
      Swal.fire({
        title: 'Alert',
        text: 'Time Out should be greater than Time In for ID(s) : ' + invalidDateTimeEmpIds,
        icon: 'warning',
      });
    }
    else if (missingDataEmployeeIds.length > 0) {
      Swal.fire({
        title: 'Missing Data',
        text: 'Missing data for Empoyee ID(s) : ' + missingDataEmployeeIds,
        icon: 'info',
      });
    }
    console.log(this.postListAttendance);

    if (this.postListAttendance.length != 0 && missingDataEmployeeIds.length == 0 && invalidDateTimeEmpIds.length == 0) {
      // if(this.postListAttendance.length != 0){
      this.EmployeeattendanceService.postAttendance(this.postListAttendance).subscribe((data) => {
        Swal.fire({
          title: 'Sucess',
          text: 'Attendance Added Sucessfully',
          icon: 'success',
        });
        this.getAllAttendances();
      });
      // } else if(this.updateListAttendance.length != 0){
      //   this.EmployeeattendanceService.postAttendance(this.updateListAttendance).subscribe((data) => {
      //     Swal.fire({
      //       title: 'Sucess',
      //       text: 'Attendance Updated Sucessfully Id(s)'  + updateListAttendanceIds,
      //       icon: 'success',
      //     });
      //   });
      // }


    }
  }

}


