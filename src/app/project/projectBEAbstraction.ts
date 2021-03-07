import {IProject,IBEAbstraction} from './IProject'
import {projectBEComStub} from './projectBEComStub'


export class ProjectBEAbstraction implements IBEAbstraction {
	
	prjPage: IProject;
	
	beCommStub: projectBEComStub;
	
	constructor() {
	}
	
	public connect(servAddr: string, servPort: string): void {
		console.log("BE connecting to "+servAddr+" servPort");
		this.beCommStub = new projectBEComStub();
		this.beCommStub.servUpdateCback = this.onServUpdateReceivedCb.bind(this);
		this.beCommStub.simulateConnect(servAddr, servPort);
	}
	
	public request(beJson: string)
	{
		console.log("Sending request to BE "+beJson+" [EndOfRequest]");
		this.beCommStub.simulateUpdateReceived();
	}
	
	public sendBEUpdate(beJson: string): void
	{
		console.log("Be update request received!");
	}
	public setProject(prj: IProject): void
	{
		this.prjPage = prj;
	}
	
	public onServUpdateReceivedCb(jstr: string): void {
		if (this.prjPage !=null)
		{
			this.prjPage.onBEEventReceived(jstr);
		}
	}
}