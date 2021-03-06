import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {IBEAbstractionGeneric} from "../project/IProject"

import {PresetTypesInfo} from "../captureedit/CaptureStructures"
import {CaptureEditPageSerializer} from "../captureedit/CaptureEditPageSerializer"

import { Injectable } from '@angular/core'
import { ProjPageInfo } from '../project/projectPageComponents';

export interface IBEApiConsumer {
	handleBEResponse(jObj: Object, evtType: string);
}

@Injectable({
  providedIn: 'root'
})



export class BackendAPIHandler {

	API_PATH = 'http://10.164.69.90:8080/api';

	PRESET_VALUES_URL = this.API_PATH+ '/labels';
    INFO_PRESET_VALUES_URL = this.API_PATH + '/infos';
    PLAY_CAPTURES_URL = this.API_PATH + '/captures/play';
	SEARCH_CAPTURES_URL = this.API_PATH + '/captures/search';
    PROJECTS_URL = this.API_PATH + '/projects';
    SETS_URL = this.API_PATH + '/sets';
    GET_LABELS_URL = this.API_PATH + "/labels";

	GET_CAPTURE_PAGE_URL=this.API_PATH + '/captures'
	POST_UPLOAD_CAPTURE_URL=this.API_PATH + '/captures/upload'
	POST_CREATE_PROJECT_URL=this.API_PATH + '/projects'

	GET_ALL_PROJECT_URL=this.API_PATH + '/projects'

	GET_PROJECTS_URL = this.API_PATH + '/projects';
	GET_PROJECTS_OWNERS_URL = this.GET_PROJECTS_URL+ '/owner';
	GET_PROJECTS_CONTRIBUTOR_URL = this.GET_PROJECTS_URL+ '/contributor';
	
	PUT_CAPTURE_EDIT_URL = this.API_PATH + '/captures';


	presetTypes: PresetTypesInfo;
	serializer: CaptureEditPageSerializer;


	constructor(private http: HttpClient) {

		this.serializer = new CaptureEditPageSerializer();
		this.presetTypes = new PresetTypesInfo();

		var useAPI = true;
		useAPI= true;

		if (useAPI) {

		this.getPresetValues(null);
		this.getPresetInfoValues(null);
		} else {
			this.debugSendInfoPresetResponse();
			this.debugSendPresetResponse();
		}
	}

	public getPresetValues(consumer: IBEAbstractionGeneric): void {
		console.log("Requesting get preset values, accessing url "+this.PRESET_VALUES_URL);
		this.http.get<any>(this.PRESET_VALUES_URL,{responseType: 'json'}).subscribe(data => {
			// console.log("received BE Response for p vals "+JSON.stringify(data));
            // consumer.onBEDataReceived("presets-received",JSON.stringify(data));
			console.log("Received BE resposne for preset values" + JSON.stringify(data));
			this.handlePresetResponse(data);
        });
	}

	public getPresetInfoValues(consumer: IBEAbstractionGeneric): void {
		console.log("Requesting get preset values, accessing url "+this.INFO_PRESET_VALUES_URL);
		this.http.get<any>(this.INFO_PRESET_VALUES_URL,{responseType: 'json'}).subscribe(data => {
			// console.log("received BE Response for p vals "+JSON.stringify(data));
            // consumer.onBEDataReceived("info-presets-received",JSON.stringify(data));
			console.log("Received BE resposne for info values" + JSON.stringify(data));
			this.handleInfoPresetResponse(data);
        });
    }

    public playCaptures(json: string, consumer: IBEAbstractionGeneric): void {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log("play captures json " + json);
        this.http.post<any>(this.PLAY_CAPTURES_URL, json, { headers: headers, responseType: 'json' }).subscribe(data => {
            // console.log("received BE Response for p vals "+JSON.stringify(data));
            if (consumer != undefined)
                consumer.onBEDataReceived("play-capture", JSON.stringify(data));
        });
    }

	public getCapturePageById(consumer: IBEAbstractionGeneric, capID: string): void {
		var elURL = this.GET_CAPTURE_PAGE_URL+"/"+capID;
		console.log("request cap page with url "+ elURL);
		this.http.get<any>(elURL,{responseType: 'json'}).subscribe(data => {
			console.log("BEAPI: Received response with data "+JSON.stringify(data));
            consumer.onBEDataReceived("capture-page-received",JSON.stringify(data));
        }
		);
    }

