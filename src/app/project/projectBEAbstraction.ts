import {IPage,IBEAbstractionGeneric} from './IProject'
import {projectBEComStub} from './projectBEComStub'
import { HttpClient } from '@angular/common/http';

import {BackendAPIHandler} from '../common/BackendAPIHandler'

export class ProjectBEAbstraction implements IBEAbstractionGeneric {
	
	prjPage: IPage;
	
	beCommStub: projectBEComStub;
	api: BackendAPIHandler;
	
	constructor(http: HttpClient, page: IPage) {
        this.api = new BackendAPIHandler(http);
        this.prjPage = page;
	}

    public GetBackendAPI(): BackendAPIHandler {
        return this.api;
    }
	
    public sendBEUpdate(beJson: string, evt: string): void {

        if (evt == "request-info-presets") {
            this.api.getPresetValues(this);
        }
        else if (evt == "capture-set-cap-settings-update") {
            var jObj = JSON.parse(beJson);
            var capID = jObj["capture-set-id"];
            this.api.captureSetCaptureSettingsUpdate(beJson, this, capID);
        }
        else if (evt == "full-project-update") {
            var jObj = JSON.parse(beJson);
            var projID = jObj["id"];
            this.api.fullProjectUpdate(beJson, this, projID);
        }
        else if (evt == "play-capture") {
            this.api.playCaptures(beJson, this);
        }
        else if (evt == "add-capture-set")
        {
            var jObj = JSON.parse(beJson);
            var projID = jObj["projectID"];
            this.api.addCaptureSet(beJson, projID, this);
        }
        else if (evt == "request-presets")
        {
            this.api.getPresetValues(this);
        }
        else if (evt == "fetch-project-page")
        {
            var jObj = JSON.parse(beJson);
            var projID = jObj["projID"];
            this.api.getProjectByID(projID, this);
        }
        else {
            console.log("Unhandled event: " + evt);
        }
	}
	public setPage(page: IPage): void {
	}
	
	public onBEDataReceived(evtType: string, data: string): void {
		this.prjPage.onBEEventReceived(evtType,data);
	}
	
	
}
