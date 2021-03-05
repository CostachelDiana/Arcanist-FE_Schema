import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { SearchComponent } from '../app/search/search.component';
import { UploadComponent } from '../app/upload/upload.component';
import { HomeComponent } from '../app/home/home.component';
import { ProjectComponent } from '../app/project/project.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'HomePage', component: HomeComponent},
  {path:'LoginPage', component: LoginComponent},
  {path:'SearchPage', component: SearchComponent},
  {path:'UploadPage', component: UploadComponent}, //need to disable this
  {path:'ProjectPage', component: ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
