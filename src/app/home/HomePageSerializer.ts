import { ProjPageInfo } from "../project/projectPageComponents";

export class HomePageSerializer {
	
    constructor () {}

	/* API: api/projects/owner/{username}
    
    Response pt 'Get Owned Projects'
    
    [{"id":1,"name":"string","owner":"mihai","createdBy":"mihai","lastUpdatedBy":"andrei","details":"first","createdAt":"2021-03-10T14:01:04.113+00:00",
    "lastUpdatedAt":"2021-03-10T14:01:04.113+00:00"},
    
    {"id":2,"name":"second","owner":"mihai","createdBy":"mihai","lastUpdatedBy":"andrei","details":"second","createdAt":"2021-03-10T13:58:51.878+00:00",
    "lastUpdatedAt":"2021-03-10T13:58:51.878+00:00"}] */
    
    public serializeReqProjects(username: string): string {
		
		var jObj={
            "username": username /* user.name */
          }
        //   {
		// 	"event-type": "validate-capture",
		// 	"captureID": info.capID
		// }

		return JSON.stringify(jObj);
	}

    public deserializeReqProjects(jObj: Object): ProjPageInfo[] {

        var rez = [];
        if(!Array.isArray(jObj)) {
            console.log("HomePageSerializer: No array received");
            return rez;
        }

        for(var projObj in jObj)
        {
            var projInfo = new ProjPageInfo(projObj["id"]);
            projInfo.projName = projObj["name"];
            projInfo.projOwner = projInfo["owner"];
            projInfo.projCreationDate = projInfo["createdAt"];
            projInfo.projLastEdit = projInfo["lastUpdatedAt"];

            rez.push(projInfo);
        }

        return rez;
    }

}