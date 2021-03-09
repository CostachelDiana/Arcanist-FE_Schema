import {ProjMember} from '../project/projectPageComponents'



export class PredefinedTypeStruct {
	name: string;
	ID: string;
}

export class CaptureInfo {
	infoTypeID : string;
	infoTypeName : string;
	infoValID : string;
	infoValName: string;
}

export class CaptureTag {
	tagID : string ;
	tagName : string;
}

export class StreamInfo {
	port: string;
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
	
	capX3Protocol: string;
	capX3Trans: string;
	capX3Port: string;
	
	capTechnology: PredefinedTypeStruct;
	capStatus: PredefinedTypeStruct;
	
	capIC: CaptureInfo;	
	capSwitchDate: string;
	
	capTags: CaptureTag[];
	capInfos: CaptureInfo[];
	capProjects: CapProjLink[];
	
	constructor () {
		this.capTags=[];
		this.capInfos=[];
		this.capProjects=[];
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
	public getCaptureTags(): CaptureTag[] {
		return this.capTags;
	}
	public removeCaptureTag(idx: number): void
	{
		 if (idx > -1 && idx < this.capTags.length)
		 {
			  this.capTags.splice(idx,1);
		 }
	}
	public addCaptureTag(aTag: CaptureTag): void {
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
	
	capTagList: PredefinedTypeStruct[];	
	capInfoValsList: PredefinedTypeStruct[][];
	capInfoTypesList: PredefinedTypeStruct[];	
	
	constructor() {
		
		this.capICTypes=[];
		this.capTechnologyTypes=[];
		this.capX2Protos=[];
		this.capX3Protos=[];
		this.capTransportTypes=[];
		this.capTagList=[];
		this.capInfoValsList=[];
		this.capInfoTypesList=[];
	}
	
	public genericGetNameForID(arr: PredefinedTypeStruct[], ID: string): string {
		for (var i =0; i< arr.length;i++)
			if (arr[i].ID == ID) return arr[i].name;
			
		return "";
	}
	public genericGetIDForName(arr: PredefinedTypeStruct[], name: string): string {
		for (var i =0; i< arr.length;i++)
			if (arr[i].name == name) return arr[i].ID;
			
		return "";
	}
	public genericGetIdxForID(arr: PredefinedTypeStruct[], ID: string): number {
		for (var i =0; i< arr.length;i++)
			if (arr[i].ID == ID) return i;
			
		return -1;
	}
	
	
	
	public testInit():void {
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