    public getCaptureStreamsById(consumer: IBEAbstractionGeneric, capID: string): void {
        var elURL = this.GET_CAPTURE_PAGE_URL + "/analysis/" + capID;
        this.http.get<any>(elURL, { responseType: 'json' }).subscribe(data => {
            console.log("BEAPI: Received response with data " + JSON.stringify(data));
            consumer.onBEDataReceived("capture-streams-received", JSON.stringify(data));
        }
        );
    }

	
	public getCaptureById(consumer:IBEApiConsumer, capID:string): void {
		var elURL = this.GET_CAPTURE_PAGE_URL+"/"+capID;
		console.log("request cap page with url "+ elURL);
		this.http.get<any>(elURL,{responseType: 'json'}).subscribe(data => {
			console.log("BEAPI: Received response with data "+JSON.stringify(data));
            consumer.handleBEResponse(data,"capture-page-received");
        },
		error => {
			console.log("BEAPI: failed to retrieve capture with ID "+capID);
            consumer.handleBEResponse(error, "capture-retrieve-failed");
		}
		);
	}

	public postFileUploadRequest(consumer: IBEApiConsumer, file: File)
	{
		console.log("posting upload request for file "+file.name);
		const headers = new HttpHeaders();
		const formData: FormData = new FormData();
		formData.append('file', file, file.name);
		this.http.post<any> (this.POST_UPLOAD_CAPTURE_URL, formData, {headers: headers, responseType: 'json'}).subscribe(data => {
			
			consumer.handleBEResponse(data,"capture-uploaded");
		});

	}
	public postCreateProject(consumer: IBEApiConsumer, projectName:string)
	{
		console.log("posting create project");
		var jObj=  {
			"name" : projectName
		};

		this.http.post<any>(this.POST_CREATE_PROJECT_URL, jObj, {responseType: 'json'}).subscribe(
			data => {
				consumer.handleBEResponse(data,"project-created");
			},
			error => {
				consumer.handleBEResponse(error,"project-creation-error");
			}
		);
	}


    public captureSetCaptureSettingsUpdate(json: string, consumer: IBEAbstractionGeneric, capID: string): void {
        var elURL = this.GET_CAPTURE_PAGE_URL + "/" + capID;
        console.log("Update capture settings from set " + elURL);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.put(elURL, json, { headers: headers, responseType: 'json' }).subscribe(data => {
            // console.log("received BE Response for p vals "+JSON.stringify(data));
            if (consumer != undefined)
                consumer.onBEDataReceived("capture-set-cap-settings-update", JSON.stringify(data));
        });
    }

    public fullProjectUpdate(json: string, consumer: IBEAbstractionGeneric, projId: string): void {
        var elURL = this.PROJECTS_URL + "/" + projId;
        console.log("Update project " + elURL);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.put(projId, json, { headers: headers, responseType: 'json' }).subscribe(data => {
            // console.log("received BE Response for p vals "+JSON.stringify(data));
            if (consumer != undefined)
                consumer.onBEDataReceived("full-project-update", JSON.stringify(data));
        });
    }

    public getProjectByID(projID: string, consumer: IBEAbstractionGeneric) {
        var elURL = this.PROJECTS_URL + "/" + projID + "/full";
        console.log("request proj page with url " + elURL);
        this.http.get<any>(elURL, { responseType: 'json' }).subscribe(data => {
            console.log("received BE proj page with json " + JSON.stringify(data));
            consumer.onBEDataReceived("fetch-project-page", JSON.stringify(data));
        });
    }

    public addCaptureInSet(setId: string, captureId: string, consumer: IBEAbstractionGeneric) {
        var elURL = this.SETS_URL + "/" + setId + "/captures/" + captureId;

        this.http.post<any>(elURL, { responseType: 'json' }).subscribe(data => {
            if (consumer != undefined)
                consumer.onBEDataReceived("add-capture-in-set", JSON.stringify(data));
        });
    }

    public removeCaptureInSet(setId: string, captureId: string, consumer: IBEAbstractionGeneric) {
        var elURL = this.SETS_URL + "/" + setId + "/captures/" + captureId;

        this.http.delete<any>(elURL, { responseType: 'json' }).subscribe(data => {
            if (consumer != undefined)
                consumer.onBEDataReceived("remove-capture-in-set", JSON.stringify(data));
        });
    }

    public addCaptureSet(beJson: string, projID: string, consumer: IBEAbstractionGeneric) {
        var elURL = this.PROJECTS_URL + "/sets";
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post<any>(elURL, beJson, { headers: headers, responseType: 'json' }).subscribe(data => {
            if (consumer != undefined)
                consumer.onBEDataReceived("add-capture-set", JSON.stringify(data));
        });
    }

