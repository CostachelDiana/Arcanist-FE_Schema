import {ProjPageInfo } from './projectPageComponents'

interface IProject {
	public initProjectPage(ProjPageInfo info): void;
	public setBEAbstraction(IBEAbstraction be): void;
}

interface IBEAbstraction {
	public sendBEUpdate(ProjPageInfo info): void;
	public setProject(IProject prj): void;
}



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
  role: string; //enum: Contributor, ProjectOwner

  constructor(name:string, surname:string, email:string) {
    this.name = name;
    this.surname = surname;
    this. email = email;
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

  constructor() {}

}

// export class 
