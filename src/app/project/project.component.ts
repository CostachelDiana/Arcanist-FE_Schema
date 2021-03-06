import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';

// import { CaptureDetails, CaptureSets } from './ICapture';
// import { Member, ProjectDetails, Protocol } from './IProject';

import {InjectionSettings, ProjPageCaptureInfo, CaptureSet,ProjMember,ProjPageInfo} from './projectPageComponents'
import {IProject, IBEAbstraction} from './IProject'


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements IProject {
	
	projInfo: ProjPageInfo ;
	BEAbs: IBEAbstraction;
	
	
	
	// initing methods
	constructor() {
		this.projInfo=null;
		this.BEAbs=null;
		
		this.testInit();
	}
	
	public testInit(): void {
		this.projInfo = new ProjPageInfo("Test Proj RX","DK3bA5");
		this.projInfo.setProjectInfo("01-02-2021","03-02-2021");
		
		this.projInfo.projOwner=new ProjMember("Marius");
		this.projInfo.projOwner.surname="Aldea";
		
		// add project members
		var aMember = new ProjMember("Daniel");
		aMember.surname="Ciotoracu";
		
		this.projInfo.projMembers.push(aMember);
		
		aMember = new ProjMember("Mihai");
		aMember.surname="Cuatu";
		this.projInfo.projMembers.push(aMember);
		
		
		var aCapSet = new CaptureSet("CS VoLTE UMD 1");
		aCapSet.capSetX2Protocol="ETSI 102 232-5 v331";
		aCapSet.capSetX3Protocol="ULIC RTP";
		
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE simple call","ADGr123");
		aCapture.captureX2Port="5001";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="6001";
		aCapture.captureX3Transport="TCP";
		aCapture.captureX3Protocol="ULIC RTP";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD&CC";
		aCapture.captureIC="LIID";
		aCapture.captureICVal="442312";
		
		aCapSet.capSetCaptures.push(aCapture);
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE location change","ADGr123");
		aCapture.captureX2Port="5005";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="0000";
		aCapture.captureX3Transport="unknown";
		aCapture.captureX3Protocol="unknown";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD";
		aCapture.captureIC="Phone";
		aCapture.captureICVal="+31332442312";
		
		aCapSet.capSetCaptures.push(aCapture);
		
		var aCapture = new ProjPageCaptureInfo("Leo CS VoLTE conference","ADGr123");
		aCapture.captureX2Port="5001";
		aCapture.captureX2Transport="TCP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="6005";
		aCapture.captureX3Transport="TCP";
		aCapture.captureX3Protocol="ULIC RTP";
		aCapture.switchDate="15-01-2011";
		aCapture.captureType="CD&CC";
		aCapture.captureIC="MSISDN";
		aCapture.captureICVal="+31332442312";
		
		aCapSet.capSetCaptures.push(aCapture);
		
		this.projInfo.projCapSets.push(aCapSet);
		
		aCapSet = new CaptureSet("MPD Orage UMD");
		aCapSet.capSetX2Protocol="ETSI 33 108 v271";
		aCapSet.capSetX3Protocol="ULIC EPS";
		
		var aCapture = new ProjPageCaptureInfo("Leo MPD Browsing","ADGr123");
		aCapture.captureX2Port="22";
		aCapture.captureX2Transport="FTP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="6001";
		aCapture.captureX3Transport="TCP";
		aCapture.captureX3Protocol="ULIC EPS";
		aCapture.switchDate="18-01-2011";
		aCapture.captureType="CD&CC";
		aCapture.captureIC="IMSI";
		aCapture.captureICVal="34312561";
		
		aCapSet.capSetCaptures.push(aCapture);
		
		var aCapture = new ProjPageCaptureInfo("Leo MPD on/off","ADGr123");
		aCapture.captureX2Port="22";
		aCapture.captureX2Transport="FTP";
		aCapture.captureX2Protocol="ETSI 102 232-5 v331";
		aCapture.captureX3Port="0000";
		aCapture.captureX3Transport="unkonwn";
		aCapture.captureX3Protocol="unknown";
		aCapture.switchDate="18-01-2011";
		aCapture.captureType="CD";
		aCapture.captureIC="IMSI";
		aCapture.captureICVal="34312561";
		
		aCapSet.capSetCaptures.push(aCapture);
		
		this.projInfo.projCapSets.push(aCapSet);
	}
	
	public initProjectPage(info: ProjPageInfo): void {
		this.projInfo = info;
	}
	
	public refresh():void {
		// nothing to do right now
	}
	public setBEAbstraction(be: IBEAbstraction): void {
		this.BEAbs = be;		
	}
	
	// button hooks
	public onAddCaptureClick(setN: number): void {
		
	}
	public onRemoveCaptureClick(setN: number, capN: number): void {
		
	}
	public onAddSetClick(): void {
		
	}
	public onRemoveSetClick(setN: number): void {
		
	}
	public onRemoveMemberClick(memN: number): void {
		
	}
	
	public onSetOwnerClick(): void {
		
	}
	
	public onCaptureInfoClick(capN: number, setN:number): void {
	}
	public onCaptureInjectClick(capN:number, setN:number): void {
	}
	public onCaptureSettingsClick(capN:number, setN:number): void {
	}
	
	public onPlayAllClick(setN: number): void {
	}
	
	public onExpandCollapseSetClick(setN: number): void {
		
	}
	
	public onSubmitChangesClick(): void {
		if (this.BEAbs !=null )
		{
			this.BEAbs.sendBEUpdate(this.projInfo);
		}
	}
	
	// debug buttons
	public onSimulateBEUpdateClick(): void {
	}
	
	// info getters / setters
	
	
	// project details 
	public getProjectName(): string {
		return this.projInfo.projName;
	}
	
	public getProjectCreationDate(): string {
		return this.projInfo.projCreationDate;
	}

	public getProjectLastEdited(): string {
		return this.projInfo.projLastEdit;
	}

	public getProjectOwnerName(): string{
		return this.projInfo.projOwner.surname + ", " +
		this.projInfo.projOwner.name;
	}

	public getProjDetails(): string{
		return this.projInfo.projDetails;
	}
	// Members 
	public getProjMembers(): ProjMember[] {
		return this.projInfo.projMembers;
	}
	
	// capture sets 
	public getProjCaptureSetsNumber(): number {
		return this.projInfo.projCapSets.length;
	}
	
	public getProjCaptureSets(): CaptureSet[] {
		return this.projInfo.projCapSets;
	}
	
}
/*
export class ProjectComponent implements IProject {

  constructor() { 

    //this.getProjDetails("LeoRx"); 
    this.projDetails = new ProjectDetails();
    
    //for testing
    this.captureSets = [];

    //first Set
    let tempSetName = "SetName: Protocol(type, RootName) CS - ETSI 102 232 - 5 ";
    let tempSetProtocol = "FullName Protocol ETSI 102 232 - 5 v331";
    let tempCapture = new CaptureDetails();
    tempCapture.name = "ETSI 102 232 DTMF Cell";
    tempCapture.type = "CD&CC";
    tempCapture.switchDate = new Date;
    tempCapture.LIID = "321123";

    this.addNewSet(tempSetName, tempSetProtocol, tempCapture);

    //second Set
    tempCapture = new CaptureDetails();
    tempCapture.name = "ETSI 102 232 Incomming Call Frame";
    tempCapture.type = "CD&CC";
    tempCapture.switchDate = new Date;
    tempCapture.LIID = "321123";
    
    this.addNewSet(tempSetName, tempSetProtocol, tempCapture);

    //third set
    tempSetName = "VoLTE  - ETSI 102 232";
    tempSetProtocol = "ETSI 102 232 - 5v 331";
    tempCapture = new CaptureDetails();
    tempCapture.name = "ETSI 102 232 DTMF Cell";
    tempCapture.type = "CD&CC";
    tempCapture.switchDate = new Date;
    tempCapture.LIID = "321123";

    this.addNewSet(tempSetName, tempSetProtocol, tempCapture);
  }

  private addNewSet(setName: string, setProtocol: string, capDetails: CaptureDetails): void {
    if (this.captureSets.length == 0) {
      this.captureSets.push(new CaptureSets(setName, setProtocol, capDetails));
    }
    else if (this.captureSets.length != 0) {
      let foundMatch = false;
      for(let item of this.captureSets) {
        if (item.setName == setName && item.setProtocol == setProtocol) {
          //add the Capture Details to the current items' array; foundMatch => true;
          foundMatch = true;
          item.captureSets.push(capDetails);
        }
      }

      if (!foundMatch) {
        // add a new capture set, as there is no match for pair (setName, setProtocol)
        this.captureSets.push(new CaptureSets(setName, setProtocol, capDetails));
      }
    }
  }

  private getProjDetails(projName: string): void {
    //let tempProjDetails: IProjectDetails;
    //tempProjDetails.name = "LeoRx Test";
    //this.projDetails = tempProjDetails;
    this.projDetails.name = projName;
    this.projDetails.creationDate = new Date();
    this.projDetails.lastEdited = new Date();

    this.projDetails.projectOwner = new Member("John", "Doe", "john.doe@cognyte.com");
    this.projDetails.projectMembers = [];
    this.projDetails.projectMembers.push(new Member("John", "Doe", "john.doe@cognyte.com"));

    this.projDetails.details = "4 Front End UMDs";
    this.projDetails.protocols = [];
    this.projDetails.protocols.push(new Protocol("CS", "ETSI 102 232 - 5"));
    this.projDetails.protocols.push(new Protocol("CS", "CALEA JSTD0025A"));

    this.projDetails.projectMembers.push(new Member("Jane", "Doe", "john.doe@cognyte.com"));
    this.projDetails.projectMembers.push(new Member("Mirica", "Jo", "john.doe@cognyte.com"));

  };

  public getProjName(): string {
    return this.projDetails.name;
  }

  public getProjCreationDate(): Date{
    return this.projDetails.creationDate;
  }

  public getProjLastEdited(): Date{
    return this.projDetails.lastEdited;
  }

  public getProjProjectOwner(): string{
    return this.projDetails.projectOwner.name + " " +
    this.projDetails.projectOwner.surname;
  }

  public getProjProjDetails(): string{
    return this.projDetails.details;
  }

 public getProjProtocols(): string{
    let tempStr = "";
    for (let protocol of this.projDetails.protocols) {
      tempStr = protocol.type + "-" + protocol.fullName;
    }
    //tempStr = this.projDetails.protocols[0].type + " " + this.projDetails.protocols[0].fullName;
    //tempStr += "   |   " + this.projDetails.protocols[1].type + " " + this.projDetails.protocols[1].fullName;
    return tempStr;
  }

  public getProjProtocols(): Protocol[] {
    return this.projDetails.protocols;
  }

  public getProjMembers(): Member[] {
    return this.projDetails.projectMembers;
  }

  ngOnInit(): void {
    
    this.getProjDetails("LeoRx"); 
  }

}*/
