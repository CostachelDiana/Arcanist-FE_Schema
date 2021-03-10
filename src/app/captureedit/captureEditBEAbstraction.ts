import { HttpClient } from '@angular/common/http';

import {ProjMember} from '../project/projectPageComponents'
import {IPage, IBEAbstractionGeneric} from '../project/IProject'


import {BackendAPIHandler} from '../common/BackendAPIHandler'


export class CaptureEditBEAbstraction implements IBEAbstractionGeneric {
	
	capEditPage: IPage;
	
	api: BackendAPIHandler;
	
	constructor(http: HttpClient) {
		this.api = new BackendAPIHandler(http);
	}
	
	public sendBEUpdate(beJson: string): void {
	
		// create jObject, interpret the string, etc
		
		var jObj = JSON.parse(beJson);		
		var evtType = jObj["event-type"];		
		if (evtType == "request-stream-info")
		{
			this.debugSendRequestStreamInfo();
		} else if (evtType == "request-presets") {	
			
			this.api.getPresetValues(this);
			this.debugSendPresetResponse();
		} else if (evtType == "request-info-presets") {
			this.debugSendInfoPresetResponse();
		} else if (evtType == "request-capturePage") {
			this.debugSendCapturePageReponse();
		}
	}
	
	public setPage(page: IPage): void {
		this.capEditPage=page;
	}
	
	public onBEDataReceived(evtType: string, data: string): void {
		
		this.onBEResponseReceived(evtType,data);
	}
	
	public onBEResponseReceived(evtType:string, beResponse: string): void {
		
		this.capEditPage.onBEEventReceived(evtType,beResponse);
	}
	
	// debug 
	
