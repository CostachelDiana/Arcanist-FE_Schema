import {ProjPageInfo } from './projectPageComponents'

export interface IProject {
	initProjectPage(info: ProjPageInfo ): void;
	onBEEventReceived(evtJson: string): void;
	setBEAbstraction(be: IBEAbstraction ): void;
	refresh(): void;
}




export interface IBEAbstraction {
	sendBEUpdate(beJson: string, evtType: string): void;
	setProject(prj: IProject): void;
}

// CMS to avoid refactoring
// to be swtiched to these new interfaces
export interface IPage {
	initPage(pgJson: string): void;
	onBEEventReceived(evtType:string, evtJson: string): void;
	setBEAbstraction(be: IBEAbstractionGeneric ): void;
}

export interface IBEAbstractionGeneric {
	sendBEUpdate(beJson: string, evtType : string): void;
	setPage(page: IPage): void;
	onBEDataReceived(evtType: string, data: string): void;
}
