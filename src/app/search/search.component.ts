import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {CaptureInfo, CaptureTag, PresetTypesInfo} from "../captureedit/CaptureStructures";
import {AddCaptureTagDialogue} from '../dialogues/AddCaptureTagDialogue'
import {AddCaptureInfoDialogue} from '../dialogues/AddCaptureInfoDialogue'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private _pageInited: boolean;
  private _typesInfo: PresetTypesInfo;
  private _searchParameters: SearchParameters;
  

  constructor(public dialogue: MatDialog) { 
    this._pageInited = false;
    this._typesInfo = new PresetTypesInfo();
    this._searchParameters = new SearchParameters();
  }

  ngOnInit(): void {
  }

  private testInit(): void {
    this._typesInfo.testInit();
  }

  get typesInfo() : PresetTypesInfo{
    return this._typesInfo;
  }

  get searchParameters() : SearchParameters{
    return this._searchParameters;
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

  public onAddCaptureInfoCallback(typeID: string, valueID: string ): void {
		var aInfo = new CaptureInfo();
		for (var i=0;i<this._typesInfo.capInfoTypesList.length;i++)
		{
			if (this._typesInfo.capInfoTypesList[i].ID == typeID)
			{
				aInfo.infoTypeID=typeID;
				aInfo.infoTypeName=this._typesInfo.capInfoTypesList[i].name;
				
				for (var j=0;j<this._typesInfo.capInfoValsList[i].length;j++)
				{
					if (this._typesInfo.capInfoValsList[i][j].ID == valueID)
					{
						aInfo.infoValID=valueID;
						aInfo.infoValName=this._typesInfo.capInfoValsList[i][j].name;
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

  public onAddCaptureTagCallback(tagID: string): void {
		
		for (var i=0;i<this._typesInfo.capTagList.length;i++)
		{
			if (this._typesInfo.capTagList[i].ID == tagID)
			{
				var capTag = new CaptureTag();
				capTag.tagID = this._typesInfo.capTagList[i].ID;
				capTag.tagName = this._typesInfo.capTagList[i].name;
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

  private _cdProtocolSelectedId: string;
  get cdProtocolSelectedId() : string{
    return this._cdProtocolSelectedId;
  }
  set cdProtocolSelectedId (selectedId : string){
    this._cdProtocolSelectedId = selectedId;
  }  

  private _ccProtocolSelectedId: string;
  get ccProtocolSelectedId() : string{
    return this._ccProtocolSelectedId;
  }
  set ccProtocolSelectedId (selectedId : string){
    this._ccProtocolSelectedId = selectedId;
  }  

  private _technologySelectedId: string;
  get technologySelectedId() : string{
    return this._technologySelectedId;
  }
  set technologySelectedId (selectedId : string){
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

  private _statusSelectedId: string;
  get statusSelectedId() : string{
    return this._statusSelectedId;
  }
  set statusSelectedId (selectedId : string){
    this._statusSelectedId = selectedId;
  } 

  private _targetICSelectedId : string;
  get targetICSelectedId() : string{
    return this._targetICSelectedId;
  }
  set targetICSelectedId (selectedId : string){
    this._targetICSelectedId = selectedId;
  } 

  private _capTags: CaptureTag[];
  get capTags(): CaptureTag[] {
		return this._capTags;
	}
	public removeCaptureTag(idx: number): void {
		 if (idx > -1 && idx < this._capTags.length)
		 {
			  this._capTags.splice(idx,1);
		 }
	}
	public addCaptureTag(aTag: CaptureTag): void {
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

  constructor(){
    this._searchName = "";
    
    this._cdProtocolSelectedId = "";
    this._ccProtocolSelectedId = "";
    this._technologySelectedId = "";
    
    this._durationMinMax = new MinMaxNumberOption();
    this._referencesMinMax = new MinMaxNumberOption();
    this._projectsMinMax = new MinMaxNumberOption();

    this._statusSelectedId = "";  

    this._capTags = [];
    this._capInfos = [];
  } 
}
