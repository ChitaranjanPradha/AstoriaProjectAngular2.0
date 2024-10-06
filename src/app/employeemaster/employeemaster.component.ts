import { EmployeemasterService } from './../services/employeemaster.service';
import { EmployeemasterdialogComponent } from './../employeemasterdialog/employeemasterdialog.component';
import { Employee } from './../models/employee';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { SubmitAnIdeaComponent } from '../SubmitAnIdea/SubmitAnIdea.component';

@Component({
  selector: 'app-employeemaster',
  templateUrl: './employeemaster.component.html',
  styleUrls: ['./employeemaster.component.css'],
})

export class EmployeemasterComponent implements OnInit {
  title = "Employee Details";
  isEmployeeKeyInused :boolean=false;
  constructor(
    private EmployeemasterService: EmployeemasterService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) Sort: MatSort = new MatSort();
  MatDialogRef: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort;
  }

  public doFilter = (event: any) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  };
  public displayedColumns = ['employeeId','employeeName','companyName','designation','joiningDate','gender','activeStatus','add',];
  public dataSource = new MatTableDataSource<Employee>();

  ngOnInit() {
    this.getAllEmployees();
  }
  OpenSubmitAnIdea(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(
      SubmitAnIdeaComponent,
      dialogConfig
    );
  }
  openEmpDialog(empKey: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = empKey;
    const dialogRef = this.dialog.open(
      EmployeemasterdialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((resultl) => {
      this.getAllEmployees();
    });
  }
  deleteEmployee(empKey: number) {
    this.EmployeemasterService
      .getCheckEmployeeKeyInUse(empKey)
      .subscribe((data) =>{
        this.isEmployeeKeyInused= data as boolean;
        if(this.isEmployeeKeyInused == false){
          Swal.fire({
            title:'Confirm?',
            text:'Do you want to delete permantly?',
            icon:'question',
            showDenyButton:true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
          }).then((result)=>{
            if( result.isConfirmed){
              this.EmployeemasterService.deleteemployee(empKey).subscribe(
                (data) => {
                  Swal.fire({
                    title: 'Sucess',
                    text: 'Employee delete Sucessfully',
                    icon: 'success',
                  });
                  this.getAllEmployees();
                })
            }
            else{
                result.isDenied
            }
          })
       }
      else{
        Swal.fire({
          title: 'Failed',
          text: 'Employee key already in use',
          icon: 'warning',
        });
      }
      });
  }
  public getAllEmployees = () => {
    this.EmployeemasterService.getallemployees().subscribe((data) => {
      this.dataSource.data = data as Employee[];
    });
  };
}
