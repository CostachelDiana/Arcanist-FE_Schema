import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

import { HttpClient } from '@angular/common/http';
import {FullCaptureInfo,CapProjLink,StreamInfo,CaptureInfo,PredefinedTypeStruct,PresetTypesInfo} from './CaptureStructures';
import {ProjMember} from '../project/projectPageComponents'
import {SingleInjectCaptureDialogue} from '../dialogues/SingleInjectCaptureDialogue'
import {AddCaptureTagDialogue} from '../dialogues/AddCaptureTagDialogue'
import {AddCaptureInfoDialogue} from '../dialogues/AddCaptureInfoDialogue'
import { CaptureInjectSerializer } from '../utils/captureInjectSerializer';
import { CaptureInjectionSettings } from '../utils/captureInfoComponents';
import { CaptureInjectInfo } from '../utils/captureInfoComponents';
import {IPage, IBEAbstractionGeneric} from '../project/IProject'
import {CaptureEditPageSerializer} from './CaptureEditPageSerializer'
import {CaptureEditBEAbstraction} from './captureEditBEAbstraction'

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


// cms debug 

import {SelectCaptureDialogue} from '../dialogues/SelectCaptureDialogue' 




@Component({
  selector: 'app-project',
  templateUrl: './captureedit.component.html',
  styleUrls: ['./captureedit.component.css']
})
export class CaptureEditPage implements IPage{

	
	pageInfo: FullCaptureInfo;
	captureInjectSerializer: CaptureInjectSerializer;

	presetInfo: PresetTypesInfo;
	capStreams: StreamInfo[];
	
	serializer: CaptureEditPageSerializer;
	//backend: CaptureEditBEAbstraction;
	pageReady: boolean;
	basicInfoVisible: boolean;
	advancedInfoVisible: boolean;
	captureReferenceVisible: boolean;
	streamInfoVisible: boolean;
	captureInfoVisible: boolean;
	captureTagVisible: boolean;
	streamsReady: boolean;
	

	constructor(public dialogue: MatDialog, private http: HttpClient,
		private activatedRoute:ActivatedRoute, private backend : CaptureEditBEAbstraction) { 
		
		this.basicInfoVisible = true;
		this.advancedInfoVisible = true;
		this.streamInfoVisible = true;
		this.captureInfoVisible = true;
		this.captureTagVisible = true;
		this.captureReferenceVisible = false;
		
		this.pageReady = false;
		this.streamsReady =false;
		console.log("url is: "+window.location.href);

		
		this.presetInfo = new PresetTypesInfo();
		this.capStreams=[];
		
		this.serializer = new CaptureEditPageSerializer();
		this.captureInjectSerializer = new CaptureInjectSerializer();
		
		this.backend.setPage(this);
		this.presetInfo = backend.getPresets();
		
		this.requestPage();
		//this.requestBEPresets();
		//this.requestBEPresets();
		
	//	this.requestBEStreams();
	
	}
	// BE init methods 
	/*public requestBEPresets() {		
		var beStr = this.serializer.serializeRequestPresets();
		this.backend.sendBEUpdate(beStr);
	}
	public requestBEInfoPresets(){
		var beStr = this.serializer.serializeRequestInfoPresets();
		this.backend.sendBEUpdate(beStr);
	}*/
	public requestBEStreams() {
		var urlParams = new URLSearchParams(window.location.search);
		var capID=urlParams.get('capid');
		var beStr = this.serializer.serializeStreamRequest(capID);
        this.backend.sendBEUpdate(beStr, "request-stream-info");
	}
	public debugRequest() {		
		var theJson ='{"uuid":"3a51c229-cb22-4fc2-9292-73d509029632","name":"Untitled Capture, 2021/03/10 10:43:05.777","status":1,"size":817772,"length":10,"notes":"capture notes","switchTime":"2021-03-10T12:35:01.968+00:00","icIdentifier":"12345678","interceptionCriteriaId":2,"technologyId":2,"ccProtocolId":2,"cdProtocolId":2,"ccTransportId":2,"cdTransportId":2,"ccPort":"5010","cdPort":"5000","lastUpdatedBy":"updator user","lastUpdatedAt":"2021-03-10T12:35:01.968+00:00","events":[{"eventId":2,"captureId":1},{"eventId":4,"captureId":1},{"eventId":6,"captureId":1},{"eventId":8,"captureId":1},{"eventId":10,"captureId":1}],"tags":[],"products":[],"scenarios":[],"codecs":[],"verifiedBy":"validator user","verifiedAt":"2021-03-10T12:35:01.968+00:00","uploadedBy":"Anonymous","uploadedAt":"2021-03-10T10:43:05.825+00:00"}';
		
		this.onBEEventReceived("capture-page-received",theJson);		
		
	}
	
