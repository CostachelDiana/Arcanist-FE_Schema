import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BackendAPIHandler} from './common/BackendAPIHandler'

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

	constructor(private backendApi:BackendAPIHandler) { 
		this.index = 0;
	}

	onClickLogin() {
		
		this.index += 1;
	}

}
