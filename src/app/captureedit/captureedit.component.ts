import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

import {FullCaptureInfo,CapProjLink,StreamInfo,CaptureTag,CaptureInfo,PredefinedTypeStruct} from './CaptureStructures';
import {ProjMember} from '../project/projectPageComponents'

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
	

	constructor() { 
	
		this.capStreams=[];
		this.capICTypes=[];
		this.capTechnologyTypes=[];
		this.capX2Protos=[];
		this.capX3Protos=[];
		this.capTransportTypes=[];
		this.testInit();
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
		
	}

}