	public requestPage()
	{
		var debug=false;
		
		if (debug)
		{
			this.debugRequest();
		} else {
		// CMS debug
			var urlParams = new URLSearchParams(window.location.search);
			var capID=urlParams.get('capid');
			if (capID==null)
			{
				console.log("no capid provided");
				capID = "3a51c229-cb22-4fc2-9292-73d509029632";
			}
			console.log("requesting page for id "+ capID);
			
			var req = this.serializer.serializeRequestCapturePage(capID);
			this.backend.sendBEUpdate(req, "request-capturePage");
			console.log("req done");
		}
	}
	
	public onBEEventReceived(evtType: string, evtJson: string): void {
		
		console.log("received json " +evtJson);
		var jObj = JSON.parse(evtJson);
		var evt = evtType;
		
		console.log(" received be event" + evt+ " str is " +evtJson);
		if (evt=="info-presets-received")
		{
			console.log(" info presets for jObj "+ jObj);
			this.serializer.deserializeInfoPresetValues(jObj, this.presetInfo);
		} else if (evt=="presets-received")
		{
			this.serializer.deserializePresetValues(jObj, this.presetInfo);
		}
        else if (evt =="capture-streams-received")
		{
			this.capStreams = this.serializer.deserializeStreamInfo(jObj);
			this.streamsReady=true;
		} else if (evt=="capture-page-received")
		{
			
			var elRezo = this.serializer.deserializePageInfo(jObj,this.presetInfo);			
			this.pageInfo = elRezo;
			this.pageReady=true;
			
		}		
	} 
	// methods from IPage(probably not relevant antmore)
	public initPage(pgJson:string) : void {
	}
	public setBEAbstraction(be: IBEAbstractionGeneric ): void {
		
	}
	
	public getPageInfo(): FullCaptureInfo {
		return this.pageInfo;
	}
	public getICTypes(): PredefinedTypeStruct[] {
		return this.presetInfo.capICTypes;
	}
	public getCapTechnologyTypes(): PredefinedTypeStruct[] {
		return this.presetInfo.capTechnologyTypes;
	}
	
	public getCapX3Protos(): PredefinedTypeStruct[] {
		return this.presetInfo.capX3Protos;
	}
	public getCapX2Protos(): PredefinedTypeStruct[] {
		return this.presetInfo.capX2Protos;
	}
	public getStreamInfos(): StreamInfo[] {
		return this.capStreams;
	}
	public getCapTransportTypes(): PredefinedTypeStruct[] {
		return this.presetInfo.capTransportTypes;
	}
	
	public isStreamReady(): boolean {
		return this.streamsReady;
	}
	public isPageReady(): boolean {
		return this.pageReady;
	}
	
	public isBasicInfoVisible(): boolean {
		return this.basicInfoVisible;
	}

	public isAdvancedInfoVisible(): boolean {
		return this.advancedInfoVisible;
	}

	public isStreamInfoVisible(): boolean {
		return this.streamInfoVisible;
	}

	public isCaptureInfoVisible(): boolean {
		return this.captureInfoVisible;
	}

	public isCaptureTagVisible(): boolean {
		return this.captureTagVisible;
	}

	public isCaptureReferenceVisible(): boolean {
		return this.captureReferenceVisible;
	}

	
	
	
	