    public removeSetFromProject(projID: string, setId:string, consumer: IBEAbstractionGeneric) {
        var elURL = this.PROJECTS_URL + "/" + projID + "/sets/" + setId;
        this.http.delete<any>(elURL, { responseType: 'json' }).subscribe(data => {
            if (consumer != undefined)
                consumer.onBEDataReceived("remove-capture-set", JSON.stringify(data));
        });

    }

    public removeMemberFromProject(projID: string, memberId: string, consumer: IBEAbstractionGeneric)
    {
        var elURL = this.PROJECTS_URL + "/" + projID + "/contributors/" + memberId;
        this.http.delete<any>(elURL, { responseType: 'json' }).subscribe(data => {
            if (consumer != undefined)
                consumer.onBEDataReceived("remove-project-member", JSON.stringify(data));
        });
    }

    public addMemberInProject(projID: string, memberId: string, consumer: IBEAbstractionGeneric) {
        var elURL = this.PROJECTS_URL + "/" + projID + "/contributors/" + memberId;
        this.http.post<any>(elURL, { responseType: 'json' }).subscribe(data => {
            if (consumer != undefined)
                consumer.onBEDataReceived("add-project-member", JSON.stringify(data));
        });
    }

	public requestAllProjects(consumer: IBEApiConsumer) {
		this.http.get<any>(this.GET_ALL_PROJECT_URL, {responseType: 'json'}).subscribe( data => {

			consumer.handleBEResponse(data,"full-project-list");
			}
		);
	}

    public getAllLabels(consumer: IBEAbstractionGeneric) {
        this.http.get<any>(this.GET_LABELS_URL, { responseType: 'json' }).subscribe(data => {
            consumer.onBEDataReceived("get-all-labels",JSON.stringify(data));
        });
	}

	public searchCaptures(consumer: IBEApiConsumer, jsonString: string){
		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'}),
			responseType: 'json' 
		  }
		this.http.post<any>(this.SEARCH_CAPTURES_URL,jsonString, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe(data => {
            consumer.handleBEResponse(data, "search-captures-response");
        });
	}
	
	public submitCaptureChange(consumer: IBEAbstractionGeneric, capId: string, beParams:string) {
		
		console.log("submiting capture with capID "+capId+" and json " + beParams);
		var elURL = this.PUT_CAPTURE_EDIT_URL+"/"+capId;
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		this.http.put<any>(elURL,beParams, { headers: headers , responseType: 'json' }).subscribe( data =>
			{
				consumer.onBEDataReceived("update-success",JSON.stringify(data));
			});
				
	}

	handlePresetResponse(jObj : Object){
		this.serializer.deserializePresetValues(jObj,this.presetTypes);
	}
	handleInfoPresetResponse(jObj: Object) {
		this.serializer.deserializeInfoPresetValues(jObj,this.presetTypes);
	}

	// debug
	debugSendInfoPresetResponse() {
		var theJson = '{"codec":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"PCMU"},{"id":3,"displayName":"PCMA"},{"id":4,"displayName":"AMR"},{"id":5,"displayName":"AMR-WB"},{"id":6,"displayName":"EVS"}],"scenario":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Incoming Call"},{"id":3,"displayName":"Outgoing Call"},{"id":4,"displayName":"SMS"},{"id":5,"displayName":"Long SMS"},{"id":6,"displayName":"Location Update"},{"id":7,"displayName":"Busy Call"},{"id":8,"displayName":"Call Forwarding Initiating"},{"id":9,"displayName":"Call Forwarding Redirecting"}],"language":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"English"},{"id":3,"displayName":"Swahili"}],"event":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Start Cell"},{"id":3,"displayName":"Answer"},{"id":4,"displayName":"End Cell"},{"id":5,"displayName":"GPRS Attach"},{"id":6,"displayName":"GPRSD ettach"},{"id":7,"displayName":"E-Utran Attach"},{"id":8,"displayName":"E-Utran Dettach"},{"id":9,"displayName":"Hold"},{"id":10,"displayName":"Retrieve"},{"id":11,"displayName":"Waiting"},{"id":12,"displayName":"DTMF"},{"id":13,"displayName":"SMS"}]}';

		this.handleInfoPresetResponse(JSON.parse(theJson));

	}
	debugSendPresetResponse() {
		var theJson ='{"X3Protocols":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"ULIC"},{"id":3,"displayName":"plain RTP"}],"transport":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"TCP"},{"id":3,"displayName":"UDP"},{"id":4,"displayName":"FTP"}],"technology":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"CS"},{"id":3,"displayName":"MPD"},{"id":4,"displayName":"VoIP"},{"id":5,"displayName":"VoLTE"}],"tag":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Target to Target"},{"id":3,"displayName":"5G Location"},{"id":4,"displayName":"CD Only"},{"id":5,"displayName":"CC Only"},{"id":6,"displayName":"TLS 1.2"},{"id":7,"displayName":"Dynamic Codecs"}],"interceptionCriteria":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"LIID"},{"id":3,"displayName":"IMSI"},{"id":4,"displayName":"MSISDN"},{"id":5,"displayName":"IMSI"},{"id":6,"displayName":"IMEI"},{"id":7,"displayName":"ISDN"},{"id":8,"displayName":"IPv4"},{"id":9,"displayName":"IPv6"},{"id":10,"displayName":"Case ID"},{"id":11,"displayName":"SIP"}],"status":[{"id":1,"displayName":"Draft"},{"id":2,"displayName":"Unverified"},{"id":3,"displayName":"Verified"},{"id":4,"displayName":"Open for changes"}],"X2Protocols":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"ETSI 102 232-5 v331"},{"id":3,"displayName":"ETSI 33 108 v271"}]}';

		this.handlePresetResponse(JSON.parse(theJson));
	}
	
