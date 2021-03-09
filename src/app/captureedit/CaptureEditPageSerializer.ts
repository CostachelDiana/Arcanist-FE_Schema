import {ProjMember} from '../project/projectPageComponents'
import {FullCaptureInfo,CapProjLink,StreamInfo,PresetTypesInfo} from "../captureedit/CaptureStructures"

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
	
	
	
	public deserializePageInfo(jObj : Object): FullCaptureInfo {
		
		var rez = new FullCaptureInfo();
		return rez;
		
	}
	public deserializePresetValues(jObj: Object): PresetTypesInfo {
		var rez= new PresetTypesInfo();
		
		rez.capTagList = jObj["tags-presets-array"];
		rez.capTechnologyTypes = jObj["technology-presets-array"];
		rez.capX2Protos = jObj["x2prots-presets-array"];
		rez.capX3Protos = jObj["x3prots-presets-array"];
		rez.capTransportTypes = jObj["trans-presets-array"];
		rez.capICTypes = jObj["ictypes-presets-array"];
		rez.capInfoTypesList = jObj["infotypes-preset-array"];
		rez.capInfoValsList = jObj["infovalsmatrix-preset-array"];
		return rez;
	}
	public deserializeStreamInfo(jObj: Object): StreamInfo[] {
		var rez: StreamInfo[];
		rez=jObj["streams-info"];
		return rez;
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
	
	public serializeStreams(streams: StreamInfo[]):string {
		var jObj = {
			"event-type" : "streams-received"
		}
		jObj["streams-info"] = streams;
		
		return JSON.stringify(jObj);
	}
	
	// debug purposes
	public getHardcodedPresetJson(): string {
		var aJsonStr="{\"event-type\":\"presets-received\",\"tags-presets-array\":[{\"name\":\"Target To Target\",\"ID\":\"ctagttt\"},{\"name\":\"Generated\",\"ID\":\"ctgen\"},{\"name\":\"CD Bypass\",\"ID\":\"ctcdbpass\"},{\"name\":\"TLS1.2\",\"ID\":\"cttls12\"},{\"name\":\"multiprotocol\",\"ID\":\"ctmltp\"},{\"name\":\"X3DTMF\",\"ID\":\"ctx3dtmf\"},{\"name\":\"Dynamic Codecs\",\"ID\":\"ctdcdcs\"}],\"technology-presets-array\":[{\"name\":\"VoLTE\",\"ID\":\"ptt123\"},{\"name\":\"VOIP\",\"ID\":\"ptt13\"},{\"name\":\"MPD\",\"ID\":\"ptt11\"},{\"name\":\"MPD 5G\",\"ID\":\"ptt22\"},{\"name\":\"CS\",\"ID\":\"ptt14\"}],\"x2prots-presets-array\":[{\"name\":\"Unknown\",\"ID\":\"x2tunk1\"},{\"name\":\"ETSI 33 108 v271\",\"ID\":\"x2rtp\"},{\"name\":\"ETSI 102 232-5 v331\",\"ID\":\"x2lic\"},{\"name\":\"ETSI 33 128 v152\",\"ID\":\"x2eps\"},{\"name\":\"Huawei DKBA 2011\",\"ID\":\"x2sae\"}],\"x3prots-presets-array\":[{\"name\":\"Unknown\",\"ID\":\"x3tunk1\"},{\"name\":\"plain RTP\",\"ID\":\"x3rtp\"},{\"name\":\"ULIC\",\"ID\":\"x3lic\"},{\"name\":\"ULIC EPS\",\"ID\":\"x3eps\"},{\"name\":\"Huawei SAE\",\"ID\":\"x3sae\"}],\"trans-presets-array\":[{\"name\":\"TCP\",\"ID\":\"tttcp\"},{\"name\":\"UDP\",\"ID\":\"ttudp\"},{\"name\":\"FTP\",\"ID\":\"ttftp\"},{\"name\":\"MSMQ\",\"ID\":\"ttmsmq\"},{\"name\":\"SMTP\",\"ID\":\"ttsmtp\"}],\"ictypes-presets-array\":[{\"name\":\"LIID\",\"ID\":\"ictliid\"},{\"name\":\"MSISDN\",\"ID\":\"ictmsisdn\"},{\"name\":\"IPv4\",\"ID\":\"ictipv4\"},{\"name\":\"IMSI\",\"ID\":\"ictimsi\"},{\"name\":\"IMEI\",\"ID\":\"ictimei\"},{\"name\":\"PhoneNumber\",\"ID\":\"ictphone\"}],\"infotypes-preset-array\":[{\"name\":\"Event\",\"ID\":\"citev\"},{\"name\":\"Codec\",\"ID\":\"citcdc\"},{\"name\":\"Scenario\",\"ID\":\"citsc\"},{\"name\":\"Language\",\"ID\":\"cilng\"}],\"infovalsmatrix-preset-array\":[[{\"name\":\"Bearer Activation\",\"ID\":\"cievba\"},{\"name\":\"Bearer Deactivation\",\"ID\":\"cievbd\"},{\"name\":\"Call Begin\",\"ID\":\"cievbeg\"},{\"name\":\"Location Update\",\"ID\":\"cievlocu\"},{\"name\":\"Supplementary services - conference\",\"ID\":\"cievssc\"},{\"name\":\"SMS\",\"ID\":\"cievsms\"}],[{\"name\":\"EVS\",\"ID\":\"cicdcevs\"},{\"name\":\"AMR\",\"ID\":\"cicdcamr\"},{\"name\":\"AMR-WB\",\"ID\":\"cicdcamrwb\"},{\"name\":\"G781\",\"ID\":\"cicdcg781\"},{\"name\":\"T38\",\"ID\":\"ccdt38\"},{\"name\":\"GSM8\",\"ID\":\"cdcgsm8\"}],[{\"name\":\"Simple Call - incoming\",\"ID\":\"ciscsci\"},{\"name\":\"Call Forward Initiating\",\"ID\":\"cisccfi\"},{\"name\":\"Call Forward Redirecting\",\"ID\":\"cisccfr\"},{\"name\":\"Simple Call - outgoing\",\"ID\":\"ciscsco\"},{\"name\":\"Long SMS\",\"ID\":\"ciscsms\"},{\"name\":\"Location Update\",\"ID\":\"csclocup\"}],[{\"name\":\"English\",\"ID\":\"cilngen\"},{\"name\":\"Hebrew\",\"ID\":\"cilngheb\"},{\"name\":\"Arabic\",\"ID\":\"cilngar\"},{\"name\":\"Chinese\",\"ID\":\"cilngchn\"},{\"name\":\"Russian\",\"ID\":\"cilngrus\"},{\"name\":\"Romanian\",\"ID\":\"cilngro\"}]]}";
		return aJsonStr;
	}
	public getHardcodedPageJson(): string {
		var aJsonStr="";
		return aJsonStr;
	}
	public getHardcodedStreamJson(): string {
		var aJsonStr="{\"event-type\":\"streams-received\",\"streams-info\":[{\"port\":\"22\",\"trans\":\"FTP\",\"packets\":\"3322\",\"size\":\"44551\",\"protocol\":\"ETSI 102 232-5 v331\"},{\"port\":\"6001\",\"trans\":\"TCP\",\"packets\":\"6322\",\"size\":\"556312\",\"protocol\":\"ULIC RTP\"},{\"port\":\"8080\",\"trans\":\"TCP\",\"packets\":\"322\",\"size\":\"5312\",\"protocol\":\"HTTP\"},{\"port\":\"8080\",\"trans\":\"TCP\",\"packets\":\"322\",\"size\":\"5312\",\"protocol\":\"unknown\"}]}";
		return aJsonStr;
	}
}