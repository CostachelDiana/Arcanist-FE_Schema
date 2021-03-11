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

export class ExplicitDate {
	date: number;
	day: number;
	hours: number;
	minutes: number;
	month: number;
	nanos: number;
	seconds: number;
	time: number;
	timezoneOffset: number;
	year: number;
}

export class CaptureBackendObj {
	ccPort: string;
	ccIP: string;	
	ccProtocolId: number;
	ccTransportId: number;
	cdPort: string;
	cdIP: string;
	cdProtocolId: number;
	cdTransportId: number;
	filepath: string;
	icIdentifier: string;
	interceptionCriteriaId: number;
	// lastUpdatedAt: ExplicitDate;
	lastUpdatedAt: string;
	lastUpdatedBy: string;
	length: number;
	name: string;
	notes: string;
	size: number;
	status: number;
	switchTime: string;
	technologyId: number;
	// uploadedAt: ExplicitDate;
	uploadedAt: string;
	uploadedBy: string;
	uuid: string;
	// verifiedAt: ExplicitDate;
	verifiedAt: string;
	verifiedBy: string;
	
	rawObj: Object;
}

export class FullCaptureInfo {
	
	beObj: CaptureBackendObj;
	
	capBEPath: string;
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
	
	public getBeObj(): CaptureBackendObj {
		return this.beObj;
	}
	// updates cap info according to be Obj
	public setBeObj(jObj: Object, presets: PresetTypesInfo) {
		
		var obj = new CaptureBackendObj();
		Object.assign(obj,jObj);
		obj.rawObj=jObj;
		
		console.log("setting be Obj");
		this.beObj = obj;
		
		this.capBEPath = obj.filepath;
		this.capID = obj.uuid;
		this.capName = obj.name;
		this.capSize = ""+obj.size;
		this.capLength = ""+obj.length;
		this.capUserNotes = obj.notes;
		// this.lastUpdateDate = "" +obj.lastUpdatedAt.day+"-"+obj.lastUpdatedAt.month+"-"+obj.lastUpdatedAt.year;
		this.lastUpdateDate=obj.lastUpdatedAt;
		this.lastUpdater = new ProjMember("");
		this.lastUpdater.name = obj.lastUpdatedBy;
		this.lastUpdater.surname="";
		// this.uploadDate = "" +obj.uploadedAt.day+"-"+obj.uploadedAt.month+"-"+obj.uploadedAt.year;
		this.uploadDate=obj.uploadedAt;
		this.uploader = new ProjMember("");
		this.uploader.name = obj.uploadedBy;
		this.uploader.surname= "";
		this.verifier= new ProjMember("");
		this.verifier.name = obj.verifiedBy;
		this.verifier.surname="";
		
		this.capX2Protocol = presets.genericGetNameForID(presets.capX2Protos,obj.cdProtocolId);
		this.capX2Trans = presets.genericGetNameForID(presets.capTransportTypes, obj.cdTransportId);
		this.capX2Port = obj.cdPort;
		
		this.capX3Protocol = presets.genericGetNameForID(presets.capX3Protos,obj.ccProtocolId);
		this.capX3Trans = presets.genericGetNameForID(presets.capTransportTypes, obj.ccTransportId);
		this.capX3Port = obj.ccPort;
		
		this.capTechnology = presets.genericGetEntryForId(presets.capTechnologyTypes, obj.technologyId);
		this.capStatus = presets.genericGetEntryForId(presets.capStatusTypes,obj.status);
		
		
		this.capIC = new CaptureInfo();
		this.capIC.infoTypeID = obj.interceptionCriteriaId;
		this.capIC.infoTypeName = presets.genericGetNameForID(presets.capICTypes, obj.interceptionCriteriaId);
		this.capIC.infoValID = -1;
		this.capIC.infoValName = obj.icIdentifier;
		this.capSwitchDate = obj.switchTime;
		
		// add tags
		var tagArr = jObj["tags"];
		
		console.log("fetched tagArr with length "+tagArr.length+" data "+tagArr);
		if (tagArr!=null)
		{
			for (let item in tagArr)
			{
				var entry = new PredefinedTypeStruct();
				entry.id = tagArr[item]["tagId"];				
				entry.displayName=presets.genericGetNameForID(presets.capTagList,entry.id);
				
				console.log("pushing tag "+entry);
				this.capTags.push(entry);
			}
		}
		console.log("parsing infos for jObj " +JSON.stringify(jObj));
		for (var i=0;i<presets.capInfoTypesList.length;i++)
		{
			// for each type try to get an entry
			var name =presets.capInfoTypesList[i].displayName;
			console.log("requesting arr for "+name+"s");
			var infoArr = jObj[name+"s"];
			if (infoArr!=null)
			{
				console.log("got arr with size "+infoArr.length+" and data " +infoArr);
				for (var j=0;j<infoArr.length;j++)
				{
					
					
					var infoEntry = new CaptureInfo();
					
					infoEntry.infoTypeID = presets.genericGetIDForName(presets.capInfoTypesList,name);
					infoEntry.infoTypeName = name;
					infoEntry.infoValID = infoArr[j];
					infoEntry.infoValName = presets.genericGetValNameForInfoIdValId(infoEntry.infoTypeID,infoEntry.infoValID);
					
					console.log("pushing entry type ["+infoEntry.infoTypeID+":"+infoEntry.infoTypeName+"] val["+infoEntry.infoValID+":"+infoEntry.infoValName+"]");
					this.capInfos.push(infoEntry);					
				
				}
				
			}
		}
		/*
		for (let item in jObj) {			  
			  var entry = new ProjEntry();
			  entry.projectName=jObj[item]["name"];
			  entry.projectId=jObj[item]["id"];
			  entry.projectLink="/ProjectPage?projId="+entry.projectId;
			  this.projs.push(entry);
		  }*/
	}
	// updates be obj according to cap info
	// only updates user editable fields
	public updateBeObj(presets: PresetTypesInfo) {
		this.beObj.name = this.capName;
		this.beObj.notes = this.capUserNotes;

		this.beObj.technologyId = presets.genericGetIDForName(presets.capTechnologyTypes, this.capTechnology.displayName);

		this.beObj.cdProtocolId = presets.genericGetIDForName(presets.capX2Protos, this.capX2Protocol);
		this.beObj.cdTransportId = presets.genericGetIDForName(presets.capTransportTypes, this.capX2Trans);
		this.beObj.cdPort = this.capX2Port;
		this.beObj.cdIP = this.capX2IP;
		
		this.beObj.ccProtocolId = presets.genericGetIDForName(presets.capX3Protos, this.capX3Protocol);
		this.beObj.ccTransportId = presets.genericGetIDForName(presets.capTransportTypes, this.capX3Trans);
		this.beObj.ccPort = this.capX3Port;
		this.beObj.ccIP = this.capX3IP;		
		
		this.beObj.icIdentifier = this.capIC.infoValName;
		this.beObj.interceptionCriteriaId = this.capIC.infoTypeID;
	}
	
