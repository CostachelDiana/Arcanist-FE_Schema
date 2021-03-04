import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { CaptureDetails, CaptureSets } from './ICapture';
import { Member, ProjectDetails, Protocol } from './IProject';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  private projDetails: ProjectDetails;
  public captureSets: CaptureSets [];

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

  /*public getProjProtocols(): string{
    let tempStr = "";
    for (let protocol of this.projDetails.protocols) {
      tempStr = protocol.type + "-" + protocol.fullName;
    }
    //tempStr = this.projDetails.protocols[0].type + " " + this.projDetails.protocols[0].fullName;
    //tempStr += "   |   " + this.projDetails.protocols[1].type + " " + this.projDetails.protocols[1].fullName;
    return tempStr;
  }*/

  public getProjProtocols(): Protocol[] {
    return this.projDetails.protocols;
  }

  public getProjMembers(): Member[] {
    return this.projDetails.projectMembers;
  }

  ngOnInit(): void {
    
    this.getProjDetails("LeoRx"); 
  }

}
