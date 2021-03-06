import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Employee } from './employee'

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  x = true
  
  employeeData = {}
  retrivedData = []

  constructor( private _as: AuthService ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  refreshEmployeeList(){
    this._as.getEmployeeList().subscribe((res)=>{
      this.retrivedData = res as Employee[];
    });
  }

  

  resetForm(){
    
    const z = localStorage.getItem("uname")
    this.employeeData = {
      _id: null,
      name:"",
      email: "",
      position:"",
      department:" ",
      project:"",
      seat:"",
      uname: localStorage.getItem("uname")
      
      
    }
    this.x= true

    
  }

  position = ['Project Manager', 'Technical Lead', 'Android Developer', 'IOS Developer', 'Angular Developer']
  departments = ['GetIT', 'Mobility Enterprise', 'Oil and Petrolium']
  
  submitted = false


  
  registerEmp(){
    if(this.x){

      // alert("in 1 : "+this.x)
    this._as.registerEmployee(this.employeeData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)    
    )
  
    // alert(JSON.stringify(this.employeeData))

  }
    else{ 
      this._as.putEmployee(this.employeeData).subscribe()

        // alert("in else : "+this.x)        
        this.x = true

        // alert(JSON.stringify(this.employeeData))

    } 

    this.resetForm();
    this.refreshEmployeeList();

  }



  onEdit(emp: Employee){
    this.employeeData = emp;
    // alert(JSON.stringify(this.employeeData))
    this.x = false;
  }

  onDelete(_id: string){
    if(confirm('Delete employee??') == true){
      this._as.deleteEmployee(_id).subscribe(()=>{
        this.refreshEmployeeList();
        this.resetForm();
      });
    }
  }

}

