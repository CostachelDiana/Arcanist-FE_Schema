
export class Protocol {
  type: string;
  fullName: string;

  constructor(type:string, fullName: string) {
    this.type = type;
    this.fullName = fullName;
  }

}

export class Member {
  name: string;
  surname: string;
  email: string;
  role: string;

  constructor(name:string, surname:string, email:string, role:string) {
    this.name = name;
    this.surname = surname;
    this. email = email;
	this.role = role;
  }
}

export class InjectionSettings {
	clientIP: string;
	X2Port: string;
	X3Port: string;
}

export class CaptureInfo {
	captureName: string;
	captureType: string;
	captureX2Protocol: string;
	captureX3Protocol: string;
	captureIC: string;
	captureICVal:string;
	switchDate: Date;
	captureID: string;
	InjectionSet: InjectionSettings;
	
	constructor (capName: string, capType: string, swDate: Date, x2Prot:string, x3Prot:string, captureIC: string,captureICVal:string)
	{
		this.captureName = capName;
		this.captureType = capType;
		this.switchDate = swDate;
		this.captureX2Protocol = x2Prot;
		this.captureX3Protocol = x3Prot;
		this.captureIC = captureIC;
		this.captureICVal=captureICVal;
	}
	
	public setCaptureInjectionSettings(set: InjectionSettings)
	{
		this.InjectionSet= set;
	}
	public getInjectionSettings(): InjectionSettings {
		return this.InjectionSet;
	}
	
}

export class CaptureSet {
	name: string;
	X2protocol: string;
	X3protocol: string;
	capNumber: number;
	CapInfos: CaptureInfo[];	
	
	constructor(name: string, X2protocol:string, X3protocol:string) {
		this.name = name;
		this.X2protocol =X2protocol;
		this.X3protocol =X3protocol;
	}
	
	public setCaptureInfos(caps: CaptureInfo[]): void{
		this.CapInfos = caps;
		this.capNumber = caps.length;
	}
	public getCaptureInfos(): CaptureInfo[]{
		return this.CapInfos;
	}
}

export class ProjectDetails {
  name: string;
  id: number;
  details: string;
  creationDate: Date;
  lastEdited: Date;
  projectOwner: Member;
  projectMembers: Member[];
  protocols: Protocol[]; 
  capSets: CaptureSet[];

  constructor() {}

}
