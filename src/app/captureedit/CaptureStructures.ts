import {ProjMember} from '../project/projectPageComponents'



export class PredefinedTypeStruct {
	displayName: string;
	id: number;
}

export class CaptureInfo {
	infoTypeID : number;
	infoTypeName : string;
	infoValID : number;
	infoValName: string;
}


export class StreamInfo {
    port: string;
    ip: string;
	trans: string;
	packets: string;
	size: string;
	protocol: string;
}

export class CapProjLink {
	projName: string;
	projID: string;
	capSetNames: string[];
	capSetIDs: string[];
	
	constructor() {
		this.capSetNames=[];
		this.capSetIDs=[];
	}
}

export class FullCaptureInfo {
	
	capID : string ;
	capName : string ;
	capSize : string;
	capLength : string;
	capUserNotes: string;
	lastUpdateDate : string;
	lastUpdater: ProjMember;
	uploadDate: string;
	uploader: ProjMember;
	
	verifier: ProjMember;
	verifyDate: string;
	
	capX2Protocol: string;
	capX2Trans: string;
	capX2Port: string;
  	capX2IP: string;
	
	capX3Protocol: string;
	capX3Trans: string;
	capX3Port: string;
	capX3IP: string;
	
	capTechnology: PredefinedTypeStruct;
	capStatus: PredefinedTypeStruct;
	
	capIC: CaptureInfo;	
	capSwitchDate: string;
	
	capTags: PredefinedTypeStruct[];
	capInfos: CaptureInfo[];
	capProjects: CapProjLink[];
	
	constructor () {
		this.capTags=[];
		this.capInfos=[];
		this.capProjects=[];
		
		this.capStatus = new PredefinedTypeStruct();
		this.capStatus.id = -1;
		this.capStatus.displayName="Uninited";
		this.capTechnology = new PredefinedTypeStruct();
		this.capTechnology.id = -1;
		this.capTechnology.displayName="Uninited";
	}
	public getCaptureProjsNumber(): number {
		return this.capProjects.length;
	}
	public getCaptureRefNumber(): number {
		var rez = 0;
		for (var i=0;i<this.capProjects.length;i++)
		{
			rez = rez + this.capProjects[i].capSetNames.length;
		}
		return rez;
	}
	public getCaptureTags(): PredefinedTypeStruct[] {
		return this.capTags;
	}
	public removeCaptureTag(idx: number): void
	{
		 if (idx > -1 && idx < this.capTags.length)
		 {
			  this.capTags.splice(idx,1);
		 }
	}
	public addCaptureTag(aTag: PredefinedTypeStruct): void {
		this.capTags.push(aTag);
	}
	public getCaptureInfos(): CaptureInfo[] {
		return this.capInfos;
	}
	public addCaptureInfo(aInfo: CaptureInfo): void {
		this.capInfos.push(aInfo);
	}
	public removeCaptureInfo(idx: number): void {
		if (idx > -1 && idx < this.capInfos.length)
		{
			this.capInfos.splice(idx,1);
		}
	}
	public addCapProjLink(aLink: CapProjLink): void {
		this.capProjects.push(aLink);
	}
	public getCaptureProjectLinks(): CapProjLink[] {
		return this.capProjects;
	}
	
	
}

export class PresetTypesInfo {
	
	capICTypes: PredefinedTypeStruct[];
	capTechnologyTypes: PredefinedTypeStruct[];
	capX2Protos: PredefinedTypeStruct[];
	capX3Protos: PredefinedTypeStruct[];
	capTransportTypes: PredefinedTypeStruct[];
	capStatusTypes: PredefinedTypeStruct[]; 
	
	capTagList: PredefinedTypeStruct[];	
	capInfoValsList: PredefinedTypeStruct[][];
	capInfoTypesList: PredefinedTypeStruct[];	
	
	constructor() {
		
		this.capICTypes=[];
		this.capTechnologyTypes=[];
		this.capX2Protos=[];
		this.capX3Protos=[];
		this.capTransportTypes=[];
		this.capStatusTypes=[];
		this.capTagList=[];
		this.capInfoValsList=[];
		this.capInfoTypesList=[];
	}
	
	public genericGetNameForID(arr: PredefinedTypeStruct[], ID: number): string {
		for (var i =0; i< arr.length;i++)
			if (arr[i].id == ID) return arr[i].displayName;
			
		return "";
	}
	public genericGetIDForName(arr: PredefinedTypeStruct[], name: string): number {
		for (var i =0; i< arr.length;i++)
			if (arr[i].displayName == name) return arr[i].id;
			
		return -1;
	}
	public genericGetIdxForID(arr: PredefinedTypeStruct[], ID: number): number {
		for (var i =0; i< arr.length;i++)
			if (arr[i].id == ID) return i;
			
		return -1;
	}
	
	
	
