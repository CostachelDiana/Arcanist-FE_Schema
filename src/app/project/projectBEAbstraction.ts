import {IPage,IBEAbstractionGeneric} from './IProject'
import {projectBEComStub} from './projectBEComStub'
import { HttpClient } from '@angular/common/http';

import {BackendAPIHandler} from '../common/BackendAPIHandler'

export class ProjectBEAbstraction implements IBEAbstractionGeneric {
	
	prjPage: IPage;
	
	beCommStub: projectBEComStub;
	api: BackendAPIHandler;
	
	constructor(http: HttpClient) {
		this.api = new BackendAPIHandler(http);
			
	}
	
	
	
	public sendBEUpdate(beJson: string): void {
		
		var jObj = JSON.parse(beJson);
		var evt = jObj["event-type"];
		if (evt == "request-info-presets")
		{
			this.api.getPresetValues(this);
		}
	}
	public setPage(page: IPage): void {
	}
	
	public onBEDataReceived(evtType: string, data: string): void {
		this.prjPage.onBEEventReceived(evtType,data);
	}
	
	
}