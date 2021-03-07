import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {ProjPageCaptureInfo} from '../project/projectPageComponents'


export interface SelectCaptureDialogueData {
	callback: (capInfo: ProjPageCaptureInfo, capSet: number) => void,
	capSet: number;
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './SelectCaptureDialogue.html'
})


export class SelectCaptureDialogue {
	
	constructor (
		private dialogRef: MatDialogRef<SelectCaptureDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: SelectCaptureDialogueData
		) {}
		
		
	
	public onSubmitClick(captureID: string): void {
		
		// Resolve 
		
		// CMS debug
		var aCapture = new ProjPageCaptureInfo(captureID,"ADGr123");
		aCapture.captureX2Port="5001";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="6005";
		aCapture.captureX3Transport="TCP";
		aCapture.captureX3Protocol="ULIC RTP";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD&CC";
		aCapture.captureIC="MSISDN";
		aCapture.captureICVal="+31332442312";
		
		// CMS to do - validate and get data from BE
		
		if (this.data.callback != null)
			this.data.callback(aCapture,this.data.capSet);
		
		this.dialogRef.close();
	}
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
