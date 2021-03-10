import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {ProjMember} from "../project/projectPageComponents"
import {BackendAPIHandler,IBEApiConsumer} from "../common/BackendAPIHandler"


export interface CreateProjectDialogueData {
	callback: (projectId:string) => void
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './CreateProjectDialogue.html'
})


export class CreateProjectDialogue implements IBEApiConsumer {
	
	projectNameDuplicated: boolean;
	
	constructor (
		private dialogRef: MatDialogRef<CreateProjectDialogue>,
		private api: BackendAPIHandler,
		@Inject(MAT_DIALOG_DATA) public data: CreateProjectDialogueData
		) {
			
			this.projectNameDuplicated=false;
		}
		
		
	

	
	public onSubmitClick(projectName: string): void {
		// Resolve 
		
		
		this.api.postCreateProject(this,projectName);
		
	}
	public handleBEResponse(jObj: Object, evtType: string): void {
		if (evtType=="project-created")
		{
			var projID=jObj["id"];
			this.dialogRef.close();
			this.data.callback(projID);
		} else if (evtType=="project-creation-error")
		{
			console.log("Received project creation error "+JSON.stringify(jObj));
			this.projectNameDuplicated=true;
		}
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
