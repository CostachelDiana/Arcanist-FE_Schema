import { CaptureInjectionSettings } from '../utils/captureInfoComponents'
import { CaptureInjectInfo } from '../utils/captureInfoComponents'

// grouping of captures according to protocol
export class CaptureSet {
	capSetName: string;
	capSetID:string;
	capSetX2Protocol: string;
	capSetX3Protocol: string;
	capSetCaptures: CaptureInjectInfo[];
	capInjectionSett: CaptureInjectionSettings[];
	
	constructor (name:string) {
		this.capSetName=name;
		this.capSetCaptures=[];
		this.capInjectionSett=[];
		this.capSetX2Protocol="unknown";
    		this.capSetX3Protocol = "unknown";
		this.capSetID = "FillMe";
		
	}
	public addCapture(cap: CaptureInjectInfo):void {
		this.capSetCaptures.push(cap);
		var aSet = new CaptureInjectionSettings();
		this.capInjectionSett.push(aSet);
	}
	public removeCapture(idx: number): void	{
		if (idx > -1 && idx < this.capSetCaptures.length)
		{
			this.capSetCaptures.splice(idx,1);
			this.capInjectionSett.splice(idx,1);
		}
	}
	public getCapNumber(): number {
		return this.capSetCaptures.length;
	}
	public getCaptures(): CaptureInjectInfo[] {
		return this.capSetCaptures;
	}
	public getCaptureInjectionSettings(): CaptureInjectionSettings[] {
		return this.capInjectionSett;
	}
	public setNewDefaultSettings(setts: CaptureInjectionSettings[]): void {
		if (setts.length == this.capSetCaptures.length)
			this.capInjectionSett = setts;
		// CMS debug mismatch here
	}
	public updateCaptureInjectionSettings(setts: CaptureInjectionSettings, idx:number): void {
		if (idx >-1 && idx < this.capSetCaptures.length)
		{
			this.capInjectionSett[idx] = setts;
		}
		// cms debug invalid here 
	}
}

export class ProjMember {
	
	name: string;
	surname: string;
	email: string;
	id: string;
	role: string;
	
	constructor (nm: string) {
		this.name=nm;
		this.role="Contributor";
		this.surname="";
		this.email="";
		this.id="";
	}	
}

export class ProjPageInfo {
	projName:string;
	projID: string;
	projDetails: string;
	projCreationDate: string;
	projLastEdit: string;
	projOwner: ProjMember;
	projMembers: ProjMember[];
	projCapSets: CaptureSet[];
	
	constructor (id : string) {	
	
		this.projID = id;
	}
	
	public setProjectInfo(prjCreationDate:string, prjLastEdit:string): void 
	{
		this.projCreationDate = prjCreationDate;
		this.projLastEdit = prjLastEdit;
		this.projMembers = [];
		this.projCapSets = [];
		this.projOwner = null;
	}
	
	// proj owner 
	public setProjectOwner(owner: ProjMember): void {
		this.projOwner = owner;
	}
	
	// proj members
	public addProjectMember(member: ProjMember): void {
		this.projMembers.push(member);
	}
	
	public removeProjectMember(idx: number): void {
		if (idx >-1 && idx < this.projMembers.length)
		{
			this.projMembers.splice(idx,1);
		}
	}
	public getProjectMembers(): ProjMember[] {
		return this.projMembers;
	}
	
	// capture sets
	public addCaptureSet(capSet: CaptureSet): void {
		this.projCapSets.push(capSet);
	}
	public getCaptureSetNumber(): number {
		return this.projCapSets.length;
	}
	public removeCaptureSet(idx: number): void {
		if (idx > -1 && idx < this.projCapSets.length)
		{
			this.projCapSets.splice(idx,1);
		}
	}	
	public getProjectCaptureSets(): CaptureSet[] {
		return this.projCapSets;
	}
		
}
