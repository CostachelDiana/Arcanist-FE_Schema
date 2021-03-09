import {ProjMember} from '../project/projectPageComponents'
import {FullCaptureInfo,CapProjLink,StreamInfo,PredefinedTypeStruct} from "../captureedit/CaptureStructures"

export class CaptureEditPageSerializer {
	
	public serializeValidateCapture(info: FullCaptureInfo):string {
		
		var jObj={
			"event-type": "validate-capture"
		}
		
		return JSON.stringify(jObj);
	}
	
	public serializeSubmitPage(info: FullCaptureInfo):string {
		var jObj={
			"event-type" : "submit-capture-update"
		}
		
		return JSON.stringify(jObj);
	}
	public serializeStreamRequest(capID: string): string {
		
		var jObj={
			"event-type": "request-stream-info",
			"captureID" : capID
		}
		return JSON.stringify(jObj);
		
	}
	public serializeRequestPresets(): string {
		var jObj={
			"event-type" : "request-presets"			
		}
		
		return JSON.stringify(jObj);
	}
	public serializeRequestCapturePage(capID: string): string {
		var jObj={
			"event-type" : "request-capturePage",
			"captureID" : capID
		}
		
		return JSON.stringify(jObj);
	}
	
	
	
	public deserializePageInfo(Object jObj): FullCaptureInfo {
		
	}
	public deserializePresetValues(Object jObj): PresetTypesInfo {
		
	}
	public deserializeStreamInfo(Object jObj): StreamInfo[] {
		
	}
	
	// CMS debug purposes
	public serializePresetInfo(info: PresetTypesInfo): string {
		var jObj = {
			"event-type" : "presets-received"
		}
		jObj["tags-presets-array"] = info.capTagList;
		jObj["technology-presets-array"] = info.capTechnologyTypes;
		jObj["x2prots-presets-array"] = info.capX2Protos;
		jObj["x3prots-presets-array"] = info.capX3Protos;
		jObj["trans-presets-array"] = info.capTransportTypes;
		jObj["ictypes-presets-array"] = info.capICTypes;
		jObj["infotypes-preset-array"] = info.capInfoTypesList;
		jObj["infovalsmatrix-preset-array"] = info.capInfoValsList;
		
		return JSON.stringify(jObj);
	}
	
	// debug purposes
	public getHardcodedPresetJson(): string {
		var aJsonStr="";
		return aJsonStr;
	}
	public getHardcodedPageJson(): string {
		var aJsonStr="";
		return aJsonStr;
	}
	public getHardcodedStreamJson(): string {
		var aJsonStr="";
		return aJsonStr;
	}
}