import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BackendAPIHandler,IBEApiConsumer} from "../common/BackendAPIHandler"
import {CreateProjectDialogue} from "../dialogues/CreateProjectDialogue.component"
import {UploadCaptureDialogue} from "../dialogues/UploadCaptureDialogue"
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

export class ProjEntry {
	projectName: string;
	projectId: number;
	projectLink: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})




export class FirstPage implements OnInit, IBEApiConsumer {

  private fileName;
  

  showUploadError: boolean;
  
  
  projs: ProjEntry[];
  
  constructor(private api: BackendAPIHandler, private router: Router, public dialogue: MatDialog) { 
	
	this.projs=[];
	
	/*
	var entry = new ProjEntry();
	entry.projectName="Testzorila";
	entry.projectLink="cacamaka";
	entry.projectId= 4;
	this.projs.push(entry);
	
	var entry = new ProjEntry();
	entry.projectName="projectzorila rau sada gra";
	entry.projectLink="cacamaka";
	entry.projectId= 4;
	this.projs.push(entry);*/
  }

  ngOnInit(): void {
  }

  onClickLogin() {	}

  public getProjects():ProjEntry[] {
	  return this.projs;
  }
  
  
  public onCreateProjectClick() {
	  
		var dialogRef = this.dialogue.open(CreateProjectDialogue, 
		{width:'400px',
		height:'300px',
		data: { callback: this.onProjectCreated.bind(this)}
		}
		);
		
	  
  }
  public onGetAllProjectsClick() {
	  
	  this.api.requestAllProjects(this);
  }
  
  public onCaptureUploadClick() {	
		
		var dialogRef = this.dialogue.open(UploadCaptureDialogue, 
		{width:'550px',
		height:'350px',
		data: { callback: this.onCaputreUploaded.bind(this)}
		}
		);
	  
  }
  public handleBEResponse(jObj: Object, evtType: string)
  {
	  if (evtType=="full-project-list")
	  {
		  console.log("received project list json "+JSON.stringify(jObj));
		  for (let item in jObj) {			  
			  var entry = new ProjEntry();
			  entry.projectName=jObj[item]["name"];
			  entry.projectId=jObj[item]["id"];
			  entry.projectLink="/ProjectPage?projId="+entry.projectId;
			  this.projs.push(entry);
		  }
		  
	  }
  }
  public onProjectCreated(projID: string)
  {
	    this.router.navigateByUrl("/ProjectPage?projId="+projID);		
  }
  public onCaputreUploaded(capID: string)
  {
	  this.router.navigateByUrl("/CaptureEdit?capid="+capID);
  }
 
  public onSubmit(): void {
    //this.fileService.upload(this.fileName, this.formGroup.get('file').value);
    //this.router.navigate(['./CaptureEdit', {fname:this.fileName}]);
  }

  public getFileName(): string{
    return this.fileName;
  }

}
