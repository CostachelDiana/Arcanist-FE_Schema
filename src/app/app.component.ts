import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Arcanist-PROJ';
  index: number;
  public buttonsTexts:Array<string> = ['Login'];
  public btnTxt: {
	  name: string,
	  idx: number
  }
  private router: Router;

	constructor() { 
		this.index = 0;
	}

	onClickLogin() {
		
		this.index += 1;
	}

  goToPage(pageName:string): void{
    //this.router.navigate(['${pageName}'], {});
  }
}
