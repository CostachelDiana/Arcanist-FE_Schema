import { TimeInterval, Timestamp } from "rxjs";

export interface IProtocol {

}

export interface IFrame {

}

export interface ICaptureDetails {
    id: number;
    name: string;
    protocols: IProtocol[];
    status: boolean; //enum
    size: number;
    length: TimeInterval<number>;
    //uploader: IMember;
    //verifiedBy: IMember;
    //lastUpdatedBy: IMember;
}