	// to be called from html 
	public testCback (capInfo: CaptureInjectInfo, capSet: number) {
		
		console.log(" Received cap info "+JSON.stringify(capInfo));
	}
	public onRequestBEUpdateClick(capID: string) {
		
			var dialogRef = this.dialogue.open(SelectCaptureDialogue, 
			{width:'1100px',
			height:'800px',
	      data: { callback: this.testCback.bind(this), capSet:5}
			}
			);
	}

  // button hooks
	public onInjectCaptureClick(): void
	{
	    var injInfoArr = [];

	    var captureInjectionInfo = new CaptureInjectInfo(this.pageInfo.capName, this.pageInfo.capID);
	    captureInjectionInfo.captureLength = this.pageInfo.capLength;
	    captureInjectionInfo.captureX2IP = this.pageInfo.capX2IP;
	    captureInjectionInfo.captureX2Port = this.pageInfo.capX2Port;
	    captureInjectionInfo.captureX2Protocol = this.pageInfo.capX2Protocol;

	    captureInjectionInfo.captureX3IP = this.pageInfo.capX3IP;
	    captureInjectionInfo.captureX3Port = this.pageInfo.capX3Port;
	    captureInjectionInfo.captureX3Protocol = this.pageInfo.capX3Protocol;

	    injInfoArr.push(captureInjectionInfo);

	    var injSett = new CaptureInjectionSettings();
	    var cisArr = [];
	    cisArr.push(injSett);
		
			var dialogRef = this.dialogue.open(SingleInjectCaptureDialogue, 
			{width:'1500px',
			height:'800px',
	      data: { callback: this.onInjectCapturesSetCallback.bind(this), cap: injInfoArr, set: cisArr,justSetting:false, setIdx:-1, capN: -1,fromProjScreen:false, X2TransVals: this.presetInfo.capTransportTypes, X3TransVals: this.presetInfo.capTransportTypes}
			}
			);
	  }

	  public onInjectCapturesSetCallback(setts: CaptureInjectionSettings[], cap: CaptureInjectInfo[]) {
		// CMS to do send to backend
		var jSon = this.captureInjectSerializer.serializeCaptureInject(this.pageInfo.capID, null, setts, cap,false);

          this.backend.sendBEUpdate(jSon, "play-capture");
		(<HTMLInputElement>document.querySelector(".usrNotes")).value = jSon;
	  }

	public onAddToFavoritesClick(): void {
		
	}
	public onValidateCaptureClick(): void {
	}
	public onAddCaptureInfoCallback(typeID: number, valueID: number ): void {
		//	capInfoValsList: PredefinedTypeStruct[][];
		// 		capInfoTypesList: PredefinedTypeStruct[];
		//
		var aInfo = new CaptureInfo();
		for (var i=0;i<this.presetInfo.capInfoTypesList.length;i++)
		{
			if (this.presetInfo.capInfoTypesList[i].id == typeID)
			{
				aInfo.infoTypeID=typeID;
				aInfo.infoTypeName=this.presetInfo.capInfoTypesList[i].displayName;
				
				for (var j=0;j<this.presetInfo.capInfoValsList[i].length;j++)
				{
					if (this.presetInfo.capInfoValsList[i][j].id == valueID)
					{
						aInfo.infoValID=valueID;
						aInfo.infoValName=this.presetInfo.capInfoValsList[i][j].displayName;
					}
				}
			}
		}
		this.pageInfo.addCaptureInfo(aInfo);
	}
	public onAddCaptureInfoClick(): void {
		var dialogRef = this.dialogue.open(AddCaptureInfoDialogue, 
		{width:'900px',
		height:'800px',
		 data: {callback: this.onAddCaptureInfoCallback.bind(this),eventTypes: this.presetInfo.capInfoTypesList, eventValues:this.presetInfo.capInfoValsList}
		}
		);
	}
	public onAddCaptureTagCallback(tagID: number): void {
		
		for (var i=0;i<this.presetInfo.capTagList.length;i++)
		{
			if (this.presetInfo.capTagList[i].id == tagID)
			{
				var capTag = new PredefinedTypeStruct();
				capTag =this.presetInfo.capTagList[i];
				
				this.pageInfo.addCaptureTag(capTag);
			}
		}
	}
	public onAddCaptureTagClick(): void{
		
		var dialogRef = this.dialogue.open(AddCaptureTagDialogue, 
		{width:'900px',
		height:'800px',
		 data: {callback: this.onAddCaptureTagCallback.bind(this),tagList: this.presetInfo.capTagList}
		}
		);
	}
	
