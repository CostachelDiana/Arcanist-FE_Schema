import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './FirstPage.component.html',
  styleUrls: ['./FirstPage.component.css']
})
export class FirstPage implements OnInit {

  private fileName;
  private router: Router;

  constructor() { }

  ngOnInit(): void {
  }

  onClickLogin() {	}

  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
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
