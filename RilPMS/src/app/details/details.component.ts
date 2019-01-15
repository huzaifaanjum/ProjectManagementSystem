import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Employee } from '../manage-employee/employee';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // retrivedData: any[];
  retrivedData = {}
  constructor(private route: ActivatedRoute, private _as : AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedEmp(params['_id']) //log the value of id
    });
    
  }


  selectedEmp(_id){
    this._as.getEmployee(_id).subscribe((res)=>{
      this.retrivedData = res as Employee[];
    });
  }


}