	debugSendCaptureInfoResponse() {
		var theJson ='{"uuid":"3a51c229-cb22-4fc2-9292-73d509029632","name":"Untitled Capture, 2021/03/10 10:43:05.777","status":1,"size":817772,"length":10,"notes":"capture notes","switchTime":"2021-03-10T12:35:01.968+00:00","icIdentifier":"12345678","interceptionCriteriaId":2,"technologyId":2,"ccProtocolId":2,"cdProtocolId":2,"ccTransportId":2,"cdTransportId":2,"ccPort":"5010","cdPort":"5000","lastUpdatedBy":"updator user","lastUpdatedAt":"2021-03-10T12:35:01.968+00:00","events":[{"eventId":2,"captureId":1},{"eventId":4,"captureId":1},{"eventId":6,"captureId":1},{"eventId":8,"captureId":1},{"eventId":10,"captureId":1}],"tags":[],"products":[],"scenarios":[],"codecs":[],"verifiedBy":"validator user","verifiedAt":"2021-03-10T12:35:01.968+00:00","uploadedBy":"Anonymous","uploadedAt":"2021-03-10T10:43:05.825+00:00"}';
		
		
	}

	// public getProjectsByOwner(username: string, consumer: Function): void {
	// 	var elURL = this.GET_PROJECTS_OWNERS_URL+"/"+username;
	// 	console.log("request projects owner page with url "+ elURL);
	// 	this.http.get<any>(elURL,{responseType: 'json'}).subscribe(data => {
	// 		console.log("received BE projects owner page with json "+JSON.stringify(data));
    //         consumer(data);
    //     });
	// }

	// public getProjects(consumer: Function): void {
	// 	var elURL = this.GET_PROJECTS_URL;
	// 	console.log("request projects page with url "+ elURL);
	// 	this.http.get<any>(elURL,{responseType: 'json'}).subscribe(data => {
	// 		console.log("received BE projects page with json "+JSON.stringify(data));
    //         consumer(data);
    //     });
	// }

	public getProjectsByOwner(username: string, consumer: IBEApiConsumer): void {
		var elURL = this.GET_PROJECTS_OWNERS_URL+"/"+username;
		console.log("request projects owner page with url "+ elURL);
		this.http.get<any>(elURL,{responseType: 'json'}).subscribe(data => {
			console.log("received BE projects owner page with json "+JSON.stringify(data));
	        consumer.handleBEResponse(data, "owner-project-list");
	    });
	}

	public getProjectsByContributor(username: string, consumer: IBEApiConsumer): void {
		var elURL = this.GET_PROJECTS_CONTRIBUTOR_URL+"/"+username;
		console.log("request projects contributor page with url "+ elURL);
		this.http.get<any>(elURL,{responseType: 'json'}).subscribe(data => {
			console.log("received BE projects contributor page with json "+JSON.stringify(data));
	        consumer.handleBEResponse(data, "contributor-project-list");
	    });
	}

	public getProjects(consumer: IBEApiConsumer): void {
		var elURL = this.GET_PROJECTS_URL;
		console.log("request projects page with url (handleBEResponse) "+ elURL);
		this.http.get<any>(elURL, {responseType: 'json'}).subscribe(data => {
			console.log("received BE projects page with json "+JSON.stringify(data));
            consumer.handleBEResponse(data,"full-project-list");
        });
	}
}
