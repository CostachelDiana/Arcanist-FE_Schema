import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BackendAPIHandler,IBEApiConsumer} from "../common/BackendAPIHandler"

@Component({
  selector: 'app-project',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})

export class FirstPage implements OnInit, IBEApiConsumer {

  private fileName;
  

  showUploadError: boolean;
  isCaptureUploading: boolean;
  fileToUpload: File;
  
  constructor(private api: BackendAPIHandler, private router: Router) { 
	this.showUploadError=false;
	this.fileToUpload=null;
  }

  ngOnInit(): void {
  }

  onClickLogin() {	}

  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
    }
  }
  
  
  public onFileSelected(files: FileList) {
	  console.log("Received file selected with list size "+files.length);
	  this.fileToUpload = files.item(0);
	  this.showUploadError=false;	  
  }
  
  public onCaptureUploadClick() {	
		
	  if (this.fileToUpload !=null)
	  {
		  this.isCaptureUploading=true;
		  this.api.postFileUploadRequest(this,this.fileToUpload);
	  } else {
		  this.showUploadError=true;
	  }
  }
  public handleBEResponse(jObj: Object, evtType: string)
  {
	  if (evtType=="capture-uploaded")
	  {
		  var capID = jObj["uuid"];
		  (<HTMLElement>document.querySelector("#closeModal")).click();
		  this.router.navigateByUrl("/CaptureEdit?capid="+capID);
		  this.isCaptureUploading=false;
	  }
  }
 
  public onSubmit(): void {
    //this.fileService.upload(this.fileName, this.formGroup.get('file').value);
    //this.router.navigate(['./CaptureEdit', {fname:this.fileName}]);
  }

  public getFileName(): string{
    return this.fileName;
  }

}
