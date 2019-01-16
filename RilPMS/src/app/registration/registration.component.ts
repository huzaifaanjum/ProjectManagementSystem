import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registeredUserData = {
    name: ""
  }
  constructor(private _as : AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    this._as.registerUser(this.registeredUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('uname', this.registeredUserData.name)
        this._router.navigate(['/dashboard'])
      },
      err => console.log(err)    
    )
  }

}
