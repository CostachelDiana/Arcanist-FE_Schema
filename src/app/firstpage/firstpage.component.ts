import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BackendAPIHandler,IBEApiConsumer} from "../common/BackendAPIHandler"
import {CreateProjectDialogue} from "../dialogues/CreateProjectDialogue.component"
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

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
  isCaptureUploading: boolean;
  
  fileToUpload: File;
  
  projs: ProjEntry[];
  
  constructor(private api: BackendAPIHandler, private router: Router, public dialogue: MatDialog) { 
	this.showUploadError=false;
	this.fileToUpload=null;
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
  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
    }
  }
  
  
  public onFileSelected(files: FileList) {
	  console.log("Received file selected with list size "+files.length);
	  this.fileToUpload = files.item(0);
	  this.showUploadError=false;	  
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
		
	  if (this.fileToUpload !=null)
	  {
		  this.isCaptureUploading=true;
		  this.api.postFileUploadRequest(this,this.fileToUpload);
	  } else {
		  this.showUploadError=true;
	  }
  }
  public handleBEResponse(jObj: Object, evtType: string)
  {
	  if (evtType=="capture-uploaded")
	  {
		  var capID = jObj["uuid"];		  
		  this.router.navigateByUrl("/CaptureEdit?capid="+capID);
		  this.isCaptureUploading=false;
	  } else if (evtType=="full-project-list")
	  {
		  console.log("received project list json "+JSON.stringify(jObj));
		  for (let item in jObj) {
			  console.log("deserializing item "+JSON.stringify(item));
			  var entry = new ProjEntry();
			  entry.projectName=item["name"];
			  entry.projectId=item["id"];
			  entry.projectLink="/ProjectPage?projId="+entry.projectId;
			  this.projs.push(entry);
		  }
		  
	  }
  }
  public onProjectCreated(projID: string)
  {
	    this.router.navigateByUrl("/ProjectPage?projId="+projID);		
  }
 
  public onSubmit(): void {
    //this.fileService.upload(this.fileName, this.formGroup.get('file').value);
    //this.router.navigate(['./CaptureEdit', {fname:this.fileName}]);
  }

  public getFileName(): string{
    return this.fileName;
  }

}
