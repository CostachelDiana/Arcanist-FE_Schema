import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {IBEAbstractionGeneric} from "../project/IProject"

export class BackendAPIHandler {
	
	API_PATH = 'http://10.164.69.90:8080/api';
	
	PRESET_VALUES_URL = this.API_PATH+ '/lables';
	
	constructor(private http: HttpClient) {
	}
	
	public getPresetValues(consumer: IBEAbstractionGeneric): void {
		
		this.http.get<any>(this.PRESET_VALUES_URL,{responseType: 'json'}).subscribe(data => {
            consumer.onBEDataReceived(data)
        });
	}
	
	public getPresetInfoValues(): void {
	}
}