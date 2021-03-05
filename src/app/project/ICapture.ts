import { TimeInterval, Timestamp } from "rxjs";

export enum eMemberRole {
    Contributor,
    ProjectOwner
}

export enum eStatus {
    Unchecked,
    Verified
}

export class Protocol {
    type: string;
    fullName: string;
  
    constructor(type:string, fullName: string) {
      this.type = type;
      this.fullName = fullName;
    }
  
  }

export class Frame {

    constructor() {}

}

export class CaptureDetails {
    id: number;
    name: string;
    protocols: Protocol[];
    type: string; //enum: CD, CC, CD&CC
    status: boolean; //enum: verified, unchecked, ...
    size: number;
    length: TimeInterval<number>;
    //uploader: IMember;
    //verifiedBy: IMember;
    //lastUpdatedBy: IMember;
    switchDate: Date;
    LIID: string;

    constructor() {}

}

export class CaptureSets{
  public captureSets: Array<CaptureDetails>;
  setName: string; //or Capture Root protocol (cs, mpd, voip) + base protocol (e.g. etsi 102 232)
  setProtocol: string; // full protocol (e.g. etsi 102 232 371-05)

  constructor(setName: string, setProtocol:string, capDetails: CaptureDetails) {
      this.captureSets = [];
      this.setName = setName;
      this.setProtocol = setProtocol;
      this.captureSets.push(capDetails);
  }

  public addSets(setName: string, setProtocol:string, captureDetails: CaptureDetails): void {
    if (this.setName != "" && this.setName == setName &&
        this.setProtocol != "" && this.setProtocol == setName) {
            this.captureSets.push(captureDetails);
        }
  }

}