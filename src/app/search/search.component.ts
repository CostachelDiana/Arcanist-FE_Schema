import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private _pageInited: boolean;
  private _searchOptions: SearchOptions;
  private _searchParameters: SearchParameters;
  

  constructor() { 
    this._pageInited = false;
    this._searchOptions = null;
    this._searchParameters = new SearchParameters();
  }

  ngOnInit(): void {
  }

  private testInit(): void {
    this._searchOptions = new SearchOptions();
    var jsonTest = '{"codec":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"AMRA"}],"product":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Voice"},{"id":3,"displayName":"Voip"}],"scenario":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"IncomingCall"},{"id":3,"displayName":"OutgoingCall"}],"transport":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"TCP"},{"id":3,"displayName":"UDP"}],"technology":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"CS"},{"id":3,"displayName":"MPD"},{"id":4,"displayName":"VoIP"},{"id":5,"displayName":"VoLTE"}],"tag":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Target to Target"},{"id":3,"displayName":"5G Location"}],"family":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"ETSI"},{"id":3,"displayName":"CALEA"},{"id":4,"displayName":"HUAWEI"},{"id":5,"displayName":"NOKIA"},{"id":6,"displayName":"ALCATEL LUCENT"}],"event":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"StartCell"},{"id":3,"displayName":"EndCell"},{"id":4,"displayName":"GPRSAttach"}], "status":[{"id":1,"displayName":"Any"},{"id":2,"displayName":"Draft"},{"id":3,"displayName":"Unverified"},{"id":4,"displayName":"Verified"},{"id":5,"displayName":"Open for changes"}]}'

    this._searchOptions.populateFromJson(jsonTest);
  }

  get searchOptions() : SearchOptions{
    return this._searchOptions;
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
    this.min = 0;
    this.max = 0;
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

  constructor(){
    this._searchName = "";
    
    this._cdProtocolSelectedId = 1;
    this._ccProtocolSelectedId = 1;
    this._technologySelectedId = 1;
    
    this._durationMinMax = new MinMaxNumberOption();
    this._referencesMinMax = new MinMaxNumberOption();
    this._projectsMinMax = new MinMaxNumberOption();

    this._statusSelectedId = 1;
  }
}

export class SearchOption {
  id: number;
  displayName: string;
}

export class SearchOptions {

  public populateFromJson(jsonString: string) : void {
    var jsonObj = JSON.parse(jsonString);
    this._cdProtocolOptions = jsonObj["transport"];
    this._ccProtocolOptions = jsonObj["transport"];
    this._technologyOptions = jsonObj["technology"];
    this._statusOptions = jsonObj["status"];
  }

  private _cdProtocolOptions : SearchOption[];
  get cdProtocolOptions() : SearchOption[]{
    return this._cdProtocolOptions;
  }

  private _ccProtocolOptions : SearchOption[];
  get ccProtocolOptions() : SearchOption[]{
    return this._ccProtocolOptions;
  }

  private _technologyOptions : SearchOption[];
  get technologyOptions() : SearchOption[]{
    return this._technologyOptions;
  }

  private _statusOptions : SearchOption[];
  get statusOptions() : SearchOption[]{
    return this._statusOptions;
  } 
}