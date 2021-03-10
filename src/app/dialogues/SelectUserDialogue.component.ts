import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {ProjMember} from "../project/projectPageComponents"


export interface SelectUserDialogueData {
	callback: (member:string) => void
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './SelectUserDialogue.html'
})


export class SelectUserDialogue {
	
	constructor (
		private dialogRef: MatDialogRef<SelectUserDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: SelectUserDialogueData
		) {}
		
		

	
	public onSubmitClick(email: string): void {
		
		// CMS to do - validate and get data from BE
		
		if (this.data.callback != null)
            this.data.callback(email);
		
		this.dialogRef.close();
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
