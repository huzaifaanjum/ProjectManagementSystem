import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUserData = {email : "" , password : "" }
  constructor(private _as: AuthService , private _router: Router) { }

  ngOnInit() {
  }
  
  loginUser(){
    this._as.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem("uname", res.uname);
        this._router.navigate(['/dashboard'])
      },
      err => console.log(err)      
    )
  }
}
