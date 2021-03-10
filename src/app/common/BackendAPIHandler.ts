import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {IBEAbstractionGeneric} from "../project/IProject"

import {PresetTypesInfo} from "../captureedit/CaptureStructures"
import {CaptureEditPageSerializer} from "../captureedit/CaptureEditPageSerializer"

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendAPIHandler {
	
	API_PATH = 'http://10.164.69.90:8080/api';
	
	PRESET_VALUES_URL = this.API_PATH+ '/labels';
    INFO_PRESET_VALUES_URL = this.API_PATH + '/infos';
    PLAY_CAPTURES_URL = this.API_PATH + '/captures/play';
	
	GET_CAPTURE_PAGE_URL=this.API_PATH + '/captures'
	
	presetTypes: PresetTypesInfo;
	serializer: CaptureEditPageSerializer;
	
	
	constructor(private http: HttpClient) {
		
		this.serializer = new CaptureEditPageSerializer();
		this.presetTypes = new PresetTypesInfo();
		
		var useAPI = true;
		useAPI= false;
		
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
			console.log("received BE cap page with json "+JSON.stringify(data));
            consumer.onBEDataReceived("capture-page-received",JSON.stringify(data));
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
}
