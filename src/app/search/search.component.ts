import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {CapProjLink, CaptureInfo, FullCaptureInfo, PredefinedTypeStruct, PresetTypesInfo} from "../captureedit/CaptureStructures";
import {AddCaptureTagDialogue} from '../dialogues/AddCaptureTagDialogue'
import {AddCaptureInfoDialogue} from '../dialogues/AddCaptureInfoDialogue'
import { ProjMember } from '../project/projectPageComponents';
import {BackendAPIHandler, IBEApiConsumer} from '../common/BackendAPIHandler'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, IBEApiConsumer {

  CAPTURE_EDIT_URL = 'CaptureEdit';

  private _pageInited: boolean;
  private _typesInfo: PresetTypesInfo;
  private _searchParameters: SearchParameters;
  private _searchFinished: boolean;
  private _searchResults: FullCaptureInfo[];
  

  constructor(public dialogue: MatDialog, private api:BackendAPIHandler) { 
    this._pageInited = true;
    this._searchFinished = false;
    this._typesInfo = this.api.presetTypes;
    this._searchParameters = new SearchParameters();
    this._searchResults = [];
  }

  ngOnInit(): void {
  }

  handleBEResponse(jObj: Object, evtType: string){
	  if(evtType == "search-captures-response")
	  {

	  }
  }


  private testInit(): void {
	  
  }

  get typesInfo() : PresetTypesInfo{
    return this._typesInfo;
  }

  get searchParameters() : SearchParameters{
    return this._searchParameters;
  }

  get searchResults(): FullCaptureInfo[]{
    return this._searchResults;
  }

  get searchFinished() : boolean{
    return this._searchFinished;
  }

  public onGeneratePageClick(): void {
		this.testInit();
		this._pageInited=true;
	}
	
	public isPageReady(): boolean {
		return this._pageInited;
	}

  public onCdProtocolOptionsChanged(event: any){
    this._searchParameters.cdProtocolSelectedId = event.target.value;
  }

  public onCcProtocolOptionsChanged(event: any){
    this._searchParameters.ccProtocolSelectedId = event.target.value;
  }
  
  public onTechnologiesOptionsChanged(event: any){
    this._searchParameters.technologySelectedId = event.target.value;
  }  
  
  public onStatusOptionsChanged(event: any){
    this._searchParameters.statusSelectedId = event.target.value;
  }

  public onTargetICOptionsChanged(event: any){
    this._searchParameters.targetICSelectedId = event.target.value;
  }

  public onAddCaptureInfoCallback(typeID: number, valueID: number ): void {
		var aInfo = new CaptureInfo();
		for (var i=0;i<this._typesInfo.capInfoTypesList.length;i++)
		{
			if (this._typesInfo.capInfoTypesList[i].id == typeID)
			{
				aInfo.infoTypeID=typeID;
				aInfo.infoTypeName=this._typesInfo.capInfoTypesList[i].displayName;
				
				for (var j=0;j<this._typesInfo.capInfoValsList[i].length;j++)
				{
					if (this._typesInfo.capInfoValsList[i][j].id == valueID)
					{
						aInfo.infoValID=valueID;
						aInfo.infoValName=this._typesInfo.capInfoValsList[i][j].displayName;
					}
				}
			}
		}
		this._searchParameters.addCaptureInfo(aInfo);
	}

	public onAddCaptureInfoClick(): void {
		var dialogRef = this.dialogue.open(AddCaptureInfoDialogue, 
		{width:'900px',
		height:'800px',
		 data: {callback: this.onAddCaptureInfoCallback.bind(this),eventTypes: this._typesInfo.capInfoTypesList, eventValues:this._typesInfo.capInfoValsList}
		}
		);
	}
  
	public onRemoveCaptureInfoClick(index: number): void{
		this._searchParameters.removeCaptureInfo(index);
	}

  public onAddCaptureTagCallback(tagID: number): void {
		
		for (var i=0;i<this._typesInfo.capTagList.length;i++)
		{
			if (this._typesInfo.capTagList[i].id == tagID)
			{
				var capTag = new PredefinedTypeStruct();
				capTag.id = this._typesInfo.capTagList[i].id;
				capTag.displayName = this._typesInfo.capTagList[i].displayName;
				this._searchParameters.addCaptureTag(capTag);
			}
		}
	}

	public onAddCaptureTagClick(): void{
		
		var dialogRef = this.dialogue.open(AddCaptureTagDialogue, 
		{width:'900px',
		height:'800px',
		 data: {callback: this.onAddCaptureTagCallback.bind(this),tagList: this._typesInfo.capTagList}
		}
		);
	} 

	public onRemoveCaptureTagClick(index: number):void {
		this._searchParameters.removeCaptureTag(index);
	}  

  	public onSearchClick():void {
		this._searchFinished = false;
		var request = this._searchParameters.serializeSearchParams();
		this.api.searchCaptures(this,request);
		//this.testFillSearchResults();
		this._searchFinished = true;
	}  

	private testFillSearchResults() : void {
		this.addTestCaptureResult();
		this.addTestCaptureResult();
		this.addTestCaptureResult();
		this.addTestCaptureResult();
	}

  private addTestCaptureResult() : void{
    var pgInfo = new FullCaptureInfo();
		
		pgInfo.capID = "d443KAv";
		pgInfo.capName = "Leo RX VoLTE Simple Call 1" + Math.random();
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
		aStruct.id=1;		
		pgInfo.capTechnology=aStruct;
		
		var aStruct = new PredefinedTypeStruct();
		aStruct.displayName="Verified";
		aStruct.id=2;
		pgInfo.capStatus = aStruct;
			
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID=1;
		aCapInfo.infoTypeName="LIID";
		aCapInfo.infoValID=-1;
		aCapInfo.infoValName="12334";
		pgInfo.capIC=aCapInfo;		
		
		pgInfo.capSwitchDate="15.01.2020";
		
		// TAGS
		var aCapTag=  new PredefinedTypeStruct();
		aCapTag.id=1;
		aCapTag.displayName="Target to Target";
		
		pgInfo.addCaptureTag(aCapTag);
		
		aCapTag=  new PredefinedTypeStruct();
		aCapTag.id=2;
		aCapTag.displayName="X3 DTMF";
		
		pgInfo.addCaptureTag(aCapTag);
		
		aCapTag=  new PredefinedTypeStruct();
		aCapTag.id=3
		aCapTag.displayName="Dynamic Codecs";
		
		pgInfo.addCaptureTag(aCapTag);
		
		// INFOS
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID=2;
		aCapInfo.infoTypeName="Event";
		aCapInfo.infoValID=2;
		aCapInfo.infoValName="Bearer Activation";
		
		pgInfo.addCaptureInfo(aCapInfo);
		
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID=1;
		aCapInfo.infoTypeName="Event";
		aCapInfo.infoValID=2;
		aCapInfo.infoValName="Incoming call";		
		pgInfo.addCaptureInfo(aCapInfo);
		
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID=1;
		aCapInfo.infoTypeName="Codec";
		aCapInfo.infoValID=2;
		aCapInfo.infoValName="EVS";
		
		pgInfo.addCaptureInfo(aCapInfo);
		
		var aCapInfo = new CaptureInfo();
		aCapInfo.infoTypeID=1;
		aCapInfo.infoTypeName="Codec";
		aCapInfo.infoValID=2;
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
	
		this._searchResults.push(pgInfo);
  }
}

