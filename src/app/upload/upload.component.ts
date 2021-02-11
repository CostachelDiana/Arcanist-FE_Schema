import { Component, OnInit } from '@angular/core';
import { ICaptureDetails } from '../project/ICapture'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  capture2Upload: ICaptureDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
