import {ProjMember} from '../project/projectPageComponents'
import {FullCaptureInfo,CapProjLink,StreamInfo,PresetTypesInfo} from "../captureedit/CaptureStructures"

export class CaptureEditPageSerializer {
	
	public serializeValidateCapture(info: FullCaptureInfo):string {
		
		var jObj={
			"event-type": "validate-capture",
			"captureID": info.capID
		}
		
		return JSON.stringify(jObj);
	}
	
	public serializeSubmitPage(info: FullCaptureInfo):string {
		var jObj={
			"event-type" : "submit-capture-update",
			"captureID" : info.capID
		}
		jObj["capture-tags"] = info.capTags;
		jObj["capture-infos"] = info.capInfos;
		jObj["capture-IC"] = info.capIC;
		jObj["capture-sw-date"] = info.capSwitchDate;
		jObj["capture-x2-trans"] = info.capX2Trans;
		jObj["capture-x2-protocol"] = info.capX2Protocol;
		jObj["capture-x2-port"] = info.capX2Port;
		jObj["caputre-x3-trans"] = info.capX3Trans;
		jObj["capture-x3-protocol"] = info.capX3Protocol;
		jObj["capture-x3-port"] = info.capX3Port;
		jObj["capture-technology"] = info.capTechnology;
		
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
		
		var rez= new FullCaptureInfo();
		
		var js = jObj["capture-page-info"];
		
		
		rez.capTags = js["capTags"];
		rez.capInfos = js["capInfos"];
		rez.capProjects = js["capProjects"];
		rez.capID = js["capID"];
		rez.capName= js["capName"];
		rez.capSize= js["capSize"];
		rez.capLength= js["capLength"];
		rez.capUserNotes=js["capUserNotes"];
		rez.lastUpdateDate=js["lastUpdateDate"];		
		rez.lastUpdater=js["lastUpdater"];
		rez.uploadDate=js["uploadDate"];
		rez.uploader=js["uploader"];
		rez.verifier=js["verifier"];
		rez.verifyDate=js["verifyDate"];
		rez.capX2Protocol=js["capX2Protocol"];
		rez.capX2Trans=js["capX2Trans"];
		rez.capX2Port=js["capX2Port"];
		rez.capX3Port=js["capX3Port"];
		rez.capX3Trans=js["capX3Trans"];
		rez.capX3Protocol=js["capX3Protocol"];
		rez.capTechnology=js["capTechnology"];
		rez.capStatus=js["capStatus"];
		rez.capIC=js["capIC"];
		rez.capSwitchDate=js["capSwitchDate"];
		
		
		console.log("rez is "+JSON.stringify(rez));
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
	
	public serializeFullPageInfo(info: FullCaptureInfo): string {
		var jObj = {
			"event-type" : "capture-page-received"
		}
		jObj["capture-page-info"] = info;
		
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
		var aJsonStr="{\"event-type\":\"capture-page-received\",\"capture-page-info\":{\"capTags\":[{\"tagID\":\"tgzuku\",\"tagName\":\"Target to Target\"},{\"tagID\":\"tgzuku2\",\"tagName\":\"X3 DTMF\"},{\"tagID\":\"tgzuku2\",\"tagName\":\"Dynamic Codecs\"}],\"capInfos\":[{\"infoTypeID\":\"gaga\",\"infoTypeName\":\"Event\",\"infoValID\":\"evt3312\",\"infoValName\":\"Bearer Activation\"},{\"infoTypeID\":\"gaga\",\"infoTypeName\":\"Event\",\"infoValID\":\"evt3322\",\"infoValName\":\"Incoming call\"},{\"infoTypeID\":\"gugu\",\"infoTypeName\":\"Codec\",\"infoValID\":\"cod12\",\"infoValName\":\"EVS\"},{\"infoTypeID\":\"gugu\",\"infoTypeName\":\"Codec\",\"infoValID\":\"cod13\",\"infoValName\":\"AMR-WB\"}],\"capProjects\":[{\"capSetNames\":[\"VoLTE simple call Tests\",\"VoLTE Full test\"],\"capSetIDs\":[\"adarv\",\"aggav\"],\"projName\":\"Leo RX\",\"projID\":\"da3FVAd\"},{\"capSetNames\":[\"VoLTE simple call\",\"VoLTE Regression\",\"VoLTE Operator Orange\"],\"capSetIDs\":[\"adarv\",\"aggav\",\"aggavzor\"],\"projName\":\"Zeus RX\",\"projID\":\"da3FVAd\"}],\"capID\":\"d443KAv\",\"capName\":\"Leo RX VoLTE Simple Call 1\",\"capSize\":\"32531\",\"capLength\":\"312\",\"capUserNotes\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"lastUpdateDate\":\"08.03.2021\",\"lastUpdater\":{\"name\":\"Daniel\",\"role\":\"Contributor\",\"surname\":\"Ciotoracu\",\"email\":\"daniel.ciotoracu@cognyte.com\",\"id\":\"DS341sa\"},\"uploadDate\":\"02.03.2021\",\"uploader\":{\"name\":\"Mihai\",\"role\":\"Contributor\",\"surname\":\"Cuatu\",\"email\":\"mihai.cuatu@cognyte.com\",\"id\":\"CMS69\"},\"verifier\":{\"name\":\"Stefan\",\"role\":\"Contributor\",\"surname\":\"Arnaut\",\"email\":\"stefan.arnaut@cognyte.com\",\"id\":\"SDA332\"},\"verifyDate\":\"02.05.2021\",\"capX2Protocol\":\"ETSI 102 232-5 v331\",\"capX2Trans\":\"FTP\",\"capX2Port\":\"22\",\"capX3Protocol\":\"ULIC EPS\",\"capX3Trans\":\"TCP\",\"capX3Port\":\"6001\",\"capTechnology\":{\"name\":\"VoLTE\",\"ID\":\"vlt13\"},\"capStatus\":{\"name\":\"Verified\",\"ID\":\"vrf123\"},\"capIC\":{\"infoTypeID\":\"gaga\",\"infoTypeName\":\"LIID\",\"infoValID\":\"\",\"infoValName\":\"12334\"},\"capSwitchDate\":\"15.01.2020\"}}";
		return aJsonStr;
	}
	public getHardcodedStreamJson(): string {
		var aJsonStr="{\"event-type\":\"streams-received\",\"streams-info\":[{\"port\":\"22\",\"trans\":\"FTP\",\"packets\":\"3322\",\"size\":\"44551\",\"protocol\":\"ETSI 102 232-5 v331\"},{\"port\":\"6001\",\"trans\":\"TCP\",\"packets\":\"6322\",\"size\":\"556312\",\"protocol\":\"ULIC RTP\"},{\"port\":\"8080\",\"trans\":\"TCP\",\"packets\":\"322\",\"size\":\"5312\",\"protocol\":\"HTTP\"},{\"port\":\"8080\",\"trans\":\"TCP\",\"packets\":\"322\",\"size\":\"5312\",\"protocol\":\"unknown\"}]}";
		return aJsonStr;
	}
}