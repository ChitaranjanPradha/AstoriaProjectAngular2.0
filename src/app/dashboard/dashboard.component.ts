import { DatePipe, getCurrencySymbol } from '@angular/common';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { Dashboard } from '../models/dashboard';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import plugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

pieChartData:any=[];
barChartData!:Dashboard[];
barChartSalaryData!:Dashboard[];
hours: any[]=[];
dates: any[]=[];
salaryDates: any[]=[];
salary: any[]=[];

  constructor(private DashboardService:DashboardService) {
 }

  ngOnInit(): void {
    this.GetEmployeeCount();
    this.getWorkingHoursPerDay();
    this.getSalaryPerDay();
  }

 public GetEmployeeCount =() => {
    this.DashboardService.getEmployeeCount().subscribe((data) => {
      this.pieChartData = data;
      new Chart('pieChart',{
        plugins:[ChartDataLabels],
        type:'pie',
        data:{
          labels:['Resigned Employee','Active Employee'],
          datasets:[{
            data:this.pieChartData,
            backgroundColor:['LightCoral', '#FFD700']
          }]
        }
      })
    });
  }

  public getWorkingHoursPerDay =() => {
    var datePipe = new DatePipe('en-US');
    this.DashboardService.getWorkingHoursPerDay().subscribe((data) => {
      this.barChartData = data;
      this.barChartData.forEach(e =>{
      this.dates.push(datePipe.transform(e.clockDate,'dd MMM yyyy'));
      this.hours.push(e.workingHours);
      })
       new Chart('barChart', {
        plugins:[ChartDataLabels],
        type: 'bar',
        data:{
          labels:this.dates,
          datasets: [
            {
            data:this.hours,
            label: "Working Hours",
            backgroundColor:['#00CED1']
          }
        ]
        }
      })
    })
  }

  public getSalaryPerDay =() => {
    var datePipe = new DatePipe('en-US');
    this.DashboardService.getSalaryPerDay().subscribe((data) =>{
      this.barChartSalaryData = data;
      this.barChartSalaryData.forEach(e =>{
          this.salaryDates.push(datePipe.transform(e.clockDate,'dd MMM yyyy'));
        this.salary.push(e.salary);
        })
        new Chart('barChartSalary',{
          plugins:[ChartDataLabels],
          type: 'bar',
          data:{
            labels:this.salaryDates,
            datasets:[
              {
                data:this.salary,
                label:'Salary',
                backgroundColor:['lightgreen']
              }
            ]
          }
        })
    })
  }
}
