
import { PracticeComponent } from './practice/practice.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { EmployeemasterComponent } from './employeemaster/employeemaster.component';
import { EmployeeattendanceComponent } from './employeeattendance/employeeattendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeemasterdialogComponent } from './employeemasterdialog/employeemasterdialog.component';
import { NgChartsModule } from 'ng2-charts';
import { AllowanceComponent } from './allowance/allowance.component';
import { AllowanceDirective } from './allowance.directive';
import { SubmitAnIdeaComponent } from './SubmitAnIdea/SubmitAnIdea.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignUpComponent } from './sign-up/sign-up.component';

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeemasterComponent,
    EmployeeattendanceComponent,
    DashboardComponent,
    PracticeComponent,
    EmployeemasterdialogComponent,
    AllowanceComponent,
    AllowanceDirective,
    SubmitAnIdeaComponent,
    LoginPageComponent,
    SignUpComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    DatePipe,
    NgChartsModule,
    HttpClientModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    ],
  providers: [DatePipe],
  exports: [
  MatPaginatorModule],
  bootstrap: [AppComponent],
  entryComponents: [EmployeemasterdialogComponent]
})
export class AppModule {
   //define available languages
   availableLng = ['en', 'es'];

   //start the translation service
   constructor(private translateService: TranslateService) {
     //defines the default language
     let tmpLng = 'en';

     //gets the default browser language
     const currentLng = window.navigator.language.substring(0,2);

     if (this.availableLng.includes(currentLng))
            tmpLng = currentLng;

     translateService.setDefaultLang(tmpLng);
   }
 }
