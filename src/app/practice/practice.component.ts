import { EmployeemasterComponent } from './../employeemaster/employeemaster.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {ThemePalette} from '@angular/material/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  position: number;
  name: string;
  Designation: string;
  State: string;
}
export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Chitaranjan Pradhan', Designation: 'Software trainee', State: 'Odisha'},
    {position: 2, name: 'Abhisheak Malakar', Designation: 'Software trainee', State: 'Madhya Prdesh'},
    {position: 3, name: 'Ajay Byri', Designation: 'Software trainee', State: 'Telangana'},
    {position: 4, name: 'Amol Jagtap', Designation: 'Software trainee', State: 'Maharastra'},
    {position: 5, name: 'Vikash Gothi', Designation: 'Software trainee', State: 'Madhya Prdesh'},
    {position: 8, name: 'Anuja Bansod', Designation: 'Software trainee', State: 'Madhya Prdesh'},
    {position: 6, name: 'Lavanya Yangala', Designation: 'Software trainee', State: 'Andra Prdesh'},
    {position: 7, name: 'Priya Priya', Designation: 'Software trainee', State: 'Madhya Prdesh'},
    {position: 9, name: 'Megha Ahirwar', Designation: 'Software trainee', State: 'Madhya Prdesh'},
    {position: 10, name: 'Renuka Singare', Designation: 'Software trainee', State: 'Madhya Prdesh'}
  ];

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = this.ELEMENT_DATA;
  }
  openDialog(){
    this.dialog.open(EmployeemasterComponent, {
      width: '1200px',
      height: '600px'

    });

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  displayedColumns: string[] = ['position', 'name', 'Designation', 'State'];


@ViewChild(MatPaginator)
paginator!:MatPaginator;

@ViewChild(MatSort) Sort!:MatSort;


ngAfterViewInit(): void {
   this.dataSource.sort = this.Sort;
   this.dataSource.paginator = this.paginator;
  }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  buttonClicked()
  {
    alert("Button clicked")
  }


  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}



