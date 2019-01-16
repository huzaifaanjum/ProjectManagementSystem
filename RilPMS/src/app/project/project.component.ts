import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Project } from './project'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  x = true
  
  projectData = {}
  retrivedProjectData = []

  constructor( private _as: AuthService ) { }



  ngOnInit() {
    this.resetForm();
    this.refreshProjectList();
  }

  refreshProjectList(){
    this._as.getProjectList().subscribe((res)=>{
      this.retrivedProjectData = res as Project[];
    });
  }


  resetForm(){
    this.projectData = {
    _id : null,
    name : " ",
    description : "",
    owner : " ",
    startDate : " ",
    endDate : " ",
    manager : " ",
    uname: localStorage.getItem("uname")

    }
    this.x= true
  }

  submitted = false

  registerPro(){
    if(this.x){

      // alert("in 1 : "+this.x)
    this._as.registerProject(this.projectData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)    
    )
  
    // alert(JSON.stringify(this.employeeData))

  }
    else{ 
      this._as.putProject(this.projectData).subscribe()

        // alert("in else : "+this.x)        
        this.x = true

        // alert(JSON.stringify(this.employeeData))

    } 

    this.resetForm();
    this.refreshProjectList();

  }



  onEdit(pro: Project){
    this.projectData = pro;
    // alert(JSON.stringify(this.employeeData))
    this.x = false;
  }

  onDelete(_id: string){
    if(confirm('Delete employee??') == true){
      this._as.deleteProject(_id).subscribe(()=>{
        this.refreshProjectList();
        this.resetForm();
      });
    }
  }




}
