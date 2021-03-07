import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {ProjPageCaptureInfo, InjectionSettings} from "../project/projectPageComponents"


export interface InjectCapturesDialogueData {
	callback: (setts:InjectionSettings[], cap:ProjPageCaptureInfo[], isSeq: boolean) => void,
	cap: ProjPageCaptureInfo[],
	set: InjectionSettings[],
	justSetting: boolean;

}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './InjectCapturesDialogue.html'
})


export class InjectCapturesDialogue {
	
	isSequential: boolean;
	
	constructor (
		private dialogRef: MatDialogRef<InjectCapturesDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: InjectCapturesDialogueData
		) { this.isSequential = true;}
		
		

	
	public onSubmitClick(email: string): void {
		// Resolve 			
		if (this.data.callback != null)
			this.data.callback(this.data.set, this.data.cap, this.isSequential);
		
		this.dialogRef.close();
	}
	
	public getPageTitle() {
		if (this.data.justSetting)
			return "Set Default Settings for Capture(s)";
		else 
			return "Set Injection Parameters";
	}
	
	public onToggleInjectionClick(): void {
		this.isSequential = !this.isSequential;
	}
	
	public getCaptures():ProjPageCaptureInfo[] {
		return this.data.cap;
	}
	public getSettingsForCapture(idx: number): InjectionSettings {
		return this.data.set[idx];
	}
	
	public getSubmitTitle() {
		if (this.data.justSetting)
			return "Apply default settings";
		else
		{
			if (this.isSequential)
				return "Inject sequentialy";
			else 
				return "Inject simultaneously";
		}
	}
}
