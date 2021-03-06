import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegularExpressionLiteral } from 'typescript';
import { BackendAPIHandler, IBEApiConsumer } from '../common/BackendAPIHandler';
import { ProjPageInfo } from '../project/projectPageComponents';
import { AuthenticationService } from '../_services/auth.service';
import { HomePageSerializer } from './HomePageSerializer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, IBEApiConsumer {

  serializer: HomePageSerializer;
  api: BackendAPIHandler;

  public projInfo_Owner: ProjPageInfo [];  
  public projInfo_Assign: ProjPageInfo [];  
  public projInfo_Fav: ProjPageInfo[];
  private avatar_text: string;

  constructor(private authService: AuthenticationService, private http: HttpClient,
    public dialogue: MatDialog) {

    this.api = new BackendAPIHandler(http);
    this.serializer = new HomePageSerializer();
    this.avatar_text = "Some quick example...";

    this.projInfo_Owner = []; //get from BE the list on whitch the user is Owner
    this.projInfo_Assign = []; //get from BE the list on whitch the user is Assign
    this.projInfo_Fav = []; //get from BE the list for whitch the user marked the proj as 'Favorite'

    this.requestBEProj();

    //this.testInit();
  }

  ngOnInit(): void {
  }

  getLoggedInUserName() {
    let user = this.authService.getLoggedInUserName();
    if (user === null) return '';
    return user;
  }

  getA_text() {
    return this.avatar_text;
  }

  testInit(): void{
    let proj = new ProjPageInfo("NameID1");
    proj.projName = "Name1";
    //this.projInfo_Owner.push(proj);
    this.projInfo_Assign.push(proj);

    proj = new ProjPageInfo("NameID2");
    proj.projName = "Name2";
    //this.projInfo_Owner.push(proj);
    this.projInfo_Assign.push(proj);
    this.projInfo_Fav.push(proj);

    proj = new ProjPageInfo("NameID3");
    proj.projName = "Name3";
    //this.projInfo_Owner.push(proj);
    this.projInfo_Assign.push(proj);

    proj = new ProjPageInfo("NameID4");
    proj.projName = "Name4";
    this.projInfo_Assign.push(proj);
    this.projInfo_Fav.push(proj);


  }

  public requestBEProj() {
    //this.api.getProjectsByOwner("mihai", this.callBackProjOwner);
    //this.api.getProjects(this.callBackProjOwner);

    //this.api.getProjects(this);
    this.api.getProjectsByOwner("mihai", this);
    this.api.getProjectsByContributor("mihai", this);
	}

  handleBEResponse(jObj: Object, evtType: string) {
    console.log("Homepage: requestBEProj: evtType response: " + evtType);
    console.log(jObj);

   // if (evtType == "full-project-list")
   //   this.projInfo_Owner = this.deserializeReqProjects(jObj);
    //else 
    if (evtType == "owner-project-list")
      this.projInfo_Owner = this.deserializeReqProjects(jObj);
    else if (evtType == "contributor-project-list")
      this.projInfo_Assign = this.deserializeReqProjects(jObj);
    
  }

  private callBackProjOwner(beStr: string) {
    console.log(beStr);
    var jObj = JSON.parse(beStr);
    this.projInfo_Owner = this.serializer.deserializeReqProjects(jObj);
  }

  public deserializeReqProjects(jObj: Object): ProjPageInfo[] {

		console.log("deserializeReqProjects" + JSON.stringify(jObj));
        var rez = [];
        if(!Array.isArray(jObj)) {
            console.log("HomePageSerializer: No array received");
            return rez;
        }

        for(var i = 0; i < jObj.length; i ++)
        {          
            var projInfo = new ProjPageInfo(jObj[i]["id"]);
            projInfo.projName = jObj[i]["name"];
            projInfo.projOwner = jObj[i]["owner"];
            projInfo.projCreationDate = jObj[i]["createdAt"];
            projInfo.projLastEdit = jObj[i]["lastUpdatedAt"];

            rez.push(projInfo);
        }

        return rez;
    }

  public onSubmitClick(msj_txt: string): void {	
    //console.log("submit btn: " + msj_txt)	;
    this.avatar_text = msj_txt;
	}
}
