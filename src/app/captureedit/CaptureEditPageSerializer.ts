import {ProjMember} from '../project/projectPageComponents'
import {FullCaptureInfo,CapProjLink,StreamInfo,PredefinedTypeStruct} from "../captureedit/CaptureStructures"

export class CaptureEditPageSerializer {
	
	public serializeValidateCapture(info: FullCaptureInfo):string {
	}
	
	public serializeSubmitPage(info: FullCaptureInfo):string {
	}
	public serializeStreamREquest(capID: string): string {
		
	}
	public serializeRequestPresets(): string {
		var jObj={
			"event-type" : "request-presets"			
		}
	}
	public serializeRequestCapturePage(capID: string): string {
		var jObj={
			"event-type" : "request-capturePage",
			"captureID" : capID
		}
		
		return JSON.stringify(jObj);
	}
	
	// CMS debug purposes
	public presetInfo(info: PresetTypesInfo): string {
		var jObj = {
			"event-type" : "presets-received"
		}
		jObj["tags-presets-array"] = info.capTags;
	}
	
	public deserializePageInfo(info: FullCaptureInfo, Object jObj): void {
		
	}
	public deserializePresetValues(info: FullCaptureInfo, Object jObj): void {
		
	}
	public deserializeStreamInfo(Object jObj): StreamInfo[] {
		
	}
}