import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {PredefinedTypeStruct} from "../captureedit/CaptureStructures"


export interface AddCaptureTagDialogueData {
	callback: (tagID:string) => void,
	
	tagList: PredefinedTypeStruct[];
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './AddCaptureTagDialogue.html'
})


export class AddCaptureTagDialogue {
	
	constructor (
		private dialogRef: MatDialogRef<AddCaptureTagDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: AddCaptureTagDialogueData
		) {}
		
		
	public getTagList(): PredefinedTypeStruct[] {
		if (this.data.tagList==null)
			this.data.tagList=[];
			
		return this.data.tagList;
	}
	
	public onSubmitClick(tagId: string ): void {
		
		if (this.data.callback != null)
			this.data.callback(tagId);
		
		this.dialogRef.close();
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