	public onRemoveCaptureInfoClick(index: number): void{
		this.pageInfo.removeCaptureInfo(index);
	}
	public onRemoveCaptureTagClick(index: number):void {
		this.pageInfo.removeCaptureTag(index);
	}
	// CMS debug methods 
	
	public onGeneratePageClick() {
		this.testInit();
	}
	
	public onGetStreamsClick() {
        var urlParams = new URLSearchParams(window.location.search);
        var capID = urlParams.get('capid');
        if (capID == null) {
            console.log("no capid provided");
            capID = "3a51c229-cb22-4fc2-9292-73d509029632";
        }
        console.log("requesting page for id " + capID);

        var req = this.serializer.serializeRequestCapturePage(capID);
        this.backend.sendBEUpdate(req, "get-streams");
	}
	
	
	public onBEResponseReceived(){
		
		(<HTMLInputElement> document.querySelector(".usrNotes")).value="BE Response received";
	}	
	
	
	public onRequestBEPresetsClick() {		
		var beStr = this.serializer.serializeRequestPresets();
        this.backend.sendBEUpdate(beStr, "request-presets");		
	}
	public onRequestBEInfoPresetsClick(){
		var beStr = this.serializer.serializeRequestInfoPresets();
        this.backend.sendBEUpdate(beStr, "request-info-presets");
	}
	public onRequestBEStreamsClick() {
		var urlParams = new URLSearchParams(window.location.search);
		var capID=urlParams.get('capid');
		var beStr = this.serializer.serializeStreamRequest(capID);
        this.backend.sendBEUpdate(beStr, "request-stream-info");
	}
	public onRequestBEPageClick() {
		
    }

	onExpandBasicInfo(): void {
		var btnBasicInfo = document.getElementById("btnBasicInfo");

		if (this.basicInfoVisible == false) {
			this.basicInfoVisible = true;
			btnBasicInfo.textContent = "(-)";
		}
		else {
			this.basicInfoVisible = false;
			btnBasicInfo.textContent = "(+)";
		}
	}

	onExpandAdvancedInfo(): void {
		var btnAdvancedInfo = document.getElementById("btnAdvancedInfo");

		if (this.advancedInfoVisible == false) {
			this.advancedInfoVisible = true;
			btnAdvancedInfo.textContent = "(-)";
		}
		else {
			this.advancedInfoVisible = false;
			btnAdvancedInfo.textContent = "(+)";
		}
	}

	onExpandStreamInfo(): void {
		var btnStreamInfo = document.getElementById("btnStreamInfo");

		if (this.streamInfoVisible == false) {
			this.streamInfoVisible = true;
			btnStreamInfo.textContent = "(-)";
		}
		else {
			this.streamInfoVisible = false;
			btnStreamInfo.textContent = "(+)";
		}
	}

	onExpandCaptureInfo(): void {
		var btnCaptureInfo = document.getElementById("btnCaptureInfo");

		if (this.captureInfoVisible == false) {
			this.captureInfoVisible = true;
			btnCaptureInfo.textContent = "(-)";
		}
		else {
			this.captureInfoVisible = false;
			btnCaptureInfo.textContent = "(+)";
		}
	}

	onExpandCaptureTag(): void {
		var btnCaptureTag = document.getElementById("btnCaptureTag");

		if (this.captureTagVisible == false) {
			this.captureTagVisible = true;
			btnCaptureTag.textContent = "(-)";
		}
		else {
			this.captureTagVisible = false;
			btnCaptureTag.textContent = "(+)";
		}
	}

