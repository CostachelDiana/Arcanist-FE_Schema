import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BackendAPIHandler,IBEApiConsumer} from "../common/BackendAPIHandler"
import {CreateProjectDialogue} from "../dialogues/CreateProjectDialogue.component"
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-project',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})

export class FirstPage implements OnInit, IBEApiConsumer {

  private fileName;
  

  showUploadError: boolean;
  isCaptureUploading: boolean;
  isProjectCreating:boolean;
  fileToUpload: File;
  
  constructor(private api: BackendAPIHandler, private router: Router, public dialogue: MatDialog) { 
	this.showUploadError=false;
	this.fileToUpload=null;
	this.isProjectCreating=false;
  }

  ngOnInit(): void {
  }

  onClickLogin() {	}

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
      alert("Capture uploaded successfully");

		  var capID = jObj["uuid"];

      $('#closeModal').click;

		  this.isCaptureUploading=false;
	  } else if (evtType=="project-created")
	  {
		  var projID=jObj["id"];
		  this.router.navigateByUrl("/ProjectPage?projId="+projID);
		  this.isProjectCreating=false;
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
