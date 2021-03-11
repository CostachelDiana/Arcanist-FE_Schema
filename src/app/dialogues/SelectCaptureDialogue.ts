import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaptureInjectInfo } from '../utils/captureInfoComponents'
import {IBEApiConsumer, BackendAPIHandler} from '../common/BackendAPIHandler'
import {FullCaptureInfo} from '../captureedit/CaptureStructures'


export interface SelectCaptureDialogueData {
 	callback: (capInfo: CaptureInjectInfo, capSet: number) => void,
	capSet: number;
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './SelectCaptureDialogue.html'
})


export class SelectCaptureDialogue implements IBEApiConsumer{
	
	
	showError: boolean;
	searchedID: string;
	constructor (
		private dialogRef: MatDialogRef<SelectCaptureDialogue>,
		private api: BackendAPIHandler,
		@Inject(MAT_DIALOG_DATA) public data: SelectCaptureDialogueData
		) {
			this.showError=false;
			this.searchedID="";
		}
		
	handleBEResponse(jObj: Object, evtType: string) {
		
		console.log("received evt type" +evtType);
		if (evtType=="capture-page-received")
		{
			console.log("received capture with jObj "+JSON.stringify(jObj));
			
			var capInfo = new FullCaptureInfo();
			capInfo.setBeObj(jObj,this.api.presetTypes);
			
			var aCapture = new CaptureInjectInfo(this.searchedID,capInfo.capName);
			aCapture.captureX2Port=capInfo.capX2Port;
			aCapture.captureX2Transport=capInfo.capX2Trans;
			aCapture.captureX2Protocol=capInfo.capX2Protocol;
			aCapture.captureX3Port=capInfo.capX3Port;
			aCapture.captureX3Transport=capInfo.capX3Trans;
			aCapture.captureX3Protocol=capInfo.capX3Protocol;
			aCapture.switchDate=capInfo.capSwitchDate;
			aCapture.captureType="CD&CC";
			aCapture.captureIC=capInfo.capIC.infoTypeName;
			aCapture.captureICVal=capInfo.capIC.infoValName;
			
			if (this.data.callback != null)
				this.data.callback(aCapture,this.data.capSet);
			
			
			this.dialogRef.close();
		
		} else if (evtType == "capture-retrieve-failed") {
			console.log("setting error to true");
			this.showError=true;
		}
	}
	
	public onSubmitClick(captureID: string): void {
		
		// Resolve 
		var isURL = captureID.includes("http");
		var capId="";
		if (isURL){
			console.log("URL detected");
			var idx = captureID.indexOf('capid');
			if (idx >0)
			{
				capId=captureID.substring(idx+6);
			}
			
		} else {
			capId=captureID;
		}
		this.searchedID=capId;
		// CMS debug
		this.showError=false;
		this.api.getCaptureById(this,capId);
		/* var jObj = {
			"event-type" : "capture-retrieve-failed"
		}
		this.handleBEResponse(jObj,"capture-retrieve-failed");*/
    
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
