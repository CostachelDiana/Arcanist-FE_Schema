import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { HttpClient } from '@angular/common/http';
// import { CaptureDetails, CaptureSets } from './ICapture';
// import { Member, ProjectDetails, Protocol } from './IProject';

import { CaptureSet, ProjMember, ProjPageInfo } from './projectPageComponents'
import { CaptureInjectionSettings, CaptureInjectInfo } from '../utils/captureInfoComponents'
import { CaptureInjectSerializer } from '../utils/captureInjectSerializer'
import {IPage, IBEAbstractionGeneric} from './IProject'
import {SelectUserDialogue} from '../dialogues/SelectUserDialogue.component'
import {SelectCaptureDialogue} from '../dialogues/SelectCaptureDialogue'
import {InjectCapturesDialogue} from '../dialogues/InjectCapturesDialogue'
import {AddCapturesSetDialogue} from '../dialogues/AddCapturesSetDialogue'
import {SingleInjectCaptureDialogue} from '../dialogues/SingleInjectCaptureDialogue'
import {ProjectPageEventSerializer} from './projectPageEventSerializer'
import {ProjectBEAbstraction} from './projectBEAbstraction'
import {PredefinedTypeStruct} from '../captureedit/CaptureStructures'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BackendAPIHandler } from '../common/BackendAPIHandler'



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements IPage {
	
	projInfo: ProjPageInfo ;
	public projNamesList: string[];
	 
    BEAbs: ProjectBEAbstraction;
	serializer: ProjectPageEventSerializer;
	captureInjectSerializer: CaptureInjectSerializer;
	
	// CMS debug purposes
	projNotes: HTMLInputElement;
	
	pageInited: boolean;
	projectDetailsVisible: boolean;
	projectCaptureSetsVisible: boolean;
	
	// initing methods
    constructor(public dialogue: MatDialog,
        private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {
        console.log("getCurrentNavigation: " + this.router.getCurrentNavigation().extras.state);
        console.log("url is: " + window.location.href);

        let projName: string;
        let projDetails: string;
        rez: this.activatedRoute.queryParams.subscribe(params => {
            projName = params['projName'] || "";
            projDetails = params['projDetails'] || "";
        });

        console.log("filename is: " + projName);
        console.log("projDetails is: " + projDetails);

        this.BEAbs = new ProjectBEAbstraction(http,this);
        this.BEAbs.setPage(this);

        this.serializer = new ProjectPageEventSerializer();
        this.captureInjectSerializer = new CaptureInjectSerializer();

        this.pageInited = false;
        this.projectDetailsVisible = true;
        this.projectCaptureSetsVisible = true;

        var urlParams = new URLSearchParams(window.location.search);
        var projID = urlParams.get('projId');

        if (projID == undefined)
            projID = "1";
        var aJson = this.serializer.serializeProjectPageRequest(projID);
        this.BEAbs.sendBEUpdate(aJson, "fetch-project-page");
        //this.BEAbs.api.getAllLabels(this.BEAbs);
	}
	
	initBEData(): void {
		var reqStr = this.serializer.serializeRequestPresetInfo();
        this.BEAbs.sendBEUpdate(reqStr,"request-presets");
	
	}
	
	public onFetchProjectClick(): void {
		var aJson = this.serializer.serializeProjectPageRequest("ProjectIDPlaceholder");
        this.BEAbs.sendBEUpdate(aJson, "fetch-project-page");
	}
	
	public onGeneratePageClick(): void {
		this.pageInited=true;
	}
	
	public isPageReady(): boolean {
		return this.pageInited;
	}

	public isProjectDetailsVisible(): boolean {
		return this.projectDetailsVisible;
	}

	public isProjectCaptureSetsVisible(): boolean {
		return this.projectCaptureSetsVisible;
	}
	
	
	
	public initPage(pgJson: string): void
	{
	
	}
	public initProjectPage(info: ProjPageInfo): void {
		this.projInfo = info;
	}
	
	public refresh():void {
		// nothing to do right now
	}
	public setBEAbstraction(be: IBEAbstractionGeneric): void {
		
	}

	onExpandProjectDetails(): void {
		var btnProjectDetails = document.getElementById("btnProjectDetails");

		if (this.projectDetailsVisible == false) {
			this.projectDetailsVisible = true;
            btnProjectDetails.textContent = " - Collapse";
		}
		else {
			this.projectDetailsVisible = false;
			btnProjectDetails.textContent = " + Expand";
		}
	}

	onExpandProjectCaptureSets(): void {
		var btnProjectCaptureSets = document.getElementById("btnProjectCaptureSets");

		if (this.projectCaptureSetsVisible == false) {
			this.projectCaptureSetsVisible = true;
			btnProjectCaptureSets.textContent = " - Collapse";
		}
		else {
			this.projectCaptureSetsVisible = false;
			btnProjectCaptureSets.textContent = " + Expand";
		}
	}
	
	// callbacks 
	public onChangeOwnerCback(aMember: string)
	{
		this.projInfo.projOwner =aMember;
	}
	
	public onAddMemberCBack(aMember: string)
    {
	    this.projInfo.addProjectMember(aMember);
	    this.BEAbs.GetBackendAPI().addMemberInProject(this.projInfo.projID, aMember, this.BEAbs);
	}
	
	public onAddCaptureCallback(aCap: CaptureInjectInfo, setN: number)
	{
	        if (setN > -1 && setN < this.projInfo.projCapSets.length) {
                this.projInfo.projCapSets[setN].addCapture(aCap);
                console.log(" capture id: " + aCap.captureID);
	            this.BEAbs.GetBackendAPI().addCaptureInSet(this.projInfo.projCapSets[setN].capSetID, aCap.captureID, this.BEAbs);
	        }
		 
	}
	
	public onAddCaptureSetCallback(aSet:CaptureSet)
	{
	        //this.projInfo.addCaptureSet(aSet);
	        var jSon = this.serializer.serializeCaptureSet(aSet, this.projInfo.projID);
	        this.BEAbs.sendBEUpdate(jSon, "add-capture-set");
	}
	
	public onInjectCapturesSetCallback(setts: CaptureInjectionSettings[], cap:CaptureInjectInfo[], isSeq: boolean,setIdx:number)
	{
        var jSon = this.captureInjectSerializer.serializeCaptureInject(null, this.projInfo.projCapSets[setIdx].capSetID, setts, cap, isSeq);
        //this.BEAbs.playCaptures(jSon, this);
        this.BEAbs.sendBEUpdate(jSon, "play-capture");
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jSon;
	}
	
	// similar but with different functionality
	public onSetDefaultCaptureSettingsCallback(setts: CaptureInjectionSettings[], cap:CaptureInjectInfo[], isSeq: boolean,setIdx:number)
	{
		// CMS to do send to backend
		
		// CMS pointers used, no need to update values
		// this.projInfo.projCapSets[setIdx].setNewDefaultSettings(sett);
		var jSon = this.serializer.serializeCaptureSettingsChange(this.projInfo,setts,cap,
		this.projInfo.projCapSets[setIdx].capSetName,
            this.projInfo.projCapSets[setIdx].capSetID);
        this.BEAbs.sendBEUpdate(jSon, "capture-set-cap-settings-update");
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jSon;
		
	}
	
	// single capture callbacks
	public onSingleInjectCapCb(sett: CaptureInjectionSettings[], cap:CaptureInjectInfo[],setIdx:number, capIdx:number)
	{
		
    	var jSon = this.captureInjectSerializer.serializeCaptureInject(cap[0].captureID, null, sett, cap,false);
        this.BEAbs.sendBEUpdate(jSon, "play-capture");
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jSon;
	}
	public onSingleInjectSettingCb(sett: CaptureInjectionSettings, cap:CaptureInjectInfo, setIdx:number, capIdx:number)
	{
		// CMS since everything here is pointer, no need to update anything
		// this.projInfo.projCapSets[setIdx].updateInjectionSettings(sett,capIdx);
		// CMS send to backend 
		
		var setArr: CaptureInjectionSettings[];
		setArr = [];
		setArr.push(sett);
		
		var capArr: CaptureInjectInfo[];
		capArr=[];
		capArr.push(cap);
		
		var jSon = this.serializer.serializeCaptureSettingsChange(this.projInfo,setArr,capArr,"","");
        this.BEAbs.sendBEUpdate(jSon, "capture-set-cap-settings-update");
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jSon;		
	}
	
	// button hooks
	public onAddCaptureClick(setN: number): void {
	
		// CMS Debug
		
		var dialogRef = this.dialogue.open(SelectCaptureDialogue, 
		{width:'600px',
		height:'300px',
		 data: {callback: this.onAddCaptureCallback.bind(this), capSet: setN}
		}
		);
	
	}
	public onRemoveCaptureClick(setN: number, capN: number): void {
		
        if (setN > -1 && setN < this.projInfo.projCapSets.length) {
            this.BEAbs.GetBackendAPI().removeCaptureInSet(this.projInfo.projCapSets[setN].capSetID, this.projInfo.projCapSets[setN].capSetCaptures[capN].captureID, this.BEAbs);
            this.projInfo.projCapSets[setN].removeCapture(capN);
        }
			
				
	}
	public onAddSetClick(): void {
		
		
			
		var dialogRef = this.dialogue.open(AddCapturesSetDialogue, 
		{width:'600px',
            height: '500px',
            data: { callback: this.onAddCaptureSetCallback.bind(this), pdt: this.BEAbs.api.presetTypes }
		}
		);
		
	
		
	}
	public onRemoveSetClick(setN: number): void {

        this.BEAbs.GetBackendAPI().removeSetFromProject(this.projInfo.projID,this.projInfo.projCapSets[setN].capSetID, this.BEAbs);
        this.projInfo.removeCaptureSet(setN);

	}
    public onRemoveMemberClick(memN: number): void {
        this.BEAbs.GetBackendAPI().removeMemberFromProject(this.projInfo.projID, this.projInfo.projMembers[memN], this.BEAbs);
		this.projInfo.removeProjectMember(memN);
	}
	
	
	public onAddMemberClick(): void {

		var dialogRef = this.dialogue.open(SelectUserDialogue, 
		{width:'400px',
		height:'300px',
		 data: {callback: this.onAddMemberCBack.bind(this)}
		}
		);		
		
	}
	public onSetOwnerClick(): void {
		
		var dialogRef = this.dialogue.open(SelectUserDialogue, 
		{width:'400px',
		height:'300px',
		 data: {callback: this.onChangeOwnerCback.bind(this)}
		}
		);		
		
	}
	
	public onCaptureInfoClick(capN: number, setN:number): void {
	}
	
	/*public onCaptureSettingsClick(capN:number, setN:number): void {
		
		var dialogRef = this.dialogue.open(InjectCapturesDialogue, 
		{width:'900px',
		height:'800px',
		 data: {callback: this.onSetDefaultCaptureSettingsCallback.bind(this), cap:this.projInfo.projCapSets[setN].getCaptures(),set:this.projInfo.projCapSets[setN].getCaptureInjectionSettings(),justSetting:true,
		 setIdx:setN}
		}
		);	
	}*/
	
	public onInjectionSettingsClick(setN:number): void {

		var dialogRef = this.dialogue.open(InjectCapturesDialogue, 
		{width:'1200px',
		height:'800px',
		 data: {callback: this.onSetDefaultCaptureSettingsCallback.bind(this), cap:this.projInfo.projCapSets[setN].getCaptures(),set:this.projInfo.projCapSets[setN].getCaptureInjectionSettings(),justSetting:true,
             setIdx: setN, X2TransVals: this.BEAbs.api.presetTypes.capTransportTypes, X3TransVals: this.BEAbs.api.presetTypes.capTransportTypes}
		}
		);	
	}
	
	public onPlayAllClick(setN: number): void {

		var dialogRef = this.dialogue.open(InjectCapturesDialogue, 
		{width:'1200px',
		height:'800px',
		 data: {callback: this.onInjectCapturesSetCallback.bind(this), cap:this.projInfo.projCapSets[setN].getCaptures(),set:this.projInfo.projCapSets[setN].getCaptureInjectionSettings(),justSetting:false, setIdx:setN,
             X2TransVals: this.BEAbs.api.presetTypes.capTransportTypes, X3TransVals: this.BEAbs.api.presetTypes.capTransportTypes}
		}
		);
	}
	
	public onSingleCaptureSettingsClick(setN: number, capN:number): void {
		var dialogRef = this.dialogue.open(SingleInjectCaptureDialogue, 
		{width:'1500px',
		height:'800px',
            data: {
                callback: this.onSingleInjectSettingCb.bind(this), cap: this.projInfo.projCapSets[setN].getCaptures()[capN], set: this.projInfo.projCapSets[setN].getCaptureInjectionSettings()[capN], justSetting: true, setIdx: setN, capN: capN,
                X2TransVals: this.BEAbs.api.presetTypes.capTransportTypes, X3TransVals: this.BEAbs.api.presetTypes.capTransportTypes
            }		 
		 }		
		);
	}
	
	public onSinglePlayClick(setN: number, capN:number): void {

		var cis = [];
		cis.push(this.projInfo.projCapSets[setN].getCaptureInjectionSettings()[capN]);

		var cii = [];
		cii.push(this.projInfo.projCapSets[setN].getCaptures()[capN]);
		var dialogRef = this.dialogue.open(SingleInjectCaptureDialogue, 
		{width:'1000px',
		height:'800px',
		 data: {callback: this.onSingleInjectCapCb.bind(this), cap:cii,set:cis,justSetting:false, setIdx:setN, capN: capN,
             X2TransVals: this.BEAbs.api.presetTypes.capTransportTypes, X3TransVals: this.BEAbs.api.presetTypes.capTransportTypes}
		}
		);
	}
	
	public onExpandCollapseSetClick(setN: number): void {
		
	}
	
	public onSubmitChangesClick(): void {
		
		
		this.projNotes = (<HTMLInputElement> document.querySelector(".usrNotes"));
		this.projInfo.projDetails= this.projNotes.value;
		var jSon = this.serializer.serializeFullProjectUpdate(this.projInfo);
		this.projNotes.value = jSon;
		
		if (this.BEAbs !=null )
		{
            this.BEAbs.sendBEUpdate(jSon, "full-project-update");
		}
	}
	
	// debug buttons
	public onSimulateBEUpdateClick(): void {
	}
	
	// info getters / setters
	
	
	// project details 
	public getProjectName(): string {
		return this.projInfo.projName;
	}
	
	public getProjectCreationDate(): string {
		return this.projInfo.projCreationDate;
	}

	public getProjectLastEdited(): string {
		return this.projInfo.projLastEdit;
	}

	public getProjectOwnerName(): string{
		return this.projInfo.projOwner;
	}

	public getProjDetails(): string{
		return this.projInfo.projDetails;
	}
	// Members 
	public getProjMembers(): string[] {
		return this.projInfo.projMembers;
	}
	
	// capture sets 
	public getProjCaptureSetsNumber(): number {
		return this.projInfo.projCapSets.length;
	}
	
	public getProjCaptureSets(): CaptureSet[] {
		return this.projInfo.projCapSets;
    }

    public getX2ProtocolName(id: number): string {
        return this.BEAbs.api.presetTypes.genericGetNameForID(this.BEAbs.api.presetTypes.capX2Protos, id);
    }
    public getX3ProtocolName(id: number): string {
        return this.BEAbs.api.presetTypes.genericGetNameForID(this.BEAbs.api.presetTypes.capX3Protos, id);
    }
	
	public onBEEventReceived(evtType: string, evtJson: string): void {
		
		var jObj = JSON.parse(evtJson);
        if (evtType == "fetch-project-page") {
            console.log("fetch - project - page received response");
            this.projInfo = this.serializer.deserializeProject(jObj);
            this.pageInited = true;
        }
        else if (evtType == "add-capture-set")
        {
            var capSet = this.serializer.deserializeCaptureSet(jObj);
            this.projInfo.addCaptureSet(capSet);
        }
        else {
            console.log("Unprocessed response: " + evtType + " json: " + evtJson);
        }
	}
	
}
