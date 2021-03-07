import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {ProjPageCaptureInfo, InjectionSettings} from "../project/projectPageComponents"


export interface SingleInjectCaptureDialogue {
	callback: (setts:InjectionSettings, cap:ProjPageCaptureInfo,setIdx:number,capIdx:number) => void,
	cap: ProjPageCaptureInfo,
	set: InjectionSettings,
	setIdx:number,
	capN:number,
	justSetting: boolean,
	fromProjScreen:boolean	
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
		@Inject(MAT_DIALOG_DATA) public data: SingleInjectCaptureDialogue
		) { this.isSequential = true;}
		
		

	
	public onSubmitClick(clientIP: string, x2prt:string, x2t:string, x3prt:string, x3t:string): void {
		
		var injSet: InjectionSettings;
		
		if (this.isSettingsMode()) {
			injSet = this.data.set;
		} else {
			injSet = new InjectionSettings();
		}
		
		injSet.clientIP = clientIP;
		injSet.X2Transport = x2t;
		injSet.X2Port=x2prt;
		injSet.X3Transport = x3t;
		injSet.X3Port=x3prt;		
		// Resolve 			
		if (this.data.callback != null)
			this.data.callback(injSet, this.data.cap,this.data.setIdx,this.data.capN);
		
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
	
	public getCapture():ProjPageCaptureInfo {		
		return this.data.cap;
	}
	public getSettingsForCapture(): InjectionSettings {
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
