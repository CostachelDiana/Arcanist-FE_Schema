import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService  } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model: any = {};

  invalidLogin = false;
  loginSuccess = false;
  errorMessage = 'Invalid Credentials';
  successMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService
) { }

ngOnInit() {
    sessionStorage.setItem('token', '');
}

handleLogin() {
  var x = this.authService.authenticationService(this.model.username, this.model.password);

  if (x == true) {
    this.invalidLogin = false;
    this.loginSuccess = true;
    this.successMessage = 'Login Successful.';
  }
  else {
    alert("Authentication failed.")
          this.invalidLogin = true;
          this.loginSuccess = false;
  }

/*
    let url = 'http://10.164.69.90:8080/login';
    let result = this.http.post(url, {
      username: this.model.username,
      password: this.model.password
  }).subscribe(isValid => {
      if (isValid) {
          sessionStorage.setItem(
            'token', 
            btoa(this.model.username + ':' + this.model.password)
          );
    //this.router.navigate(['']);
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      } else {
          alert("Authentication failed.")
          this.invalidLogin = true;
          this.loginSuccess = false;
      }
  });*/
}

  
}