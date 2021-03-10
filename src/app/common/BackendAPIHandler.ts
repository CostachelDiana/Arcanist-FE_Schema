import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {IBEAbstractionGeneric} from "../project/IProject"

export class BackendAPIHandler {
	
	API_PATH = 'http://10.164.69.90:8080/api';
	
	PRESET_VALUES_URL = this.API_PATH+ '/labels';
	INFO_PRESET_VALUES_URL = this.API_PATH + '/infos';
	
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
            consumer.onBEDataReceived("request-info-presets",JSON.stringify(data));
        });
	}
}