export class MinMaxNumberOption {
  min: number;
  max: number;
  constructor(){
    this.min = undefined;
    this.max = undefined;
  }
}

export class SearchParameters {
  private _searchName: string;
  get searchName(): string {
    return this._searchName;
  }
  set searchName(newName: string){
    this._searchName = newName;
  }  

  private _cdProtocolSelectedId: number;
  get cdProtocolSelectedId() : number{
    return this._cdProtocolSelectedId;
  }
  set cdProtocolSelectedId (selectedId : number){
    this._cdProtocolSelectedId = selectedId;
  }  

  private _ccProtocolSelectedId: number;
  get ccProtocolSelectedId() : number{
    return this._ccProtocolSelectedId;
  }
  set ccProtocolSelectedId (selectedId : number){
    this._ccProtocolSelectedId = selectedId;
  }  

  private _technologySelectedId: number;
  get technologySelectedId() : number{
    return this._technologySelectedId;
  }
  set technologySelectedId (selectedId : number){
    this._technologySelectedId = selectedId;
  }   

  private _durationMinMax: MinMaxNumberOption;
  get durationMin(): number{
    return this._durationMinMax.min;
  }
  set durationMin(duration: number){
    this._durationMinMax.min = duration;
  }
  get durationMax(): number{
    return this._durationMinMax.max;
  }
  set durationMax(duration: number){
    this._durationMinMax.max = duration;
  }

  private _referencesMinMax: MinMaxNumberOption;
  get referencesMin(): number{
    return this._referencesMinMax.min;
  }
  set referencesMin(references: number){
    this._referencesMinMax.min = references;
  }
  get referencesMax(): number{
    return this._referencesMinMax.max;
  }
  set referencesMax(references: number){
    this._referencesMinMax.max = references;
  }

  private _projectsMinMax: MinMaxNumberOption;
  get projectsMin(): number{
    return this._projectsMinMax.min;
  }
  set projectsMin(projects: number){
    this._projectsMinMax.min = projects;
  }
  get projectsMax(): number{
    return this._projectsMinMax.max;
  }
  set projectsMax(projects: number){
    this._projectsMinMax.max = projects;
  }

  private _statusSelectedId: number;
  get statusSelectedId() : number{
    return this._statusSelectedId;
  }
  set statusSelectedId (selectedId : number){
    this._statusSelectedId = selectedId;
  } 

  private _targetICSelectedId : number;
  get targetICSelectedId() : number{
    return this._targetICSelectedId;
  }
  set targetICSelectedId (selectedId : number){
    this._targetICSelectedId = selectedId;
  } 