	onExpandCaptureReference(): void {
		var btnCaptureReference = document.getElementById("btnCaptureReference");

		if (this.captureReferenceVisible == false) {
			this.captureReferenceVisible = true;
			btnCaptureReference.textContent = "(-)";
		}
		else {
			this.captureReferenceVisible = false;
			btnCaptureReference.textContent = "(+)";
		}
	}

	onX2ProtocolSelectionChanged(event: any){
		this.pageInfo.capX2Protocol = event.target.value;
	}

	onX3ProtocolSelectionChanged(event: any){
		this.pageInfo.capX3Protocol = event.target.value;
	}	
	
	onTechnologySelectionChanged(event: any){
		this.pageInfo.capTechnology = event.target.value;
	}	

	onX2TransportSelectionChanged(event: any){
		this.pageInfo.capX2Trans = event.target.value;
	}	

	onX3TransportSelectionChanged(event: any){
		this.pageInfo.capX3Trans = event.target.value;
	}		
	
	onICTypeSelectionChanged(event: any){
		this.pageInfo.capIC.infoTypeName = event.target.value;
		this.pageInfo.capIC.infoTypeID = this.presetInfo.genericGetIDForName(this.presetInfo.capICTypes, this.pageInfo.capIC.infoTypeName )
	}		

	onSubmitChanges(){
		var jsonString = this.pageInfo.serializeForCaptureUpdate(this.presetInfo);
		
		console.log("submiting changes");
		this.backend.sendBEUpdate(jsonString,"update-capture");
	
	}
		
