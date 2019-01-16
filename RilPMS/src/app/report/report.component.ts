import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Project } from '../project/project';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  projectData : any = []
  fprojectData = []
  pcount: any 
  employeeData : any []
  constructor( private _as : AuthService ) { }

  ngOnInit() {
    this.setData()

  }

  setData(){
    this._as.getProjectList().subscribe((res)=>{
      this.projectData = res as Project[];      
      this.pcount = Object.keys(this.projectData).length 
    });
  }
}
