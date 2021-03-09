import { Component, OnInit } from '@angular/core';
//import { CaptureDetails } from '../project/ICapture'
import { UploadedCaptureDetails } from './UploadedCapture';

@Component({
  selector: 'ngbd-accordion-static',//'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  //capture2Upload: CaptureDetails;
  upCapDetails : UploadedCaptureDetails;

  constructor() { // need to add param: (capPath: string) {
    //ask for details from BE based on capture path or smth
    this.upCapDetails = new UploadedCaptureDetails();
    this.upCapDetails.getDetails();
   }

  ngOnInit(): void {
  }

}

export class NgbdAccordionStatic {

}