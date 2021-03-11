
import { CaptureSet, ProjMember, ProjPageInfo} from './projectPageComponents'
import {PredefinedTypeStruct} from '../captureedit/CaptureStructures'
import { CaptureInjectInfo, CaptureInjectionSettings } from '../utils/captureInfoComponents'


export class ProjectPageEventSerializer {
	
   public serializeCaptureSettingsChange(proj: ProjPageInfo, sett: CaptureInjectionSettings[], cap: CaptureInjectInfo[],setName: string, capSetID:string): string {
		
		var jsObj={"projName" : proj.projName, 
			"projID" : proj.projID,
			"event-type": "capture-set-cap-settings-update", 
			"capture-number": sett.length, 
			"capture-set": setName,
			"capture-set-id": capSetID
		};
		
		var capIdsArr: string[];
		capIdsArr=[];
		
		for (var i=0; i < cap.length; i++)
		{
			capIdsArr.push(cap[i].captureID);
		}
		
		jsObj["injection-settings-arr"]=sett;
		jsObj["capture-ids-arr"]=capIdsArr;
		
		return JSON.stringify(jsObj);

	}
	
	public serializeFullProjectUpdate(proj: ProjPageInfo) : string 
	{
		var jsObj={"projName" : proj.projName,
		"id" : proj.projID,
		"event-type": "full-project-update",
		"details": proj.projDetails,
		"owner": proj.projOwner
		}
		
		//jsObj["project-members-arr"]=proj.projMembers;
		//jsObj["project-capture-sets-arr"]=proj.projCapSets;
		
		return JSON.stringify(jsObj);
		
	}
	
	public serializeProjectPageRequest(projID: string) : string {
		var jsObj={
			"event-type" : "fetch-project-page",
			"projID" : projID
		}
		return JSON.stringify(jsObj);
	}
	
	public serializeRequestPresetInfo() : string {
		var jsObj={
			"event-type" : "request-presets"
		}
		return JSON.stringify(jsObj);
    }

    public serializeCaptureSet(aSet: CaptureSet, projID: string): string {
        console.log("capture set id: " + aSet.capSetID);
        var jsObj = {
            "projectId": projID,
            "name": aSet.capSetName,
            "x2SetProtocolId": new Number(aSet.capSetX2Protocol),
            "x3SetProtocolId": new Number(aSet.capSetX3Protocol),
        }
        // TOD set capture set id for update?
//        "id": new Number(Math.floor(Math.random() * 100)) // TODO modify this afte BE update

        return JSON.stringify(jsObj);
    }

	public deserializePresetsReceived(jObj: Object): PredefinedTypeStruct[]
	{
		// we only care about cap transport types
		
		var rez: PredefinedTypeStruct[];
		rez = jObj["transport"];
		
		return rez;
    }

    public deserializeProject(jObj: Object): ProjPageInfo
    {
        var projInfo = new ProjPageInfo("");
        projInfo.projCreationDate = JSON.stringify(jObj["createdAt"]);
        projInfo.projDetails = jObj["details"];
        projInfo.projID = jObj["id"];
        projInfo.projLastEdit = JSON.stringify(jObj["lastUpdatedAt"]);
        projInfo.projName = jObj["name"];
        projInfo.projOwner = jObj["owner"];
        var sets = jObj["projectSetDtoList"];
        console.log("deserialize project sets: " + sets);
        projInfo.projCapSets = [];
        projInfo.projMembers = [];
        if (sets != undefined) {
            for (var i = 0; i < sets.length; i++) {
                var jSet = sets[i];
                var set = new CaptureSet(jSet["name"]);
                set.capSetID = jSet["id"];
                set.capSetX2Protocol = jSet["x2SetProtocolId"];
                set.capSetX3Protocol = jSet["x3SetProtocolId"];
                projInfo.projCapSets.push(set);
                var jCaps = jSet["captures"];
                if (jCaps != undefined) {
                    for (var j = 0; j < jCaps.length; j++) {
                        var jCap = jCaps[i];
                        var cii = new CaptureInjectInfo(jCap["name"], jCap["uuid"]);
                        cii.captureX2IP = jCap["cdIP"];
                        cii.captureX2Port = jCap["cdPort"];
                        cii.captureX2Protocol = jCap["cdProtocolId"];
                        cii.captureX2Transport = jCap["cdTransportId"];

                        cii.captureX3IP = jCap["ccIP"];
                        cii.captureX3Port = jCap["ccPort"];
                        cii.captureX3Protocol = jCap["ccProtocolId"];
                        cii.captureX3Transport = jCap["ccTransportId"];
                        set.addCapture(cii);
                    }
                }
                
            }
        }
        else
            projInfo.projCapSets = [];
        projInfo.projMembers = jObj["contributors"];
        
        return projInfo;
    } 

    public deserializeCaptureSet(jObj: Object): CaptureSet {
        var capSet = new CaptureSet(jObj["name"]);
        capSet.capSetID = jObj["id"];
        capSet.capSetX2Protocol = jObj["x2SetProtocolId"];
        capSet.capSetX3Protocol = jObj["x3SetProtocolId"];
        return capSet;
    }

/*	public deserializeProjectPageUpdate(proj: ProjPageInfo, jObj: Object): void
	{
		// dates go here
		proj.setProjectInfo("01-02-2021","03-02-2021");
		
		proj.projName= jObj["projID"];
		proj.projID= jObj["projID"];
		proj.projDetails = jObj["projDetails"];
		proj.projOwner=jObj["projOwner"];
		
		proj.projMembers =jObj["project-members-arr"];
		var capSetsArr = jObj["project-capture-sets-arr"];
		
		for (var i=0;i< capSetsArr.length;i++)
		{
			
			var capSet = new CaptureSet(capSetsArr[i]["capSetName"]);
			capSet.capSetID= "capIdPlaceholder"; // CMS id missing from sample json 
			capSet.capSetX2Protocol= capSetsArr[i]["capSetX2Protocol"];
			capSet.capSetX3Protocol= capSetsArr[i]["capSetX3Protocol"];
			capSet.capSetCaptures= capSetsArr[i]["capSetCaptures"];
			capSet.capInjectionSett= capSetsArr[i]["capInjectionSett"];			
			proj.projCapSets.push(capSet);
		}
		// console.log("CapSettArr " + JSON.stringify(capSetsArr));
		// proj.projCapSets = jObj["project-capture-sets-arr"];
		
	}*/
	
}
