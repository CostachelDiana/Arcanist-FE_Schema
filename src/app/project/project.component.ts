import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Member, ProjectDetails, Protocol,CaptureInfo,CaptureSet,InjectionSettings } from './IProject';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})


export class ProjectComponent implements OnInit {

  private projDetails: ProjectDetails;

  constructor() { 
    //this.getProjDetails("LeoRx"); 
    this.projDetails = new ProjectDetails();
	this.initProjDetails();
  }
  
  private addTestCaptures(): void {
	 var s1 = new CaptureSet("ETSI test cap Set","ETSI 33 108 v124","ULIC");
	 s1.CapInfos=[];
	 var cap1 = new CaptureInfo("Test ETSI 33 108 cap","CD&CC",new Date(),"ETSI 33 108 v124","ULIC","LIID","333112");
	 var cap2 = new CaptureInfo("Test ETSI 33 108 capzor","CD&CC",new Date(),"ETSI 33 108 v124","ULIC","LIID","119312");
	 var cap3 = new CaptureInfo("Test ETSI 33 108 capzorila","CD",new Date(),"ETSI 33 108 v124","ULIC","PhoneNumber","8989989");
	 s1.CapInfos.push(cap1);
	 s1.CapInfos.push(cap2);
	 s1.CapInfos.push(cap3);
	 this.projDetails.capSets.push(s1);
	 
	 
	 var s2 = new CaptureSet("ETSI test cap Set","ETSI 33 108 v124","ULIC");
	 s2.CapInfos=[];
	 var cap4 = new CaptureInfo("Test Huawei CS DKBA 2016 VDFRO1","CD&CC",new Date(),"Huawei DKBA 2016","ULIC","LIID","333112");
	 var cap5 = new CaptureInfo("Test Huawei CS DKBA 2016 VDFRO2","CC",new Date(),"Huawei DKBA 2016","ULIC","LIID","119312");
	 var cap6 = new CaptureInfo("Test Huawei CS DKBA 2016 VDFRO3","CD",new Date(),"Huawei DKBA 2016","ULIC","PhoneNumber","8989989");
	 s2.CapInfos.push(cap4);
	 s2.CapInfos.push(cap5);
	 s2.CapInfos.push(cap6);
	 this.projDetails.capSets.push(s2);
  }
  private initProjDetails(): void {
	  this.projDetails.protocols =[];
	  this.projDetails.projectMembers=[];
	  this.projDetails.capSets=[];
  }
  
  private initTestData(): void {
	
	//let tempProjDetails: IProjectDetails;
    //tempProjDetails.name = "LeoRx Test";
    //this.projDetails = tempProjDetails;    
	
	
    this.projDetails.creationDate = new Date();
    this.projDetails.lastEdited = new Date();

    this.projDetails.projectOwner = new Member("John", "Doe", "john.doe@cognyte.com","Owner");
    
    this.projDetails.projectMembers.push(new Member("John", "Doe", "john.doe@cognyte.com","Owner"));

    this.projDetails.details = "4 Front End UMDs";    
    this.projDetails.protocols.push(new Protocol("CS", "ETSI 102 232 - 5"));
    this.projDetails.protocols.push(new Protocol("CS", "CALEA JSTD0025A"));

    this.projDetails.projectMembers.push(new Member("Jane", "Doe", "john.doe@cognyte.com","Contributor"));
    this.projDetails.projectMembers.push(new Member("Mirica", "Joe", "john.doe@cognyte.com","Contributor"));	
	
	this.addTestCaptures();
  }

  private getProjDetails(projName: string): void {
    
	this.projDetails.name = projName;
	/*
	this.projDetails.creationDate = new Date();
    this.projDetails.lastEdited = new Date();

    this.projDetails.projectOwner = new Member("John", "Doe", "john.doe@cognyte.com","Owner");
    this.projDetails.projectMembers = [];
    this.projDetails.projectMembers.push(new Member("John", "Doe", "john.doe@cognyte.com","Owner"));

    this.projDetails.details = "4 Front End UMDs";
    this.projDetails.protocols = [];
    this.projDetails.protocols.push(new Protocol("CS", "ETSI 102 232 - 5"));
    this.projDetails.protocols.push(new Protocol("CS", "CALEA JSTD0025A"));

    this.projDetails.projectMembers.push(new Member("Jane", "Doe", "john.doe@cognyte.com","Contributor"));
    this.projDetails.projectMembers.push(new Member("Mirica", "Joe", "john.doe@cognyte.com","Contributor"));	*/
	
	this.initTestData();

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
  
  public getCaptureSets(): CaptureSet[] {
	  return this.projDetails.capSets;
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
