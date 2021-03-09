import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {PresetTypesInfo} from "../captureedit/CaptureStructures"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private _pageInited: boolean;
  private _typesInfo: PresetTypesInfo;
  //private _searchOptions: SearchOptions;
  private _searchParameters: SearchParameters;
  

  constructor() { 
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

  constructor(){
    this._searchName = "";
    
    this._cdProtocolSelectedId = "";
    this._ccProtocolSelectedId = "";
    this._technologySelectedId = "";
    
    this._durationMinMax = new MinMaxNumberOption();
    this._referencesMinMax = new MinMaxNumberOption();
    this._projectsMinMax = new MinMaxNumberOption();

    this._statusSelectedId = "";  
  } 
}