	public serializeForCaptureUpdate(presets: PresetTypesInfo) : string{
		var jsonObj = new Object();

		jsonObj["name"] = this.capName;
		jsonObj["notes"] = this.capUserNotes;
		jsonObj["icIdentifier"] = this.capIC.infoValName;
		jsonObj["interceptionCriteriaId"] = this.capIC.infoTypeID;
		jsonObj["technologyId"] = presets.genericGetIDForName(presets.capTechnologyTypes, this.capTechnology.displayName);

		jsonObj["ccProtocolId"] = presets.genericGetIDForName(presets.capX3Protos, this.capX3Protocol);
		jsonObj["ccTransportId"] = presets.genericGetIDForName(presets.capTransportTypes, this.capX3Trans);
		jsonObj["ccPort"] = this.capX3Port;
		jsonObj["ccIP"] = this.capX3IP;	

		jsonObj["cdProtocolId"] = presets.genericGetIDForName(presets.capX2Protos, this.capX2Protocol);
		jsonObj["cdTransportId"] = presets.genericGetIDForName(presets.capTransportTypes, this.capX2Trans);
		jsonObj["cdPort"] = this.capX2Port;
		jsonObj["cdIP"] = this.capX2IP;			
		jsonObj["uuid"] = this.capID;

		//tags
		if(this.capTags.length > 0)
		{
			var tagArray = [];
			for(var i = 0; i < this.capTags.length; i++)
			{
				tagArray.push(new Number(this.capTags[i].id));
			}
			jsonObj["tags"] = tagArray;
		}

		if(this.capInfos.length > 0)
		{
			var infoArrays = [];
			for(var i = 0; i < this.capInfos.length; i++)
			{
				if(!(this.capInfos[i].infoTypeName in infoArrays))
				{
					infoArrays[this.capInfos[i].infoTypeName+"s"] = [];
				}
				infoArrays[this.capInfos[i].infoTypeName+"s"].push(new Number(this.capInfos[i].infoValID));
			}		
			for(var info in infoArrays)
			{
				jsonObj[info] = infoArrays[info];
			}	
		}
		return JSON.stringify(jsonObj);;
	}

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
	
	public genericGetValNameForInfoIdValId(infoId: number, valId:number): string {
		var idx = this.genericGetIdxForID(this.capInfoTypesList, infoId);
		
		if (idx >-1 && idx < this.capInfoValsList.length)
		{
			
			return this.genericGetNameForID(this.capInfoValsList[idx],valId);
		} else {
			return "undefinedzor";
		}
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
	
	public genericGetEntryForId(arr: PredefinedTypeStruct[], id: number): PredefinedTypeStruct {
		for (var i=0; i<arr.length;i++)
			if (arr[i].id == id) return arr[i];

		var rez: PredefinedTypeStruct = { id: -1, displayName:""};
		return rez;
	}
	
	public genericGetEntryForName(arr: PredefinedTypeStruct[], name:string): PredefinedTypeStruct {
		for (var i=0; i<arr.length;i++)
			if (arr[i].displayName == name) return arr[i];

		var rez: PredefinedTypeStruct = { id: -1, displayName:""};
		return rez;
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
