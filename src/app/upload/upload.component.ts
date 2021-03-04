import { Component, OnInit } from '@angular/core';
import { CaptureDetails } from '../project/ICapture'

@Component({
  selector: 'ngbd-accordion-static',//'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  capture2Upload: CaptureDetails;

  constructor() { }

  ngOnInit(): void {
  }

}

export class NgbdAccordionStatic {
  
}