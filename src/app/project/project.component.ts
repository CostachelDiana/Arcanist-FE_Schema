import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// import { CaptureDetails, CaptureSets } from './ICapture';
// import { Member, ProjectDetails, Protocol } from './IProject';

import {InjectionSettings, ProjPageCaptureInfo, CaptureSet,ProjMember,ProjPageInfo} from './projectPageComponents'
import {IProject, IBEAbstraction} from './IProject'
import {SelectUserDialogue} from '../dialogues/SelectUserDialogue.component'
import {SelectCaptureDialogue} from '../dialogues/SelectCaptureDialogue'
import {InjectCapturesDialogue} from '../dialogues/InjectCapturesDialogue'
import {AddCapturesSetDialogue} from '../dialogues/AddCapturesSetDialogue'


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements IProject {
	
	projInfo: ProjPageInfo ;
	BEAbs: IBEAbstraction;	
	
	
	// initing methods
	constructor(public dialogue: MatDialog) {
		this.projInfo=null;
		this.BEAbs=null;
		
		this.testInit();
	}
	
	public testInit(): void {
		this.projInfo = new ProjPageInfo("Test Proj RX","DK3bA5");
		this.projInfo.setProjectInfo("01-02-2021","03-02-2021");
		
		this.projInfo.projOwner=new ProjMember("Marius");
		this.projInfo.projOwner.surname="Aldea";
		
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
		
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE simple call","ADGr123");
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
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE location change","ADGr123");
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
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE conference","ADGr123");
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
		
		var aCapture = new ProjPageCaptureInfo("Leo MPD Browsing","ADGr123");
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
		
		var aCapture = new ProjPageCaptureInfo("Leo MPD on/off","ADGr123");
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
		this.BEAbs = be;		
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
	}
	
	public onAddCaptureCallback(aCap: ProjPageCaptureInfo, setN: number)
	{
		if (setN > -1 && setN < this.projInfo.projCapSets.length)
		 this.projInfo.projCapSets[setN].addCapture(aCap);
	}
	
	public onAddCaptureSetCallback(aSet:CaptureSet)
	{
		this.projInfo.addCaptureSet(aSet);
	}
	
	public onInjectCapturesSetCallback(setts: InjectionSettings[], cap:ProjPageCaptureInfo[], isSeq: boolean)
	{
		// CMS to do send to backend 
		// this.projInfo.projName = "Injecting captures" + setts.length;
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
		
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE simple call","ADGr123");
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
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE location change","ADGr123");
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
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE conference","ADGr123");
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
	public onCaptureInjectClick(capN:number, setN:number): void {
	}
	public onCaptureSettingsClick(capN:number, setN:number): void {
	}
	
	public onPlayAllClick(setN: number): void {
		
		var dialogRef = this.dialogue.open(InjectCapturesDialogue, 
		{width:'900px',
		height:'800px',
		 data: {callback: this.onInjectCapturesSetCallback.bind(this), cap:this.projInfo.projCapSets[setN].getCaptures(),set:this.projInfo.projCapSets[setN].getCaptureInjectionSettings(),justSetting:false}
		}
		);
	}
	
	public onExpandCollapseSetClick(setN: number): void {
		
	}
	
	public onSubmitChangesClick(): void {
		if (this.BEAbs !=null )
		{
			this.BEAbs.sendBEUpdate(this.projInfo);
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
	
}
