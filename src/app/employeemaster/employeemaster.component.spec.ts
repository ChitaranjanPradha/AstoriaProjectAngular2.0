import { EmployeemasterService } from './../services/employeemaster.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeemasterComponent } from './employeemaster.component';
import {HttpClientModule} from '@angular/common/http';

import {MatPaginatorModule} from '@angular/material/paginator';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormBuilder } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
fdescribe('EmployeemasterComponent', () => {
  let component: EmployeemasterComponent;
  let fixture: ComponentFixture<EmployeemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeemasterComponent ],
      imports: [HttpClientModule, MatFormFieldModule,
        MatInputModule, BrowserAnimationsModule, MatDialogModule, BrowserDynamicTestingModule,MatPaginatorModule,MatTableModule],

      providers: [EmployeemasterService, FormBuilder,DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create EmployeemasterComponent', () => {
    expect(EmployeemasterComponent).toBeTruthy();
  });

  it('should have a title Employee Details', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('Employee Details');
  });

  it('should in table column should  contain employeeId',() =>{
    expect(component.displayedColumns[0]).toContain("employeeId");
  })

  it('should in table column should  contain employeeName',() =>{
    expect(component.displayedColumns[1]).toContain("employeeName");
  })

  it('should in table column should  contain companyName',() =>{
    expect(component.displayedColumns[2]).toContain("companyName");
  })

  it('should in table column should  contain designation',() =>{
    expect(component.displayedColumns[3]).toContain("designation");
  })

  it('should in table column should  contain joiningDate',() =>{
    expect(component.displayedColumns[4]).toContain("joiningDate");
  })

  it('should in table column should  contain gender',() =>{
    expect(component.displayedColumns[5]).toContain("gender");
  })

  it('should in table column should  contain activeStatus',() =>{
    expect(component.displayedColumns[6]).toContain("activeStatus");
  })

  it('should in table column should  contain add',() =>{
    expect(component.displayedColumns[7]).toContain("add");
  })

  it('should call add Dialog', () => {
    expect(component.openEmpDialog).toBeTruthy();
  });

  it('should call edit Dialog', () => {
    const app = fixture.componentInstance;
    expect(app.openEmpDialog(10105)).toBeTrue;
  });

  it('should delete employee', () => {
    const app = fixture.componentInstance;
    expect(app.deleteEmployee(10107)).toBeTrue;
  });

  it('should Total Records Count in Mat-Table', () => {
    const totalRecords = component.dataSource.data.length;
    expect(totalRecords).toBeGreaterThanOrEqual(0);
  });




});
