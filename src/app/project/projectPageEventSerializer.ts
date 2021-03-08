
import {InjectionSettings, ProjPageCaptureInfo, CaptureSet,ProjMember,ProjPageInfo} from './projectPageComponents'


export class ProjectPageEventSerializer {
	
	public serializeCaptureInject(proj:ProjPageInfo, sett:InjectionSettings[], cap:ProjPageCaptureInfo[], sequential: boolean, setName: string, capSetID:string ): string {
		
		var jsObj={"projName" : proj.projName, 
			"event-type": "inject-capture", 
			"projID" : proj.projID,
			"capture-number": sett.length, 
			"sequential": ""+sequential,
			"capture-set": setName,
			"capture-set-id": capSetID
			};
		
		jsObj["injection-settings-arr"] = sett;
		jsObj["capture-info-arr"] = cap;
		
		return JSON.stringify(jsObj);
	}
	
	public serializeCaptureSettingsChange(proj: ProjPageInfo, sett:InjectionSettings[], cap:ProjPageCaptureInfo[],setName: string, capSetID:string): string {
		
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
		"projID" : proj.projID,
		"event-type": "full-project-update",
		"projDetails": proj.projDetails,
		"projOwner": proj.projOwner
		}
		
		jsObj["project-members-arr"]=proj.projMembers;
		jsObj["project-capture-sets-arr"]=proj.projCapSets;
		
		return JSON.stringify(jsObj);
		
	}
	
	public serializeProjectPageRequest(projID: string) : string {
		var jsObj={
			"event-type" : "fetch-project-page",
			"projID" : projID
		}
		return JSON.stringify(jsObj);
	}
	
	public deserializeProjectPageUpdate(proj: ProjPageInfo, jObj: Object): void
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
		
	}
	
}