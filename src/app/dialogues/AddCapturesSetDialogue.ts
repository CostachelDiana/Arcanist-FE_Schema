import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {CaptureSet} from "../project/projectPageComponents"


export interface AddCapturesSetDialogueData {
	callback: (capSet:CaptureSet) => void
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './AddCapturesSetDialogue.html'
})


export class AddCapturesSetDialogue {
	
	constructor (
		private dialogRef: MatDialogRef<AddCapturesSetDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: AddCapturesSetDialogueData
		) {}
		
		

	
	public onSubmitClick(setName: string, x2: string, x3: string ): void {
		// Resolve 
		
		// CMS to do - validate and get data from BE
		
		var capSet = new CaptureSet(setName);
		
		capSet.capSetX2Protocol = x2;
		capSet.capSetX3Protocol = x3;
		
		if (this.data.callback != null)
			this.data.callback(capSet);
		
		this.dialogRef.close();
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
