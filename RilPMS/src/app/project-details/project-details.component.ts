import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Project } from '../project/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  retrivedData = {}
  constructor(private route: ActivatedRoute, private _as : AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedPro(params['_id']) //log the value of id
    });
    
  }

  selectedPro(_id){
    this._as.getProject(_id).subscribe((res)=>{
      this.retrivedData = res as Project[];
    });
  }




}
