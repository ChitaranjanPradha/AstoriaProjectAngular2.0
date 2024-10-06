import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UsersService } from './services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubmitAnIdeaComponent } from './SubmitAnIdea/SubmitAnIdea.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private usersService: UsersService,private dialog: MatDialog) { }
  randomName(start: any) {
    start.toggle();
  }
  title = 'astoriaTrainingAngular';

  logout() {
    this.usersService.logout()
  }

  // reportAnIssue(){
    
  // }

  reportAnIssue(){
    return;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(
      SubmitAnIdeaComponent,
      dialogConfig
    );
  }
}


