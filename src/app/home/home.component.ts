import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegularExpressionLiteral } from 'typescript';
import { BackendAPIHandler } from '../common/BackendAPIHandler';
import { ProjPageInfo } from '../project/projectPageComponents';
import { AuthenticationService } from '../_services/auth.service';
import { HomePageSerializer } from './HomePageSerializer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  serializer: HomePageSerializer;
  api: BackendAPIHandler;

  public projInfo_Owner: ProjPageInfo [];  
  public projInfo_Assign: ProjPageInfo [];  
  public projInfo_Fav: ProjPageInfo[];

  constructor(private authService: AuthenticationService, private http: HttpClient) {

    this.api = new BackendAPIHandler(http);
    this.serializer = new HomePageSerializer();

    this.projInfo_Owner = []; //get from BE the list on whitch the user is Owner
    this.projInfo_Assign = []; //get from BE the list on whitch the user is Assign
    this.projInfo_Fav = []; //get from BE the list for whitch the user marked the proj as 'Favorite'

    this.requestBEProj();

    this.testInit();
  }

  ngOnInit(): void {
  }

  getLoggedInUserName() {
    let user = this.authService.getLoggedInUserName();
    if (user === null) return '';
    return user;
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
  
  private callBackProjOwner(beStr: any) {
    console.log(beStr);
    this.projInfo_Owner = this.serializer.deserializeReqProjects(beStr);
  }

  public requestBEProj() {
    console.log("Homepage: requestBEProj fct");
		
    var urlParams = new URLSearchParams(window.location.search);
		//var capID=urlParams.get('capid');
		//var beStr = this.serializer.serializeReqProjects("mihai");
    //console.log("Homepage: requestBEProj: beStr response: " + beStr);
		
    //this.api.getProjectsByOwner("mihai", this.callBackProjOwner);
    this.api.getProjects(this.callBackProjOwner);

    //this.projInfo_Owner = this.serializer.deserializeReqProjects(beStr);

	}

  

}
