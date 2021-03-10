import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { CaptureEditPage } from './captureedit/captureedit.component';
import { FirstPage } from './firstpage/firstpage.component';
import {SelectUserDialogue} from './dialogues/SelectUserDialogue.component';
import {SelectCaptureDialogue} from './dialogues/SelectCaptureDialogue';
import {InjectCapturesDialogue} from './dialogues/InjectCapturesDialogue';
import {SingleInjectCaptureDialogue} from './dialogues/SingleInjectCaptureDialogue';
import {AddCapturesSetDialogue} from './dialogues/AddCapturesSetDialogue';
import {AddCaptureTagDialogue} from './dialogues/AddCaptureTagDialogue';
import {AddCaptureInfoDialogue} from './dialogues/AddCaptureInfoDialogue';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import  {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
}; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    UploadComponent,
    HomeComponent,
    ProjectComponent,
	SelectUserDialogue,
	SelectCaptureDialogue,
	InjectCapturesDialogue,
	SingleInjectCaptureDialogue,
	AddCapturesSetDialogue,
	AddCaptureTagDialogue,
	AddCaptureInfoDialogue,
	CaptureEditPage,
	FirstPage
	
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
	MatDialogModule,
	MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],

  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
