import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { Employee } from '../manage-employee/employee';
import { DetailsComponent } from '../details/details.component'
import { Project } from '../project/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  retrivedData = []
  employee = []
  topEmployees = []
  topProjects: any[];
  project: any[];
  constructor(private _as: AuthService, private _router: Router) { }

  ngOnInit() {
    this._as.getSpecialEvents().subscribe(
      res => console.log('got'),
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401 || err.status === 500){
            this._router.navigate(['/login'])
          }
          }
        }
    )

    
 this.refreshEmployeeList();


 this.refreshProjectList();

 }


 refreshEmployeeList(){
  this._as.getEmployeeList().subscribe((res)=>{
    this.retrivedData = res as Employee[];
    this.employee = this.retrivedData;
    this.topEmployees = this.retrivedData.slice(0,4)
    this.topProjects = this.topEmployees 
    // alert(JSON.stringify(this.retrivedData)) 
    // alert(JSON.stringify(this.topProjects)) 
    
let z = localStorage.getItem("userEmail")

  });  
}

refreshProjectList(){
  this._as.getProjectList().subscribe((res)=>{
    this.retrivedData = res as Project[];
    this.project = this.retrivedData;
    this.topProjects = this.retrivedData.slice(0,4)
     
    // alert(JSON.stringify(this.retrivedData)) 
    // alert(JSON.stringify(this.topProjects)) 

  });  
}


selectedEmployee(_id){
  // alert(_id)
  this._router.navigate(['/details'+`/${_id}`])
}




selectedProject(_id){
  // alert(_id)
  this._router.navigate(['/project-details'+`/${_id}`])
}

}
