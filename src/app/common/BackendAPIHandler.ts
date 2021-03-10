import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {IBEAbstractionGeneric} from "../project/IProject"

export class BackendAPIHandler {
	
	API_PATH = 'http://10.164.69.90:8080/api';
	
	PRESET_VALUES_URL = this.API_PATH+ '/labels';
    INFO_PRESET_VALUES_URL = this.API_PATH + '/infos';
    PLAY_CAPTURES_URL = this.API_PATH + '/captures/play';
	
	GET_CAPTURE_PAGE_URL=this.API_PATH + '/captures'
	
	constructor(private http: HttpClient) {
	}
	
	public getPresetValues(consumer: IBEAbstractionGeneric): void {
		console.log("Requesting get preset values, accessing url "+this.PRESET_VALUES_URL);
		this.http.get<any>(this.PRESET_VALUES_URL,{responseType: 'json'}).subscribe(data => {
			// console.log("received BE Response for p vals "+JSON.stringify(data));
            consumer.onBEDataReceived("presets-received",JSON.stringify(data));
        });
	}
	
	public getPresetInfoValues(consumer: IBEAbstractionGeneric): void {
		console.log("Requesting get preset values, accessing url "+this.INFO_PRESET_VALUES_URL);
		this.http.get<any>(this.INFO_PRESET_VALUES_URL,{responseType: 'json'}).subscribe(data => {
			// console.log("received BE Response for p vals "+JSON.stringify(data));
            consumer.onBEDataReceived("info-presets-received",JSON.stringify(data));
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
}
