
interface IProtocol {
  type: string;
  fullName: string;
}

interface IMember {
  name: string;
  surname: string;
  email: string;
}

interface IProjectDetails {
  name: string;
  id: number;
  details: string;
  creationDate: DataView;
  lastEdited: DataView;
  projectOwner: IMember;
  projectMembers: IMember[];
  protocols: IProtocol[]; 
}