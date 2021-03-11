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
		if(!Array.isArray(jObj)){
			console.log("response was not an array!")
			return;
		}		

		for(var res in jObj)
		{
			var searchResult = new FullCaptureInfo();
			searchResult.setBeObj(jObj[res], this._typesInfo);
			this._searchResults.push(searchResult);
		}
	  }
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
		this._searchResults = [];

		//connect to BE
		var request = this._searchParameters.serializeSearchParams();
		console.log("Search request: "+ request);
		this.api.searchCaptures(this,request);
	
		//test without BE api
		//var json = '[{"uuid":"3a51c229-cb22-4fc2-9292-73d509029632","name":"Untitled Capture, 2021/03/10 10:43:05.777","status":1,"filepath":"Target-to-Target-origination-8157.pcap","size":817772,"length":10,"notes":"capture notes","switchTime":"2021-03-10T12:35:01.968+00:00","icIdentifier":"12345678","interceptionCriteriaId":2,"technologyId":2,"ccProtocolId":2,"cdProtocolId":2,"ccTransportId":2,"cdTransportId":2,"ccPort":"5010","cdPort":"5000","lastUpdatedBy":"updator user","lastUpdatedAt":"2021-03-10T12:35:01.968+00:00","verifiedBy":"validator user","verifiedAt":"2021-03-10T12:35:01.968+00:00","uploadedBy":"Anonymous","uploadedAt":"2021-03-10T10:43:05.825+00:00"}]';
		//var obj = JSON.parse(json);
		//this.handleBEResponse(obj,"search-captures-response");

		this._searchFinished = true;
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
		var lowerNumber : Number;
		var upperNumber : Number;

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
				["value"] : new Number(this._cdProtocolSelectedId),
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
				["value"] : new Number(this._ccProtocolSelectedId),
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}

		if(this._technologySelectedId)
		{
			jsonObj.push({
				["field"] : "technologyId",
				["operator"] : "EQUALS",
				["value"] : new Number(this._technologySelectedId),
				["values"] : null,
				["lower"] : null,
				["upper"] : null
			});
		}

		if(this.durationMin || this.durationMax)
		{
			lowerNumber = (this.durationMin) ? new Number(this.durationMin) : null;
			upperNumber = (this.durationMax) ? new Number(this.durationMax) : null;
			jsonObj.push({
				["field"] : "length",
				["operator"] : "BETWEEN_LENGTH",
				["value"] : null,
				["values"] : null,
				["lower"] : lowerNumber,
				["upper"] : upperNumber
			});			
		}
		if(this.projectsMin || this.projectsMax)
		{
			lowerNumber = (this.projectsMin) ? new Number(this.projectsMin) : null;
			upperNumber = (this.projectsMax) ? new Number(this.projectsMax) : null;
			jsonObj.push({
				["field"] : "projectsCount",
				["operator"] : "BETWEEN_SIZE",
				["value"] : null,
				["values"] : null,
				["lower"] : lowerNumber,
				["upper"] : upperNumber
			});				
		}
		if(this.referencesMin || this.referencesMax)
		{
			lowerNumber = (this.referencesMin) ? new Number(this.referencesMin) : null;
			upperNumber = (this.referencesMax) ? new Number(this.referencesMax) : null;
			jsonObj.push({
				["field"] : "referencesCount",
				["operator"] : "BETWEEN_SIZE",
				["value"] : null,
				["values"] : null,
				["lower"] : lowerNumber,
				["upper"] : upperNumber
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