	// the big info json  {"codec":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"PCMU"},{"id":3,"displayName":"PCMA"},{"id":4,"displayName":"AMR"},{"id":5,"displayName":"AMR-WB"},{"id":6,"displayName":"EVS"}],"product":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Voice"},{"id":3,"displayName":"SMS"},{"id":4,"displayName":"RAW"},{"id":5,"displayName":"NCE"},{"id":6,"displayName":"Voip"},{"id":7,"displayName":"Email"},{"id":8,"displayName":"HTTP"}],"scenario":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Incoming Call"},{"id":3,"displayName":"Outgoing Call"},{"id":4,"displayName":"SMS"},{"id":5,"displayName":"Long SMS"},{"id":6,"displayName":"Location Update"},{"id":7,"displayName":"Busy Call"},{"id":8,"displayName":"Call Forwarding Initiating"},{"id":9,"displayName":"Call Forwarding Redirecting"}],"transport":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"UDP"},{"id":3,"displayName":"TCP"},{"id":4,"displayName":"FTP"}],"technology":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"CS"},{"id":3,"displayName":"MPD"},{"id":4,"displayName":"VoIP"},{"id":5,"displayName":"VoLTE"}],"tag":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Target to Target"},{"id":3,"displayName":"X3 DTMF"},{"id":4,"displayName":"CD Only"},{"id":5,"displayName":"CC Only"},{"id":6,"displayName":"TLS 1.2"},{"id":7,"displayName":"Dynamic Codecs"}],"family":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"ETSI"},{"id":3,"displayName":"CALEA"},{"id":4,"displayName":"HUAWEI"},{"id":5,"displayName":"NOKIA"},{"id":6,"displayName":"ALCATEL LUCENT"}],"event":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Start Cell"},{"id":3,"displayName":"Answer"},{"id":4,"displayName":"End Cell"},{"id":5,"displayName":"GPRS Attach"},{"id":6,"displayName":"GPRSD ettach"},{"id":7,"displayName":"E-Utran Attach"},{"id":8,"displayName":"E-Utran Dettach"},{"id":9,"displayName":"Hold"},{"id":10,"displayName":"Retrieve"},{"id":11,"displayName":"Waiting"},{"id":12,"displayName":"DTMF"},{"id":13,"displayName":"SMS"}],"interceptionCriteria":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"LIID"},{"id":3,"displayName":"Target ID"},{"id":4,"displayName":"MSISDN"},{"id":5,"displayName":"IMSI"},{"id":6,"displayName":"IMEI"},{"id":7,"displayName":"ISDN"},{"id":8,"displayName":"IPv4"},{"id":9,"displayName":"IPv6"},{"id":10,"displayName":"Case ID"},{"id":11,"displayName":"SIP"}],"status":[{"id":1,"displayName":"Draft"},{"id":2,"displayName":"Unverified"},{"id":3,"displayName":"Verified"},{"id":4,"displayName":"Open for changes"}]}
	
	
	debugSendInfoPresetResponse() {
		var theJson = '{"codec":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"AMRA"},{"id":3,"displayName":"PCMA"},{"id":4,"displayName":"AMR"},{"id":5,"displayName":"AMR-WB"},{"id":6,"displayName":"EVS"}],"scenario":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"IncomingCall"},{"id":3,"displayName":"OutgoingCall"},{"id":4,"displayName":"SMS"},{"id":5,"displayName":"Long SMS"},{"id":6,"displayName":"Location Update"},{"id":7,"displayName":"Busy Call"},{"id":8,"displayName":"Call Forwarding Initiating"},{"id":9,"displayName":"Call Forwarding Redirecting"}],"language":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"English"},{"id":3,"displayName":"Swahili"}],"event":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"StartCell"},{"id":3,"displayName":"EndCell"},{"id":4,"displayName":"GPRSAttach"},{"id":5,"displayName":"GPRS Attach"},{"id":6,"displayName":"GPRSD ettach"},{"id":7,"displayName":"E-Utran Attach"},{"id":8,"displayName":"E-Utran Dettach"},{"id":9,"displayName":"Hold"},{"id":10,"displayName":"Retrieve"},{"id":11,"displayName":"Waiting"},{"id":12,"displayName":"DTMF"},{"id":13,"displayName":"SMS"}]}';
		
		this.onBEResponseReceived("info-presets-received",theJson);		
	}
	debugSendPresetResponse() {
		var theJson ='{"X3Protocols":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"ULIC"},{"id":3,"displayName":"plain RTP"}],"transport":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"TCP"},{"id":3,"displayName":"UDP"},{"id":4,"displayName":"FTP"}],"technology":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"CS"},{"id":3,"displayName":"MPD"},{"id":4,"displayName":"VoIP"},{"id":5,"displayName":"VoLTE"}],"tag":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"Target to Target"},{"id":3,"displayName":"5G Location"},{"id":4,"displayName":"CD Only"},{"id":5,"displayName":"CC Only"},{"id":6,"displayName":"TLS 1.2"},{"id":7,"displayName":"Dynamic Codecs"}],"interceptionCriteria":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"LIID"},{"id":3,"displayName":"IMSI"},{"id":4,"displayName":"MSISDN"},{"id":5,"displayName":"IMSI"},{"id":6,"displayName":"IMEI"},{"id":7,"displayName":"ISDN"},{"id":8,"displayName":"IPv4"},{"id":9,"displayName":"IPv6"},{"id":10,"displayName":"Case ID"},{"id":11,"displayName":"SIP"}],"status":[{"id":1,"displayName":"Draft"},{"id":2,"displayName":"Unverified"},{"id":3,"displayName":"Verified"},{"id":4,"displayName":"Open for changes"}],"X2Protocols":[{"id":1,"displayName":"Unknown"},{"id":2,"displayName":"ETSI 102 232-5 v331"},{"id":3,"displayName":"ETSI 33 108 v271"}]}';
		
		this.onBEResponseReceived("presets-received",theJson);
	}
	
	debugSendCapturePageReponse() {
		var theJson ='';
		this.onBEResponseReceived("capture-page-received",theJson);
	}
	
	debugSendRequestStreamInfo() {
		var theJson='{"event-type":"streams-received","streams-info":[{"port":"22","trans":"FTP","packets":"3322","size":"44551","protocol":"ETSI 102 232-5 v331"},{"port":"6001","trans":"TCP","packets":"6322","size":"556312","protocol":"ULIC RTP"},{"port":"8080","trans":"TCP","packets":"322","size":"5312","protocol":"HTTP"},{"port":"8080","trans":"TCP","packets":"322","size":"5312","protocol":"unknown"}]}';
		this.onBEResponseReceived("streams-received",theJson);
	}

}