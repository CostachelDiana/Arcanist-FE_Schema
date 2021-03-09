import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaptureInjectInfo, CaptureInjectionSettings } from "../utils/captureInfoComponents"
import {PredefinedTypeStruct} from "../captureedit/CaptureStructures"


export interface SingleInjectCaptureDialogueData {
  	callback: (setts: CaptureInjectionSettings[], cap:CaptureInjectInfo[]) => void,
	cap: CaptureInjectInfo[],
	set: CaptureInjectionSettings[],
	justSetting: boolean,
	fromProjScreen:boolean,
	X2TransVals: PredefinedTypeStruct[],
	X3TransVals: PredefinedTypeStruct[]
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './SingleInjectCaptureDialogue.html'
})


export class SingleInjectCaptureDialogue {
	
	isSequential: boolean;
	
	constructor (
		private dialogRef: MatDialogRef<SingleInjectCaptureDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: SingleInjectCaptureDialogueData
		) { this.isSequential = true;}
	
	public getX2TransVals(): PredefinedTypeStruct[] {
		if (this.data.X2TransVals == null) 
			this.data.X2TransVals = [];
			
		return this.data.X2TransVals;
	}
	
	public getX3TransVals(): PredefinedTypeStruct[] {
		if (this.data.X3TransVals == null) 
			this.data.X3TransVals = [];
			
		return this.data.X3TransVals;
	}
	
	
	public onSubmitClick(clientIP: string, x2prt:string, x2t:string, x3prt:string, x3t:string): void {
		
		var injSet: CaptureInjectionSettings;
		
		injSet = new CaptureInjectionSettings();
		
		injSet.clientIP = clientIP;
		injSet.X2Transport = x2t;
		injSet.X2Port=x2prt;
		injSet.X3Transport = x3t;
		injSet.X3Port=x3prt;		
		// Resolve
		var arr = [];
		arr.push(injSet)
		if (this.data.callback != null)
			this.data.callback(arr, this.data.cap);
		
		this.dialogRef.close();
	}
	
	public getPageTitle() {
		if (this.data.justSetting)
			return "Set Default Injection Settings for Capture";
		else 
			return "Set Injection Parameters";
	}
	
	public onToggleInjectionClick(): void {
		this.isSequential = !this.isSequential;
	}
	
	public getCapture():CaptureInjectInfo[] {		
		return this.data.cap;
	}
	public getSettingsForCapture(): CaptureInjectionSettings[] {
		return this.data.set;
	}
	
	public getSubmitTitle() {
		if (this.data.justSetting)
			return "Apply settings";
		else
		{
			return "Inject";
		}
	}
	public isSettingsMode(): boolean {
		return this.data.justSetting;
	}
}
