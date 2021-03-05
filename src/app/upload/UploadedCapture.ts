import { Time } from "@angular/common";
import { ProjPageInfo, ProjMember } from "../project/projectPageComponents";
import { Protocol } from "../project/ICapture"
import { eMemberRole, eStatus } from "../project/ICapture";

export class UploadedCaptureDetails {
    id: number;
    name: string;
    CD_Protocols: Protocol[];
    CC_Protocols: Protocol[];
    techology: Protocol[]; //enum

    size: number;
    length: Date; 
    uploader: ProjMember;
    verifiedBy: ProjMember;
    lastUpdatedBy: ProjMember;
    
    LIID: string;
    status: eStatus; 

    constructor() {}

    public getDetails() {
        this.name="ETSI 102 232 - 5 Simple Call - Leo";
        this.CD_Protocols = [];
        this.CD_Protocols.push(new Protocol("ETSI", "ETSI 102 232 - 5 v371"));
        this.CD_Protocols.push(new Protocol("ETSI", "ETSI 102 232 - 6 v381"));
        this.CD_Protocols.push(new Protocol("ETSI", "ETSI 33 108 - v271"));
        this.CD_Protocols.push(new Protocol("Huawei", "Huawei PD DKBA 2011"));
        this.CD_Protocols.push(new Protocol("Huawei", "Huawei PD DKBS 2012"));

        this.CC_Protocols = [];
        this.CC_Protocols.push(new Protocol("ULIC","ULIC EPS 40"));
        this.CC_Protocols.push(new Protocol("ULIC","ULIC EPS 60"));

        this.techology = [];
        this.techology.push(new Protocol("VoLTE", "VoLTE 5G"));
        this.techology.push(new Protocol("VoLTE", "VoLTE 4G"));

        this.size = 325.6;
        this.length = new Date()
        this.length.setHours(0,0,103);
        
        this.uploader = new ProjMember("Anonymus");
        this.verifiedBy = new ProjMember("Aldea");
        this.lastUpdatedBy = new ProjMember("Ciotoracu");
        this.status = eStatus.Verified;
    }

    
}