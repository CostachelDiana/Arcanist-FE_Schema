import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

import {FullCaptureInfo,CapProjLink,StreamInfo,CaptureTag,CaptureInfo,PredefinedTypeStruct} from './CaptureStructures';
import {ProjMember, ProjPageCaptureInfo,InjectionSettings} from '../project/projectPageComponents'
import {SingleInjectCaptureDialogue} from '../dialogues/SingleInjectCaptureDialogue'
import {AddCaptureTagDialogue} from '../dialogues/AddCaptureTagDialogue'
import {AddCaptureInfoDialogue} from '../dialogues/AddCaptureInfoDialogue'

@Component({
  selector: 'app-project',
  templateUrl: './captureedit.component.html',
  styleUrls: ['./captureedit.component.css']
})
export class CaptureEditPage {

	
	pageInfo: FullCaptureInfo;

	capICTypes: PredefinedTypeStruct[];
	capTechnologyTypes: PredefinedTypeStruct[];
	capX2Protos: PredefinedTypeStruct[];
	capX3Protos: PredefinedTypeStruct[];
	capTransportTypes: PredefinedTypeStruct[];
	
	capStreams: StreamInfo[];
	
	capTagList: PredefinedTypeStruct[];	
	capInfoValsList: PredefinedTypeStruct[][];
	capInfoTypesList: PredefinedTypeStruct[];
	
	
	pageReady: boolean;
	streamsReady: boolean;
	

	constructor(public dialogue: MatDialog) { 
	
		this. pageReady= false;
		this.streamsReady=false;
		this.capStreams=[];
		this.capICTypes=[];
		this.capTechnologyTypes=[];
		this.capX2Protos=[];
		this.capX3Protos=[];
		this.capTransportTypes=[];
		this.capTagList=[];
		this.capInfoValsList=[];
		this.capInfoTypesList=[];
		
			
		
	}
	
	public getPageInfo(): FullCaptureInfo {
		return this.pageInfo;
	}
	public getICTypes(): PredefinedTypeStruct[] {
		return this.capICTypes;
	}
	public getCapTechnologyTypes(): PredefinedTypeStruct[] {
		return this.capTechnologyTypes;
	}
	
	public getCapX3Protos(): PredefinedTypeStruct[] {
		return this.capX3Protos;
	}
	public getCapX2Protos(): PredefinedTypeStruct[] {
		return this.capX2Protos;
	}
	public getStreamInfos(): StreamInfo[] {
		return this.capStreams;
	}
	public getCapTransportTypes(): PredefinedTypeStruct[] {
		return this.capTransportTypes;
	}
	
	public isStreamReady(): boolean {
		return this.streamsReady;
	}
	public isPageReady(): boolean {
		return this.pageReady;
	}
	
	// debug button hooks
	public onGeneratePageClick() {
		this.testInit();
	}
	
