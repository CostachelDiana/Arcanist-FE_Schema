import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {ProjMember} from "../project/projectPageComponents"
import {BackendAPIHandler,IBEApiConsumer} from "../common/BackendAPIHandler"


export interface UploadCaptureDialogueData {
	callback: (captureId:string) => void
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './UploadCaptureDialogue.html'
})


export class UploadCaptureDialogue implements IBEApiConsumer {
	
	isCaptureUploading: boolean;
	fileToUpload: File;
	showUploadError: boolean;
	
	constructor (
		private dialogRef: MatDialogRef<UploadCaptureDialogue>,
		private api: BackendAPIHandler,
		@Inject(MAT_DIALOG_DATA) public data: UploadCaptureDialogueData
		) {
			
			this.isCaptureUploading=false;
			this.showUploadError=false;
		}
		
		
	

	public onFileSelected(files: FileList) {	  
	  this.fileToUpload = files.item(0);
	  this.showUploadError=false;
	}
	
	public onSubmitClick(projectName: string): void {
		// Resolve 
		if (this.fileToUpload==null)
		{
			this.showUploadError=true;
		}
		else {
			this.isCaptureUploading=true;
			this.api.postFileUploadRequest(this,this.fileToUpload);
		}
		
	}
	public handleBEResponse(jObj: Object, evtType: string): void {
		if (evtType=="capture-uploaded")
		{
			
			var capID = jObj["uuid"];
			this.data.callback(capID);
			this.isCaptureUploading=false;
		}
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
