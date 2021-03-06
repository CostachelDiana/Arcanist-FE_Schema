export class InjectionSettings {
	X2Port: string;
	X2Transport: string;
	X3Port: string;
	X3Transport: string;
	clientIP: string;
}

// keeps info relevant to the capture
export class ProjPageCaptureInfo {
	captureName: string;
	captureID: string;
	captureType: string;
	captureIC: string;
	captureICVal: string;
	switchDate: string;
	injectionSet: InjectionSettings;
	captureX2Port: string;
	captureX2Transport: string;
	captureX3Port: string;
	captureX3Transport: string;
	captureX2Protocol: string;
	captureX3Protocol:string;
	captureLength: string;

	
	constructor (capName:string, id:string)
	{
		this.captureName=capName;
		this.captureID = id;
		this.injectionSet=null;
	}
	
	public setCaptureParameters(
		capType: string,
		capIC: string,
		capICVal: string,
		switchDate: string,
		capX2Port: string,
		capX2Trans:string,
		capX3Port:string,
		capX3Trans:string,
		capX2Prot:string,
		capX3Prot:string,
		capLen:string
		
	):void {
		this.captureType = capType;
		this.captureIC = capIC;
		this.captureICVal = capICVal;
		this.switchDate = switchDate;
		this.captureX2Port = capX2Port;
		this.captureX2Transport = capX2Trans;
		this.captureX2Protocol = capX2Port;
		this.captureX3Port= capX3Port;
		this.captureX3Transport = capX3Trans;
		this.captureX3Protocol = capX3Prot;		
		this.captureLength = capLen;
	}
	
	public setCaptureInjectionSettings(setts: InjectionSettings): void {
		this.injectionSet = setts;
	}
	
	public getInjectionSettings(): InjectionSettings {
		return this.injectionSet;
	}
}

// grouping of captures according to protocol 
export class CaptureSet {
	capSetName: string;
	capSetX2Protocol: string;
	capSetX3Protocol: string;
	capSetCaptures: ProjPageCaptureInfo[];
	
	constructor (name:string) {
		this.capSetCaptures = [];
		this.capSetX2Protocol="unknown";
		this.capSetX3Protocol="unknown";
	}
	public addCapture(cap: ProjPageCaptureInfo):void {
		this.capSetCaptures.push(cap);
	}
	public removeCapture(idx: number): void	{
		if (idx > -1 && idx < this.capSetCaptures.length)
		{
			this.capSetCaptures.splice(idx,1);
		}
	}
	public getCapNumber(): number {
		return this.capSetCaptures.length;
	}
	public getCaptures(): ProjPageCaptureInfo[] {
		return this.capSetCaptures;
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
	
	constructor (name:string, id : string) {	
		this.projName = name;
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