	public testInit():void {
		// technologies
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="VoLTE";
		aPresetType.id=1;
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="VOIP";
		aPresetType.id=2;
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="MPD";
		aPresetType.id=3;
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="MPD 5G";
		aPresetType.id=4;
		this.capTechnologyTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="CS";
		aPresetType.id=5;
		this.capTechnologyTypes.push(aPresetType);
		
		
		// X2 Protocols capX3Protos 
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Unknown";
		aPresetType.id=6;		
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="plain RTP";
		aPresetType.id=7;
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="ULIC";
		aPresetType.id=8;
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="ULIC EPS";
		aPresetType.id=9;
		this.capX3Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Huawei SAE";
		aPresetType.id=11;
		this.capX3Protos.push(aPresetType);
		
		// X2 protos
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Unknown";
		aPresetType.id=11;
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="ETSI 33 108 v271";
		aPresetType.id=12;
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="ETSI 102 232-5 v331";
		aPresetType.id=13;
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="ETSI 33 128 v152";
		aPresetType.id=14;
		this.capX2Protos.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Huawei DKBA 2011";
		aPresetType.id=15;
		this.capX2Protos.push(aPresetType);
		
		
		// cap transport types
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="TCP";
		aPresetType.id=16;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="UDP";
		aPresetType.id=17;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="FTP";
		aPresetType.id=18;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="MSMQ";
		aPresetType.id=19;
		this.capTransportTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="SMTP";
		aPresetType.id=20;
		this.capTransportTypes.push(aPresetType);
		
		//Status Types
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Draft";
		aPresetType.id=21;
		this.capStatusTypes.push(aPresetType);

		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Unverified";
		aPresetType.id=22;
		this.capStatusTypes.push(aPresetType);		

		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Verified";
		aPresetType.id=23;
		this.capStatusTypes.push(aPresetType);		

		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Open For Changes";
		aPresetType.id=24;
		this.capStatusTypes.push(aPresetType);		

		// IC Types 
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="LIID";
		aPresetType.id=25;
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="MSISDN";
		aPresetType.id=26;
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="IPv4";
		aPresetType.id=27;
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="IMSI";
		aPresetType.id=28;
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="IMEI";
		aPresetType.id=29;
		this.capICTypes.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="PhoneNumber";
		aPresetType.id=30;
		this.capICTypes.push(aPresetType);
		
		// tag list 
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Target To Target";
		aPresetType.id=31;
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Generated";
		aPresetType.id=32;
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="CD Bypass";
		aPresetType.id=33;
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="TLS1.2";
		aPresetType.id=34;
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="multiprotocol";
		aPresetType.id=35;
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="X3DTMF";
		aPresetType.id=36;
		this.capTagList.push(aPresetType);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Dynamic Codecs";
		aPresetType.id=37;
		this.capTagList.push(aPresetType);
		
		// capture Info List 
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Event";
		aPresetType.id=38;
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Bearer Activation";
		aPresetType.id=39;
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Bearer Deactivation";		
		aPresetType.id=40;
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Call Begin";
		aPresetType.id=41;
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Location Update";
		aPresetType.id=42;
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Supplementary services - conference";
		aPresetType.id=43;
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="SMS";
		aPresetType.id=44;
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);
		/*
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Codec";
		aPresetType.id="citcdc";
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="EVS";
		aPresetType.id="cicdcevs";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="AMR";		
		aPresetType.id="cicdcamr";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="AMR-WB";
		aPresetType.id="cicdcamrwb";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="G781";
		aPresetType.id="cicdcg781";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="T38";
		aPresetType.id="ccdt38";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="GSM8";
		aPresetType.id="cdcgsm8";
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Scenario";
		aPresetType.id="citsc";
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Simple Call - incoming";
		aPresetType.id="ciscsci";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Call Forward Initiating";		
		aPresetType.id="cisccfi";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Call Forward Redirecting";
		aPresetType.id="cisccfr";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Simple Call - outgoing";
		aPresetType.id="ciscsco";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Long SMS";
		aPresetType.id="ciscsms";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Location Update";
		aPresetType.id="csclocup";
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);
		
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Language";
		aPresetType.id="cilng";
		this.capInfoTypesList.push(aPresetType);
		var aValArray: PredefinedTypeStruct[];
		aValArray=[];
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="English";
		aPresetType.id="cilngen";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Hebrew";		
		aPresetType.id="cilngheb";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Arabic";
		aPresetType.id="cilngar";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Chinese";
		aPresetType.id="cilngchn";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Russian";
		aPresetType.id="cilngrus";
		aValArray.push(aPresetType);
		var aPresetType = new PredefinedTypeStruct();
		aPresetType.displayName="Romanian";
		aPresetType.id="cilngro";
		aValArray.push(aPresetType);
		this.capInfoValsList.push(aValArray);*/
	}
	
}
