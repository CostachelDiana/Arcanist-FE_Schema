import { Component, OnInit } from '@angular/core';
import { CaptureDetails } from '../project/ICapture'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  capture2Upload: CaptureDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
