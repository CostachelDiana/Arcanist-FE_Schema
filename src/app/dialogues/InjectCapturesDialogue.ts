import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {ProjPageCaptureInfo, InjectionSettings} from "../project/projectPageComponents"


export interface InjectCapturesDialogueData {
	callback: (setts:InjectionSettings[], cap:ProjPageCaptureInfo[], isSeq: boolean, setIdx:number) => void,
	cap: ProjPageCaptureInfo[],
	set: InjectionSettings[],
	setIdx:number,
	justSetting: boolean
	
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
		
		var ips=document.querySelectorAll(".clientIP");
		var x2prts=document.querySelectorAll(".x2prt");
		var x2trans=document.querySelectorAll(".x2trans");
		var x3prts=document.querySelectorAll(".x3prt");
		var x3trans=document.querySelectorAll(".x3trans");
		
		var tmpInj : InjectionSettings[];
		
		if (this.isSettingsMode())
		{
			tmpInj = this.data.set;
			
		} else {
			// use a clone for injection 
			tmpInj = [];
			
			this.data.set.forEach(val => tmpInj.push(Object.assign({},val)));			
		}
		
		for (var i=0;i< ips.length;i++)
		{
			tmpInj[i].clientIP =(<HTMLInputElement>ips[i]).value;
			tmpInj[i].X2Port= (<HTMLInputElement>x2prts[i]).value;
			tmpInj[i].X2Transport= (<HTMLInputElement>x2trans[i]).value;
			tmpInj[i].X3Port= (<HTMLInputElement>x3prts[i]).value;
			tmpInj[i].X3Transport= (<HTMLInputElement>x3trans[i]).value;
		}
		
		// Resolve 			
		if (this.data.callback != null)
			this.data.callback(tmpInj, this.data.cap, this.isSequential,this.data.setIdx);
		
		
		this.dialogRef.close();
	}
	
	public getPageTitle() {
		if (this.data.justSetting)
			return "Set Default Injection Settings for Captures";
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
			return "Apply settings";
		else
		{
			if (this.isSequential)
				return "Inject sequentialy";
			else 
				return "Inject simultaneously";
		}
	}
	public isSettingsMode(): boolean {
		return this.data.justSetting;
	}
}
