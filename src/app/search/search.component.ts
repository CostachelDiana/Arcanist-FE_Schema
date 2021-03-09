import { Component, OnInit } from '@angular/core';
import { textSpanIntersectsWithPosition } from 'typescript';

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
    
    var jsonTest = "{\"codec\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"AMRA\"}],\"product\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"Voice\"},{\"id\":3,\"displayName\":\"Voip\"}],\"scenario\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"IncomingCall\"},{\"id\":3,\"displayName\":\"OutgoingCall\"}],\"transport\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"TCP\"},{\"id\":3,\"displayName\":\"UDP\"}],\"technology\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"CS\"},{\"id\":3,\"displayName\":\"MPD\"},{\"id\":4,\"displayName\":\"VoIP\"},{\"id\":5,\"displayName\":\"VoLTE\"}],\"tag\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"Target to Target\"},{\"id\":3,\"displayName\":\"5G Location\"}],\"family\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"ETSI\"},{\"id\":3,\"displayName\":\"CALEA\"},{\"id\":4,\"displayName\":\"HUAWEI\"},{\"id\":5,\"displayName\":\"NOKIA\"},{\"id\":6,\"displayName\":\"ALCATEL LUCENT\"}],\"event\":[{\"id\":1,\"displayName\":\"Unknown\"},{\"id\":2,\"displayName\":\"StartCell\"},{\"id\":3,\"displayName\":\"EndCell\"},{\"id\":4,\"displayName\":\"GPRSAttach\"}]}";

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

  constructor(){
    this._searchName = "";
    this._cdProtocolSelectedId = 1;
  }
}

export class SearchCdProtocolOption {
  id: number;
  displayName: string;
}

export class SearchOptions {
  public populateFromJson(jsonString: string) : void {
    var jsonObj = JSON.parse(jsonString);
    if(jsonObj["transport"])
    {
      this._cdProtocolOptions = jsonObj["transport"];
    }
  }

  private _cdProtocolOptions : SearchCdProtocolOption[];

  get cdProtocolOptions() : SearchCdProtocolOption[]{
    return this._cdProtocolOptions;
  }

}