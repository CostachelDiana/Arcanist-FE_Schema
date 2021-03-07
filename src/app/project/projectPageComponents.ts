export class InjectionSettings {
	X2Port: string;
	X2Transport: string;
	X3Port: string;
	X3Transport: string;
	clientIP: string;
	
	constructor () {
		this.X2Port="0000";
		this.X2Transport="TCP";
		this.X3Port="1111";
		this.X3Transport="TCP";
		this.clientIP="127.0.0.1";
	}
}

// keeps info relevant to the capture
export class ProjPageCaptureInfo {
	captureName: string;
	captureID: string;
	captureType: string;
	captureIC: string;
	captureICVal: string;
	switchDate: string;
	
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
	
}

// grouping of captures according to protocol 
export class CaptureSet {
	capSetName: string;
	capSetID:string;
	capSetX2Protocol: string;
	capSetX3Protocol: string;
	capSetCaptures: ProjPageCaptureInfo[];
	capInjectionSett: InjectionSettings[];
	
	constructor (name:string) {
		this.capSetName=name;
		this.capSetCaptures=[];
		this.capInjectionSett=[];
		this.capSetX2Protocol="unknown";
		this.capSetX3Protocol="unknown";
		
	}
	public addCapture(cap: ProjPageCaptureInfo):void {
		this.capSetCaptures.push(cap);
		var aSet = new InjectionSettings();
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
	public getCaptures(): ProjPageCaptureInfo[] {
		return this.capSetCaptures;
	}
	public getCaptureInjectionSettings(): InjectionSettings[] {
		return this.capInjectionSett;
	}
	public setNewDefaultSettings(setts: InjectionSettings[]): void {
		if (setts.length == this.capSetCaptures.length)
			this.capInjectionSett = setts;
		// CMS debug mismatch here
	}
	public updateInjectionSettings(setts: InjectionSettings, idx:number): void {
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