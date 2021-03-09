import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {PredefinedTypeStruct} from "../captureedit/CaptureStructures"


export interface AddCaptureInfoDialogueData {
	callback: (typeID: string, valID:string) => void,
	eventTypes: PredefinedTypeStruct[],
	eventValues: PredefinedTypeStruct[][]
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './AddCaptureInfoDialogue.html'
})


export class AddCaptureInfoDialogue {
	
	constructor (
		private dialogRef: MatDialogRef<AddCaptureInfoDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: AddCaptureInfoDialogueData
		) { 
			this.curValues=[];
			if (this.data.eventValues.length>0) 
				this.curValues=this.data.eventValues[0];
		}
	
	curValues: PredefinedTypeStruct[];
	
	public getEventTypes(): PredefinedTypeStruct[] {
		return this.data.eventTypes;
	}
	
	public getEventValues(): PredefinedTypeStruct[] {
		return this.curValues;
	}
		
	public onEventTypeChange(typeID: string) {
		
		for (var i=0;i<this.data.eventTypes.length;i++)
		{
			if (this.data.eventTypes[i].id == typeID)
			{
				this.curValues = this.data.eventValues[i];
			}
		}
	}
	
	public onSubmitClick(typeID: string, valID: string): void {
				
		if (this.data.callback != null)
			this.data.callback(typeID, valID);
		
		this.dialogRef.close();
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
