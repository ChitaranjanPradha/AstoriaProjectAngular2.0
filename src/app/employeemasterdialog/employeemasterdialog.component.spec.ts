import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeemasterdialogComponent } from './employeemasterdialog.component';

fdescribe('EmployeemasterdialogComponent', () => {
  let component: EmployeemasterdialogComponent;
  let fixture: ComponentFixture<EmployeemasterdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeemasterdialogComponent ],
      imports:[HttpClientTestingModule],
      providers:[DatePipe,HttpClient,{provide:MAT_DIALOG_DATA,useValue :{}},{provide : MatDialogRef,useValue : {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeemasterdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Check form validtion with valid data', () => {
    component.employeefrom.controls['empId'].setValue("ATIL404");
    component.employeefrom.controls['cmpName'].setValue("Astoria Solutions");
    component.employeefrom.controls['empFirstname'].setValue("Chita");
    component.employeefrom.controls['empLastName'].setValue("Ranjan");
    component.employeefrom.controls['empGender'].setValue("Male");
    component.employeefrom.controls['empJoiningDate'].setValue("2022-05-04");
    component.employeefrom.controls['empDesignation'].setValue("Product Owner");
    component.employeefrom.controls['empResinationDate'].setValue("");
    component.employeefrom.controls['empSalary'].setValue(20);
    expect(component.employeefrom.valid).toBeTruthy();
  });

  it('Check form validtion for invalid EmpID length', () => {
    component.employeefrom.controls['empId'].setValue("ATIL40412345678901234567234567");
    component.employeefrom.controls['cmpName'].setValue("Astoria Solutions");
    component.employeefrom.controls['empFirstname'].setValue("Chita");
    component.employeefrom.controls['empLastName'].setValue("Ranjan");
    component.employeefrom.controls['empGender'].setValue("Male");
    component.employeefrom.controls['empJoiningDate'].setValue("2022-05-04");
    component.employeefrom.controls['empDesignation'].setValue("Product Owner");
    component.employeefrom.controls['empResinationDate'].setValue("");
    component.employeefrom.controls['empSalary'].setValue(20);
    expect(component.employeefrom.invalid).toBeTruthy();
  });

  it('Check form validtion for empty fields', () => {
    component.employeefrom.controls['empId'].setValue("");
    component.employeefrom.controls['cmpName'].setValue("Astoria Solutions");
    component.employeefrom.controls['empFirstname'].setValue("Chita");
    component.employeefrom.controls['empLastName'].setValue("Ranjan");
    component.employeefrom.controls['empGender'].setValue("Male");
    component.employeefrom.controls['empJoiningDate'].setValue("2022-05-04");
    component.employeefrom.controls['empDesignation'].setValue("Product Owner");
    component.employeefrom.controls['empResinationDate'].setValue("");
    component.employeefrom.controls['empSalary'].setValue(20);
    expect(component.employeefrom.invalid).toBeTruthy();
  });

  it('Check form validtion for SalaryRate with Chars', () => {
    component.employeefrom.controls['empId'].setValue("ATIL404");
    component.employeefrom.controls['cmpName'].setValue("Astoria Solutions");
    component.employeefrom.controls['empFirstname'].setValue("Chita");
    component.employeefrom.controls['empLastName'].setValue("Ranjan");
    component.employeefrom.controls['empGender'].setValue("Male");
    component.employeefrom.controls['empJoiningDate'].setValue("2022-05-04");
    component.employeefrom.controls['empDesignation'].setValue("Product Owner");
    component.employeefrom.controls['empResinationDate'].setValue("");
    component.employeefrom.controls['empSalary'].setValue("Twenty Rupees");
    expect(component.employeefrom.invalid).toBeTruthy();
  });
});
