import {ProjPageInfo } from './projectPageComponents'

export interface IProject {
	initProjectPage(info: ProjPageInfo ): void;
	onBEEventReceived(evtJson: string): void;
	setBEAbstraction(be: IBEAbstraction ): void;
	refresh(): void;
}

export interface IBEAbstraction {
	sendBEUpdate(beJson: string): void;
	setProject(prj: IProject): void;
}