	public onRequestBEUpdateClick() {
		this.requestBackendData("hahahlera");
	}
	public onGetStreamsClick() {
		this.streamsReady=true;
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
		 data: {callback: null, cap: capInfo,set: injSett,justSetting:false, setIdx:-1, capN: -1,fromProjScreen:false, X2TransVals: this.capTransportTypes, X3TransVals: this.capTransportTypes}
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
		for (var i=0;i<this.capInfoTypesList.length;i++)
		{
			if (this.capInfoTypesList[i].ID == typeID)
			{
				aInfo.infoTypeID=typeID;
				aInfo.infoTypeName=this.capInfoTypesList[i].name;
				
				for (var j=0;j<this.capInfoValsList[i].length;j++)
				{
					if (this.capInfoValsList[i][j].ID == valueID)
					{
						aInfo.infoValID=valueID;
						aInfo.infoValName=this.capInfoValsList[i][j].name;
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
		 data: {callback: this.onAddCaptureInfoCallback.bind(this),eventTypes: this.capInfoTypesList, eventValues:this.capInfoValsList}
		}
		);
	}
	public onAddCaptureTagCallback(tagID: string): void {
		
		for (var i=0;i<this.capTagList.length;i++)
		{
			if (this.capTagList[i].ID == tagID)
			{
				var capTag = new CaptureTag();
				capTag.tagID = this.capTagList[i].ID;
				capTag.tagName = this.capTagList[i].name;
				this.pageInfo.addCaptureTag(capTag);
			}
		}
	}
	public onAddCaptureTagClick(): void{
		
		var dialogRef = this.dialogue.open(AddCaptureTagDialogue, 
		{width:'900px',
		height:'800px',
		 data: {callback: this.onAddCaptureTagCallback.bind(this),tagList: this.capTagList}
		}
		);
	}
	
	public onRemoveCaptureInfoClick(index: number): void{
		this.pageInfo.removeCaptureInfo(index);
	}
	public onRemoveCaptureTagClick(index: number):void {
		this.pageInfo.removeCaptureTag(index);
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
		aStruct.name="VoLTE";
		aStruct.ID="vlt13";		
		pgInfo.capTechnology=aStruct;
		
		var aStruct = new PredefinedTypeStruct();
		aStruct.name="Verified";
		aStruct.ID="vrf123";
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
		this.capStreams.push(aStreamInfo);
		
		// technologies
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="VoLTE";
		aPresetType.ID="ptt123";
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="VOIP";
		aPresetType.ID="ptt13";
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="MPD";
		aPresetType.ID="ptt11";
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="MPD 5G";
		aPresetType.ID="ptt22";
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="CS";
		aPresetType.ID="ptt14";
		this.capTechnologyTypes.push(aPresetType);
		
		
		// X2 Protocols capX3Protos 
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Unknown";
		aPresetType.ID="x3tunk1";		
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="plain RTP";
		aPresetType.ID="x3rtp";
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="ULIC";
		aPresetType.ID="x3lic";
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="ULIC EPS";
		aPresetType.ID="x3eps";
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Huawei SAE";
		aPresetType.ID="x3sae";
		this.capX3Protos.push(aPresetType);
		
		// X2 protos
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Unknown";
		aPresetType.ID="x2tunk1";		
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="ETSI 33 108 v271";
		aPresetType.ID="x2rtp";
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="ETSI 102 232-5 v331";
		aPresetType.ID="x2lic";
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="ETSI 33 128 v152";
		aPresetType.ID="x2eps";
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Huawei DKBA 2011";
		aPresetType.ID="x2sae";
		this.capX2Protos.push(aPresetType);
		
		
		// cap transport types
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="TCP";
		aPresetType.ID="tttcp";
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="UDP";
		aPresetType.ID="ttudp";
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="FTP";
		aPresetType.ID="ttftp";
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="MSMQ";
		aPresetType.ID="ttmsmq";
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="SMTP";
		aPresetType.ID="ttsmtp";
		this.capTransportTypes.push(aPresetType);
		
		// IC Types 
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="LIID";
		aPresetType.ID="ictliid";
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="MSISDN";
		aPresetType.ID="ictmsisdn";
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="IPv4";
		aPresetType.ID="ictipv4";
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="IMSI";
		aPresetType.ID="ictimsi";
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="IMEI";
		aPresetType.ID="ictimei";
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="PhoneNumber";
		aPresetType.ID="ictphone";
		this.capICTypes.push(aPresetType);
		
		// tag list 
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Target To Target";
		aPresetType.ID="ctagttt";
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Generated";
		aPresetType.ID="ctgen";
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="CD Bypass";
		aPresetType.ID="ctcdbpass";
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="TLS1.2";
		aPresetType.ID="cttls12";
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="multiprotocol";
		aPresetType.ID="ctmltp";
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="X3DTMF";
		aPresetType.ID="ctx3dtmf";
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Dynamic Codecs";
		aPresetType.ID="ctdcdcs";
		this.capTagList.push(aPresetType);
		
		// capture Info List 
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Event";
		aPresetType.ID="citev";
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Bearer Activation";
		aPresetType.ID="cievba";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Bearer Deactivation";		
		aPresetType.ID="cievbd";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Call Begin";
		aPresetType.ID="cievbeg";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Location Update";
		aPresetType.ID="cievlocu";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Supplementary services - conference";
		aPresetType.ID="cievssc";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="SMS";
		aPresetType.ID="cievsms";
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Codec";
		aPresetType.ID="citcdc";
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="EVS";
		aPresetType.ID="cicdcevs";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="AMR";		
		aPresetType.ID="cicdcamr";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="AMR-WB";
		aPresetType.ID="cicdcamrwb";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="G781";
		aPresetType.ID="cicdcg781";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="T38";
		aPresetType.ID="ccdt38";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="GSM8";
		aPresetType.ID="cdcgsm8";
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Scenario";
		aPresetType.ID="citsc";
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Simple Call - incoming";
		aPresetType.ID="ciscsci";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Call Forward Initiating";		
		aPresetType.ID="cisccfi";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Call Forward Redirecting";
		aPresetType.ID="cisccfr";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Simple Call - outgoing";
		aPresetType.ID="ciscsco";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Long SMS";
		aPresetType.ID="ciscsms";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Location Update";
		aPresetType.ID="csclocup";
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Language";
		aPresetType.ID="cilng";
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="English";
		aPresetType.ID="cilngen";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Hebrew";		
		aPresetType.ID="cilngheb";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Arabic";
		aPresetType.ID="cilngar";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Chinese";
		aPresetType.ID="cilngchn";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Russian";
		aPresetType.ID="cilngrus";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.name="Romanian";
		aPresetType.ID="cilngro";
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);
		
	}

}