	testInit(): void {
		
		var pgInfo = new FullCaptureInfo();
		
		pgInfo.capID = "d443KAv";
		pgInfo.capName = "Leo RX VoLTE Simple Call 1";
		pgInfo.capSize= "32531";
		pgInfo.capLength = "312";
		pgInfo.capUserNotes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
		
		pgInfo.lastUpdateDate = "08.03.2021";		
		var aMember = new ProjMember("Haldan");
		aMember.name="Daniel";
		aMember.surname="Ciotoracu";
		aMember.email="daniel.ciotoracu@cognyte.com";
		aMember.id="DS341sa";		
		pgInfo.lastUpdater=aMember;
		
		pgInfo.uploadDate="02.03.2021";
		aMember = new ProjMember("Cuatu");
		aMember.name="Mihai";
		aMember.surname="Cuatu";
		aMember.email="mihai.cuatu@cognyte.com";
		aMember.id="CMS69";		
		pgInfo.uploader=aMember;
		
		aMember = new ProjMember("Arnaut");
		aMember.name="Stefan";
		aMember.surname="Arnaut";
		aMember.email="stefan.arnaut@cognyte.com";
		aMember.id="SDA332";
		pgInfo.verifier = aMember;
		pgInfo.verifyDate="02.05.2021";
		
		pgInfo.capX2Protocol="ETSI 102 232-5 v331";
		pgInfo.capX2Trans="FTP";
		pgInfo.capX2Port="22";
		
		pgInfo.capX3Protocol="ULIC EPS";
		pgInfo.capX3Trans="TCP";
		pgInfo.capX3Port="6001";
		
	/*	var aStruct = new PredefinedTypeStruct();
		aStruct.displayName="VoLTE";
		aStruct.id="vlt13";		
		pgInfo.capTechnology=aStruct;
		
		var aStruct = new PredefinedTypeStruct();
		aStruct.displayName="Verified";
		aStruct.id="vrf123";
		pgInfo.capStatus = aStruct;*/
			
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID=1;
		aCapInfo.infoTypeName="LIID";
		aCapInfo.infoValID=0;
		aCapInfo.infoValName="12334";
		pgInfo.capIC=aCapInfo;		
		
		pgInfo.capSwitchDate="15.01.2020";
		
		// TAGS
		/*var aCapTag=  new CaptureTag();
		aCapTag.tagID="tgzuku";
		aCapTag.tagName="Target to Target";
		
		pgInfo.addCaptureTag(aCapTag);
		
		aCapTag=  new CaptureTag();
		aCapTag.tagID="tgzuku2";
		aCapTag.tagName="X3 DTMF";
		
		pgInfo.addCaptureTag(aCapTag);
		
		aCapTag=  new CaptureTag();
		aCapTag.tagID="tgzuku2";
		aCapTag.tagName="Dynamic Codecs";
		
		pgInfo.addCaptureTag(aCapTag);*/
		
		// INFOS
		/* var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID="gaga";
		aCapInfo.infoTypeName="Event";
		aCapInfo.infoValID="evt3312";
		aCapInfo.infoValName="Bearer Activation";
		
		pgInfo.addCaptureInfo(aCapInfo);
		
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID="gaga";
		aCapInfo.infoTypeName="Event";
		aCapInfo.infoValID="evt3322";
		aCapInfo.infoValName="Incoming call";		
		pgInfo.addCaptureInfo(aCapInfo);
		
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID="gugu";
		aCapInfo.infoTypeName="Codec";
		aCapInfo.infoValID="cod12";
		aCapInfo.infoValName="EVS";
		
		pgInfo.addCaptureInfo(aCapInfo);
		
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID="gugu";
		aCapInfo.infoTypeName="Codec";
		aCapInfo.infoValID="cod13";
		aCapInfo.infoValName="AMR-WB";		
		pgInfo.addCaptureInfo(aCapInfo);*/
		
		var aCapProjLink = new CapProjLink();
		aCapProjLink.projName="Leo RX";
		aCapProjLink.projID="da3FVAd";
		aCapProjLink.capSetNames.push("VoLTE simple call Tests");
		aCapProjLink.capSetNames.push("VoLTE Full test");
		aCapProjLink.capSetIDs.push("adarv");
		aCapProjLink.capSetIDs.push("aggav");
		
		pgInfo.addCapProjLink(aCapProjLink);
		
		var aCapProjLink = new CapProjLink();
		aCapProjLink.projName="Zeus RX";
		aCapProjLink.projID="da3FVAd";
		aCapProjLink.capSetNames.push("VoLTE simple call");
		aCapProjLink.capSetNames.push("VoLTE Regression");
		aCapProjLink.capSetNames.push("VoLTE Operator Orange");
		aCapProjLink.capSetIDs.push("adarv");
		aCapProjLink.capSetIDs.push("aggav");
		aCapProjLink.capSetIDs.push("aggavzor");
		
		pgInfo.addCapProjLink(aCapProjLink);
	
		this.pageInfo = pgInfo;
		
		this.testInitBEValues();
		
		this.pageReady=true;
	}
	testInitBEValues(): void {
		
		// stream info 
		
		/*
		var aStreamInfo = new StreamInfo();
		aStreamInfo.port= "22";
		aStreamInfo.trans= "FTP";
		aStreamInfo.packets= "3322";
		aStreamInfo.size="44551";
		aStreamInfo.protocol="ETSI 102 232-5 v331";
		this.capStreams.push(aStreamInfo);
		
		var aStreamInfo = new StreamInfo();
		aStreamInfo.port= "6001";
		aStreamInfo.trans= "TCP";
		aStreamInfo.packets= "6322";
		aStreamInfo.size="556312";
		aStreamInfo.protocol="ULIC RTP";
		this.capStreams.push(aStreamInfo);
		
		var aStreamInfo = new StreamInfo();
		aStreamInfo.port= "8080";
		aStreamInfo.trans= "TCP";
		aStreamInfo.packets= "322";
		aStreamInfo.size="5312";
		aStreamInfo.protocol="HTTP";
		this.capStreams.push(aStreamInfo);
		
		var aStreamInfo = new StreamInfo();
		aStreamInfo.port= "8080";
		aStreamInfo.trans= "TCP";
		aStreamInfo.packets= "322";
		aStreamInfo.size="5312";
		aStreamInfo.protocol="unknown";
		this.capStreams.push(aStreamInfo);*/
		
		// this.presetInfo.testInit();
		
	}

}
