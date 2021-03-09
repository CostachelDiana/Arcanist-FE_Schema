import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import {CapProjLink, CaptureInfo, CaptureTag, FullCaptureInfo, PredefinedTypeStruct, PresetTypesInfo} from "../captureedit/CaptureStructures";
import {AddCaptureTagDialogue} from '../dialogues/AddCaptureTagDialogue'
import {AddCaptureInfoDialogue} from '../dialogues/AddCaptureInfoDialogue'
import { ProjMember } from '../project/projectPageComponents';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private _pageInited: boolean;
  private _typesInfo: PresetTypesInfo;
  private _searchParameters: SearchParameters;
  private _searchFinished: boolean;
  private _searchResults: FullCaptureInfo[];
  

  constructor(public dialogue: MatDialog) { 
    this._pageInited = false;
    this._searchFinished = false;
    this._typesInfo = new PresetTypesInfo();
    this._searchParameters = new SearchParameters();
    this._searchResults = [];
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

  public onAddCaptureInfoCallback(typeID: string, valueID: string ): void {
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

  public onAddCaptureTagCallback(tagID: string): void {
		
		for (var i=0;i<this._typesInfo.capTagList.length;i++)
		{
			if (this._typesInfo.capTagList[i].id == tagID)
			{
				var capTag = new CaptureTag();
				capTag.tagID = this._typesInfo.capTagList[i].id;
				capTag.tagName = this._typesInfo.capTagList[i].displayName;
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
    //TODO: serialize from _searchParameters & send REST request
    this.testFillSearchResults();
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
