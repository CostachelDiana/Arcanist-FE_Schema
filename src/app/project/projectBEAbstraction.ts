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
		
	}
	public setPage(page: IPage): void {
	}
	
	public onBEDataReceived(evtType: string, data: string): void {
	}
	
	
}