  private _capTags: PredefinedTypeStruct[];
  get capTags(): PredefinedTypeStruct[] {
		return this._capTags;
	}
	public removeCaptureTag(idx: number): void {
		 if (idx > -1 && idx < this._capTags.length)
		 {
			  this._capTags.splice(idx,1);
		 }
	}
	public addCaptureTag(aTag: PredefinedTypeStruct): void {
		this._capTags.push(aTag);
	}

	private _capInfos: CaptureInfo[];
	get capInfos(): CaptureInfo[] {
		return this._capInfos;
	}
	public removeCaptureInfo(idx: number): void {
		if (idx > -1 && idx < this._capInfos.length)
		{
			this._capInfos.splice(idx,1);
		}
	}
	public addCaptureInfo(aInfo: CaptureInfo): void {
		this._capInfos.push(aInfo);
	}

	public serializeSearchParams() : string{
		var jsonObj = [];
		
		if(this._searchName)
		{
			jsonObj.push({
				["field"] : "name",
				["operator"] : "LIKE",
				["value"] : this._searchName,
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}
		
		if(this._cdProtocolSelectedId)
		{
			jsonObj.push({
				["field"] : "cdProtocolId",
				["operator"] : "EQUALS",
				["value"] : this._cdProtocolSelectedId,
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}

		if(this._ccProtocolSelectedId)
		{
			jsonObj.push({
				["field"] : "ccProtocolId",
				["operator"] : "EQUALS",
				["value"] : this._ccProtocolSelectedId,
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}

		if(this._technologySelectedId)
		{
			jsonObj.push({
				["field"] : "ccProtocolId",
				["operator"] : "EQUALS",
				["value"] : this._technologySelectedId,
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}

		if(this.durationMin || this.durationMax)
		{
			var lower = (this.durationMin) ? this.durationMin : null;
			var upper = (this.durationMax) ? this.durationMax : null;
			jsonObj.push({
				["field"] : "length",
				["operator"] : "BETWEEN_SIZE",
				["value"] : null,
				["values"] : null,
				["lower"] : lower,
				["upper"] : upper
			});			
		}
		if(this.projectsMin || this.projectsMax)
		{
			var lower = (this.projectsMin) ? this.projectsMin : null;
			var upper = (this.projectsMax) ? this.projectsMax : null;
			jsonObj.push({
				["field"] : "projectsCount",
				["operator"] : "BETWEEN_SIZE",
				["value"] : null,
				["values"] : null,
				["lower"] : lower,
				["upper"] : upper
			});				
		}
		if(this.referencesMin || this.referencesMax)
		{
			var lower = (this.referencesMin) ? this.referencesMin : null;
			var upper = (this.referencesMax) ? this.referencesMax : null;
			jsonObj.push({
				["field"] : "referencesCount",
				["operator"] : "BETWEEN_SIZE",
				["value"] : null,
				["values"] : null,
				["lower"] : lower,
				["upper"] : upper
			});				
		}		
		if(this._statusSelectedId)
		{
			jsonObj.push({
				["field"] : "status",
				["operator"] : "EQUALS",
				["value"] : this._statusSelectedId,
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}		
		if(this._targetICSelectedId)
		{
			jsonObj.push({
				["field"] : "interceptionCriteriaId",
				["operator"] : "EQUALS",
				["value"] : this._targetICSelectedId,
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}		
		if(this._capTags.length > 0)
		{
			var tagArray = [];
			for(var i = 0; i < this._capTags.length; i++)
			{
				tagArray.push(new Number(this._capTags[i].id));
			}
			jsonObj.push({
				["field"] : "Tag",
				["operator"] : "IN",
				["value"] : null,
				["values"] : tagArray,
				["lower"] : null,
				["upper"] : null				
			})
		}
		if(this._capInfos.length > 0)
		{
			var infoArrays = [];
			for(var i = 0; i < this._capInfos.length; i++)
			{
				if(!(this.capInfos[i].infoTypeName in infoArrays))
				{
					infoArrays[this.capInfos[i].infoTypeName] = [];
				}
				infoArrays[this.capInfos[i].infoTypeName].push(new Number(this.capInfos[i].infoValID));
				console.log('infoArrays: ' +  infoArrays[this.capInfos[i].infoTypeName]);
			}
			for(var info in infoArrays)
			{
				jsonObj.push({
					["field"] : info,
					["operator"] : "IN",
					["value"] : null,
					["values"] : infoArrays[info],
					["lower"] : null,
					["upper"] : null	
				})
			}
		}

		var jsonString =JSON.stringify(jsonObj);
		console.log('serializeSearchParams: ' +  jsonString);
		return jsonString;
	}

  constructor(){
    this._searchName = undefined;
    
    this._cdProtocolSelectedId = undefined;
    this._ccProtocolSelectedId = undefined;
    this._technologySelectedId = undefined;
    
    this._durationMinMax = new MinMaxNumberOption();
    this._referencesMinMax = new MinMaxNumberOption();
    this._projectsMinMax = new MinMaxNumberOption();

    this._statusSelectedId = undefined;  

    this._capTags = [];
    this._capInfos = [];
  } 
}
