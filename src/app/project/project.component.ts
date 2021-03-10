import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// import { CaptureDetails, CaptureSets } from './ICapture';
// import { Member, ProjectDetails, Protocol } from './IProject';

import { CaptureSet, ProjMember, ProjPageInfo } from './projectPageComponents'
import { CaptureInjectionSettings, CaptureInjectInfo } from '../utils/captureInfoComponents'
import { CaptureInjectSerializer } from '../utils/captureInjectSerializer'
import {IProject, IBEAbstraction} from './IProject'
import {SelectUserDialogue} from '../dialogues/SelectUserDialogue.component'
import {SelectCaptureDialogue} from '../dialogues/SelectCaptureDialogue'
import {InjectCapturesDialogue} from '../dialogues/InjectCapturesDialogue'
import {AddCapturesSetDialogue} from '../dialogues/AddCapturesSetDialogue'
import {SingleInjectCaptureDialogue} from '../dialogues/SingleInjectCaptureDialogue'
import {ProjectPageEventSerializer} from './projectPageEventSerializer'
import {ProjectBEAbstraction} from './projectBEAbstraction'
import {PredefinedTypeStruct} from '../captureedit/CaptureStructures'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements IProject {
	
	projInfo: ProjPageInfo ;
	public projNamesList: string[];
	 
	BEAbs: ProjectBEAbstraction;
	serializer: ProjectPageEventSerializer;
	captureInjectSerializer: CaptureInjectSerializer;
	
	capTransportTypes: PredefinedTypeStruct[];
	
	// CMS debug purposes
	projNotes: HTMLInputElement;
	
	pageInited: boolean;
	
	// initing methods
	constructor(public dialogue: MatDialog,
		 private router:Router, private activatedRoute:ActivatedRoute) {
		 console.log("getCurrentNavigation: "+this.router.getCurrentNavigation().extras.state);
			console.log("url is: "+window.location.href);

			let projName: string;
			let projDetails: string;
		rez: this.activatedRoute.queryParams.subscribe(params => {
			projName = params['projName'] || "";
			projDetails = params['projDetails'] || "";
		  });

		  console.log("filename is: "+ projName);
		  console.log("projDetails is: "+ projDetails);
		
		  if (projName!="") {
		  	console.log("filename is not null");

			  //check on BE is proj already exist
			//   if (projExist) {
			// 	//error and redirect to projpage
			//   }
			//   else { //create proj
				this.onGeneratePageClick();
				this.projInfo.projName = projName;
				this.projInfo.projDetails = projDetails;
			//  }
		  }
		  else {
			this.projInfo=null;
			
			this.pageInited=false;
			this.serializer = new ProjectPageEventSerializer();
			this.BEAbs= new ProjectBEAbstraction();
			this.BEAbs.setProject(this);
			this.BEAbs.connect("121.69.69.666","4040");
			
			//get from BE the list of existing proj
			this.projNamesList = [];
			this.projNamesList.push("ProjName1_predef");
			this.projNamesList.push("ProjName2_predef");

			this.capTransportTypes=[];
			this.initBEData();
				this.captureInjectSerializer = new CaptureInjectSerializer();
		  }
	}
	
	initBEData(): void {
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="TCP";
		aPresetType.id=1;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="UDP";
		aPresetType.id=2;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="FTP";
		aPresetType.id=3;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="MSMQ";
		aPresetType.id=4;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="SMTP";
		aPresetType.id=5;
		this.capTransportTypes.push(aPresetType);
	}
	
	public onFetchProjectClick(): void {
		var aJson = this.serializer.serializeProjectPageRequest("projIDPlaceholder");
		this.BEAbs.request(aJson);
	}
	
	public onGeneratePageClick(): void {
		this.testInit();
		this.pageInited=true;
	}
	
	public isPageReady(): boolean {
		return this.pageInited;
	}
	
	
	public testInit(): void {
		console.log("initing proj data");
		
		this.projInfo = new ProjPageInfo("projIDPlaceholder");
		
		this.projInfo.setProjectInfo("01-02-2021","03-02-2021");
		this.projInfo.projName="Generated proj";
		
		this.projInfo.projOwner=new ProjMember("Marius");
		this.projInfo.projOwner.surname="Aldea";
		this.projInfo.projDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
		
		// add project members
		var aMember = new ProjMember("Daniel");
		aMember.surname="Ciotoracu";
		
		this.projInfo.projMembers.push(aMember);
		
		aMember = new ProjMember("Mihai");
		aMember.surname="Cuatu";
		this.projInfo.projMembers.push(aMember);
		
		
		var aCapSet = new CaptureSet("CS VoLTE UMD 1");
		aCapSet.capSetX2Protocol="ETSI 102 232-5 v331";
		aCapSet.capSetX3Protocol="ULIC RTP";
		
		
		var aCapture = new CaptureInjectInfo("Leo CS VoLTE simple call","ADGr123");
		aCapture.captureX2Port="5001";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="6001";
		aCapture.captureX3Transport="TCP";
		aCapture.captureX3Protocol="ULIC RTP";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD&CC";
		aCapture.captureIC="LIID";
		aCapture.captureICVal="442312";
		
		
		aCapSet.addCapture(aCapture);
		
		var aCapture = new CaptureInjectInfo("Leo CS VoLTE location change","ADGr123");
		aCapture.captureX2Port="5005";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="0000";
		aCapture.captureX3Transport="unknown";
		aCapture.captureX3Protocol="unknown";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD";
		aCapture.captureIC="Phone";
		aCapture.captureICVal="+31332442312";
		
		aCapSet.addCapture(aCapture);
		
		var aCapture = new CaptureInjectInfo("Leo CS VoLTE conference","ADGr123");
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
		
		aCapSet.addCapture(aCapture);
		
		this.projInfo.projCapSets.push(aCapSet);
		
		aCapSet = new CaptureSet("MPD Orage UMD");
		aCapSet.capSetX2Protocol="ETSI 33 108 v271";
		aCapSet.capSetX3Protocol="ULIC EPS";
		
		var aCapture = new CaptureInjectInfo("Leo MPD Browsing","ADGr123");
		aCapture.captureX2Port="22";
		aCapture.captureX2Transport="FTP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="6001";
		aCapture.captureX3Transport="TCP";
		aCapture.captureX3Protocol="ULIC EPS";
		aCapture.switchDate="18-01-2011";
		aCapture.captureType="CD&CC";
		aCapture.captureIC="IMSI";
		aCapture.captureICVal="34312561";
		
		aCapSet.addCapture(aCapture);
		
		var aCapture = new CaptureInjectInfo("Leo MPD on/off","ADGr123");
		aCapture.captureX2Port="22";
		aCapture.captureX2Transport="FTP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="0000";
		aCapture.captureX3Transport="unkonwn";
		aCapture.captureX3Protocol="unknown";
		aCapture.switchDate="18-01-2011";
		aCapture.captureType="CD";
		aCapture.captureIC="IMSI";
		aCapture.captureICVal="34312561";
		
		aCapSet.addCapture(aCapture);
		
		this.projInfo.projCapSets.push(aCapSet);
	}
	
	public initProjectPage(info: ProjPageInfo): void {
		this.projInfo = info;
	}
	
	public refresh():void {
		// nothing to do right now
	}
	public setBEAbstraction(be: IBEAbstraction): void {
		
	}
	
	// callbacks 
	public onChangeOwnerCback(aMember: ProjMember)
	{
		
		this.projInfo.projOwner.name=aMember.name;
		this.projInfo.projOwner.surname=aMember.surname;
		this.projInfo.projOwner.id=aMember.id;
		this.projInfo.projOwner.email=aMember.email;		
	}
	
	public onAddMemberCBack(aMember: ProjMember)
	{
		this.projInfo.addProjectMember(aMember);
		
		
		// console.log(" prj notes "+this.projNotes.value);
		// this.projNotes.value="sadassd";
	}
	
	public onAddCaptureCallback(aCap: CaptureInjectInfo, setN: number)
	{
		if (setN > -1 && setN < this.projInfo.projCapSets.length)
		 this.projInfo.projCapSets[setN].addCapture(aCap);
	}
	
	public onAddCaptureSetCallback(aSet:CaptureSet)
	{
		this.projInfo.addCaptureSet(aSet);
	}
	
	public onInjectCapturesSetCallback(setts: CaptureInjectionSettings[], cap:CaptureInjectInfo[], isSeq: boolean,setIdx:number)
	{
        var jSon = this.captureInjectSerializer.serializeCaptureInject(null, this.projInfo.projCapSets[setIdx].capSetID, setts, cap, isSeq);
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
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jSon;
		
	}
	
	// single capture callbacks
	public onSingleInjectCapCb(sett: CaptureInjectionSettings[], cap:CaptureInjectInfo[],setIdx:number, capIdx:number)
	{
		
    	var jSon = this.captureInjectSerializer.serializeCaptureInject(cap[0].captureID, null, sett, cap,false);
		
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
		
		if (setN > -1 && setN < this.projInfo.projCapSets.length)
			this.projInfo.projCapSets[setN].removeCapture(capN);
				
	}
	public onAddSetClick(): void {
		
		
			
		var dialogRef = this.dialogue.open(AddCapturesSetDialogue, 
		{width:'600px',
		height:'500px',
		 data: {callback: this.onAddCaptureSetCallback.bind(this)}
		}
		);
		
		
		// CMS Debug
		
		/*
		var aCapSet = new CaptureSet("CS VoLTE UMD 1");
		aCapSet.capSetX2Protocol="ETSI 102 232-5 v331";
		aCapSet.capSetX3Protocol="ULIC RTP";
		
		
		var aCapture = new CaptureInjectInfo("Leo CS VoLTE simple call","ADGr123");
		aCapture.captureX2Port="5001";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="6001";
		aCapture.captureX3Transport="TCP";
		aCapture.captureX3Protocol="ULIC RTP";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD&CC";
		aCapture.captureIC="LIID";
		aCapture.captureICVal="442312";
		
		aCapSet.addCapture(aCapture);
		
		var aCapture = new CaptureInjectInfo("Leo CS VoLTE location change","ADGr123");
		aCapture.captureX2Port="5005";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="0000";
		aCapture.captureX3Transport="unknown";
		aCapture.captureX3Protocol="unknown";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD";
		aCapture.captureIC="Phone";
		aCapture.captureICVal="+31332442312";
		
		aCapSet.addCapture(aCapture);
		
		var aCapture = new CaptureInjectInfo("Leo CS VoLTE conference","ADGr123");
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
		
		aCapSet.addCapture(aCapture);
		
		this.projInfo.projCapSets.push(aCapSet);*/
	
		
	}
	public onRemoveSetClick(setN: number): void {
		
		this.projInfo.removeCaptureSet(setN);
	}
	public onRemoveMemberClick(memN: number): void {
		
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
		 setIdx:setN,X2TransVals:this.capTransportTypes , X3TransVals: this.capTransportTypes}
		}
		);	
	}
	
	public onPlayAllClick(setN: number): void {
		
		var dialogRef = this.dialogue.open(InjectCapturesDialogue, 
		{width:'1200px',
		height:'800px',
		 data: {callback: this.onInjectCapturesSetCallback.bind(this), cap:this.projInfo.projCapSets[setN].getCaptures(),set:this.projInfo.projCapSets[setN].getCaptureInjectionSettings(),justSetting:false, setIdx:setN,
		 X2TransVals:this.capTransportTypes , X3TransVals: this.capTransportTypes}
		}
		);
	}
	
	public onSingleCaptureSettingsClick(setN: number, capN:number): void {
		
		
		var dialogRef = this.dialogue.open(SingleInjectCaptureDialogue, 
		{width:'1000px',
		height:'800px',
		 data: {callback: this.onSingleInjectSettingCb.bind(this), cap:this.projInfo.projCapSets[setN].getCaptures()[capN],set:this.projInfo.projCapSets[setN].getCaptureInjectionSettings()[capN],justSetting:true, setIdx:setN, capN: capN,
		 X2TransVals:this.capTransportTypes , X3TransVals: this.capTransportTypes}		 
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
		 X2TransVals:this.capTransportTypes , X3TransVals: this.capTransportTypes}
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
			this.BEAbs.sendBEUpdate(jSon);
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
		return this.projInfo.projOwner.surname + ", " +
		this.projInfo.projOwner.name;
	}

	public getProjDetails(): string{
		return this.projInfo.projDetails;
	}
	// Members 
	public getProjMembers(): ProjMember[] {
		return this.projInfo.projMembers;
	}
	
	// capture sets 
	public getProjCaptureSetsNumber(): number {
		return this.projInfo.projCapSets.length;
	}
	
	public getProjCaptureSets(): CaptureSet[] {
		return this.projInfo.projCapSets;
	}
	
	public onBEEventReceived(evtJson: string): void {
		
		var jObj = JSON.parse(evtJson);
		var evtType = jObj["event-type"];
		console.log("received BE Update! evt ["+evtType+"]");
		if (evtType == "connection-success") {
			console.log("connection established! server says"+jObj["message"]);
		} else if (evtType == "project-fetched") {
			console.log("project page received!");
			this.projInfo = new ProjPageInfo("projIDPlaceholder");
			this.serializer.deserializeProjectPageUpdate(this.projInfo,jObj);
			this.pageInited=true;
		}
	}
	
}
