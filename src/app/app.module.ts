import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import  {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
// import { NgxPopper } from '@angular-popper';

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
    MatInputModule
//    NgxPopper
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
