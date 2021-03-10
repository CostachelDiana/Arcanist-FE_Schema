import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { PredefinedTypeStruct, PresetTypesInfo } from '../captureedit/CaptureStructures';
import { BackendAPIHandler } from '../common/BackendAPIHandler';
import { CaptureSet } from "../project/projectPageComponents"



export interface AddCapturesSetDialogueData {
    callback: (capSet: CaptureSet) => void,
    pdt: PresetTypesInfo;
}


@Component({
  selector: 'app-project',
  //selector: 'user-select-dialogue',
  templateUrl: './AddCapturesSetDialogue.html'
})


export class AddCapturesSetDialogue {


    capSet: CaptureSet;

    constructor(
		private dialogRef: MatDialogRef<AddCapturesSetDialogue>,
		@Inject(MAT_DIALOG_DATA) public data: AddCapturesSetDialogueData
    )
    {
        this.capSet = new CaptureSet("");
    }
		
	
	public onSubmitClick(setName: string): void {
		
        this.capSet.capSetName = setName;
		
		if (this.data.callback != null)
            this.data.callback(this.capSet);
		
		this.dialogRef.close();
    }

    public onX2ProtocolSelectionChanged(event: any) {
        this.capSet.capSetX2Protocol = event.target.value;
    }

    public onX3ProtocolSelectionChanged(event: any) {
        this.capSet.capSetX3Protocol = event.target.value;
    }

    public getCapX2Protos(): PredefinedTypeStruct[] {
        return this.data.pdt.capX2Protos;
    }

    public getCapX3Protos(): PredefinedTypeStruct[] {
        return this.data.pdt.capX3Protos;
    }
	
	public onCancelClick(): void {
		this.dialogRef.close();
	}
}
