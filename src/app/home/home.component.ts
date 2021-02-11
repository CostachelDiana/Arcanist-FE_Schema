import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public btnTxt: {
	  name: string,
	  idx: number
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  onClickLogin() {	}

  goToPage(pageName:string): void{
    //this.router.navigate(['${pageName}'], {});
  }
}
