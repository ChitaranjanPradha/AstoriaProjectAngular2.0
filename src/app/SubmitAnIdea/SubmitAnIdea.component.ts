import { Component, OnInit } from '@angular/core';
import { EmployeemasterService } from './../services/employeemaster.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-SubmitAnIdea',
  templateUrl: './SubmitAnIdea.component.html',
  styleUrls: ['./SubmitAnIdea.component.css']
})
export class SubmitAnIdeaComponent implements OnInit {

  constructor(private EmployeemasterService: EmployeemasterService,private dialog: MatDialog) { }

  ngOnInit() {
  }

  selectedFiles: File[]=[];
  uploadedFiles: File[] = [];

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      this.EmployeemasterService.uploadFilesServices(this.selectedFiles).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            // Handle progress updates if needed
          } else if (event.type === HttpEventType.Response) {
            console.log('Files uploaded successfully', event.body);
            this.uploadedFiles = event.body;
          }
        },
        (error) => {
          console.error('Error uploading files', error);
        }
      );
    }
  }
  close(){
    this.dialog.closeAll();
  }

}
