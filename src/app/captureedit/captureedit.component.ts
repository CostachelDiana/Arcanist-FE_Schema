import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

import { HttpClient } from '@angular/common/http';
import {FullCaptureInfo,CapProjLink,StreamInfo,CaptureTag,CaptureInfo,PredefinedTypeStruct,PresetTypesInfo} from './CaptureStructures';
import {ProjMember, ProjPageCaptureInfo,InjectionSettings} from '../project/projectPageComponents'
import {SingleInjectCaptureDialogue} from '../dialogues/SingleInjectCaptureDialogue'
import {AddCaptureTagDialogue} from '../dialogues/AddCaptureTagDialogue'
import {AddCaptureInfoDialogue} from '../dialogues/AddCaptureInfoDialogue'
import {CaptureEditPageSerializer} from '../captureedit/CaptureEditPageSerializer'
import {IPage, IBEAbstractionGeneric} from '../project/IProject'

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-project',
  templateUrl: './captureedit.component.html',
  styleUrls: ['./captureedit.component.css']
})
export class CaptureEditPage implements IPage{

	
	pageInfo: FullCaptureInfo;

	presetInfo: PresetTypesInfo;
	capStreams: StreamInfo[];
	
	serializer: CaptureEditPageSerializer;
	pageReady: boolean;
	streamsReady: boolean;
	

	constructor(public dialogue: MatDialog, private http: HttpClient) { 
	
		this.pageReady= false;
		this.streamsReady=false;
		this.presetInfo = new PresetTypesInfo();
		this.capStreams=[];
		
		this.serializer = new CaptureEditPageSerializer();
		
		this.requestPage();
		
	}
	
	public requestPage()
	{
		var urlParams = new URLSearchParams(window.location.search);
		var capID=urlParams.get('capid');
		console.log("requesting page for id "+ capID);
		
	}
	
	public initPage(json: string)
	{
	}
	
	
	public onBEEventReceived(evtJson: string): void {
		
		var jObj = JSON.parse(evtJson);
		var evt = jObj["event-type"];
		
		if (evt=="presets-received")
		{
			this.presetInfo = this.serializer.deserializePresetValues(jObj);
		} else if (evt=="streams-received")
		{
			this.capStreams = this.serializer.deserializeStreamInfo(jObj);
		} else if (evt=="capture-page-received")
		{
			console.log("Capture page received");
			var elRezo = this.serializer.deserializePageInfo(jObj);
			console.log("elRezo info is "+JSON.stringify(elRezo));
			this.pageInfo = elRezo;
			
			console.log("new page info is "+JSON.stringify(this.pageInfo));
		}
		
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
	
	
	
	
	// to be called from html 
	public requestBackendData(capID: string) {
	}
	
	// button hooks
	public onInjectCaptureClick():void {
		
		var capInfo = new ProjPageCaptureInfo("NoProj","noid");
		capInfo.captureX2Port=this.pageInfo.capX2Port;
		capInfo.captureX2Transport=this.pageInfo.capX2Trans;
		capInfo.captureX3Port=this.pageInfo.capX3Port;
		capInfo.captureX3Transport=this.pageInfo.capX3Trans;
		capInfo.captureID = this.pageInfo.capID;
		
		var injSett = new InjectionSettings();
		
		
		var dialogRef = this.dialogue.open(SingleInjectCaptureDialogue, 
		{width:'1100px',
		height:'800px',
		 data: {callback: null, cap: capInfo,set: injSett,justSetting:false, setIdx:-1, capN: -1,fromProjScreen:false, X2TransVals: this.presetInfo.capTransportTypes, X3TransVals: this.presetInfo.capTransportTypes}
		}
		);
	}
	public onAddToFavoritesClick(): void {
		
	}
	public onValidateCaptureClick(): void {
	}
	public onAddCaptureInfoCallback(typeID: string, valueID: string ): void {
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
	public onAddCaptureTagCallback(tagID: string): void {
		
		for (var i=0;i<this.presetInfo.capTagList.length;i++)
		{
			if (this.presetInfo.capTagList[i].id == tagID)
			{
				var capTag = new CaptureTag();
				capTag.tagID = this.presetInfo.capTagList[i].id;
				capTag.tagName = this.presetInfo.capTagList[i].displayName;
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
	
	
	
	public onRequestBEUpdateClick() {
		this.requestBackendData("hahahlera");
	}
	public onGetStreamsClick() {
		this.streamsReady=true;
	}
	
	public onQuerryBackendClick() {
		
		console.log("Backend querried");
		 this.http.post<any>('https://jsonplaceholder.typicode.com/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
            (<HTMLInputElement> document.querySelector(".usrNotes")).value="BE Response received "+ data.id;
        })
	}
	
	
	public onBEResponseReceived(){
		
		(<HTMLInputElement> document.querySelector(".usrNotes")).value="BE Response received";
	}
	
	
	public onGeneratePresetsJsonClick(): void {
		
		var jSon = this.serializer.serializePresetInfo(this.presetInfo);
		// update
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jSon;
		// 
	}
	public onInjectPresetsJsonClick(): void {
		
		var jStr = this.serializer.getHardcodedPresetJson();		
		this.onBEEventReceived(jStr);
	}
	public onGenerateStreamJsonClick(): void {
		
		var jSon = this.serializer.serializeStreams(this.capStreams);
		
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jSon;
		
	}
	public onInjectStreamsJsonClick(): void {
		var jStr = this.serializer.getHardcodedStreamJson();
		
		this.onBEEventReceived(jStr);
	}
	public onGeneratePageJsonClick(): void {
		
		var jStr = this.serializer.serializeFullPageInfo(this.pageInfo);
		
		(<HTMLInputElement> document.querySelector(".usrNotes")).value=jStr;
	}
	public onInjectPageJsonClick(): void {
		var jStr = this.serializer.getHardcodedPageJson();
		console.log("inejcting page json");
		this.onBEEventReceived(jStr);
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
		
		var aStruct = new PredefinedTypeStruct();
		aStruct.displayName="VoLTE";
		aStruct.id="vlt13";		
		pgInfo.capTechnology=aStruct;
		
		var aStruct = new PredefinedTypeStruct();
		aStruct.displayName="Verified";
		aStruct.id="vrf123";
		pgInfo.capStatus = aStruct;
			
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID="gaga";
		aCapInfo.infoTypeName="LIID";
		aCapInfo.infoValID="";
		aCapInfo.infoValName="12334";
		pgInfo.capIC=aCapInfo;		
		
		pgInfo.capSwitchDate="15.01.2020";
		
		// TAGS
		var aCapTag=  new CaptureTag();
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
		
		pgInfo.addCaptureTag(aCapTag);
		
		// INFOS
		var aCapInfo = new CaptureInfo();
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
		pgInfo.addCaptureInfo(aCapInfo);
		
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
