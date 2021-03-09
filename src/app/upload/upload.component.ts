import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
//import { CaptureDetails } from '../project/ICapture'
import { UploadedCaptureDetails } from './UploadedCapture';

@Component({
  selector: 'ngbd-accordion-static', //'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  private filename: string;

  //capture2Upload: CaptureDetails;
  upCapDetails : UploadedCaptureDetails;

  constructor(private route: ActivatedRoute){ // need to add param: (capPath: string) {
    //ask for details from BE based on capture path or smth
    this.upCapDetails = new UploadedCaptureDetails();
    this.upCapDetails.getDetails();
   }

  ngOnInit(): void {
    rez: this.route.queryParams.subscribe(params => {
      this.filename = params['fname'];
    });
  }

  public getFileName(): string{
    return this.filename;
  }

}


export class NgbdAccordionStatic {

}