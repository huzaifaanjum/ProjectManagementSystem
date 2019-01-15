import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url="http://localhost:3000/api/register";
  private _lurl="http://localhost:3000/api/login";
  private _surl="http://localhost:3000/api/dashboard";
  private _eeurl="http://localhost:3000/api/registerEmployee";
  private _geurl="http://localhost:3000/api/registeredEmployee";
  private _ueurl="http://localhost:3000/api/registeredEmployee";
  private _deurl="http://localhost:3000/api/registeredEmployee";
  private _gpurl="http://localhost:3000/api/registeredProject";
  private _epurl="http://localhost:3000/api/registerProject";
  

  constructor(private _http: HttpClient, private _router : Router) { }

  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }



  registerUser( user ){
    return this._http.post<any>(this._url, user)
  }

  loginUser( user ){
    return this._http.post<any>(this._lurl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getSpecialEvents(){
    return this._http.get<any>(this._surl)
  }


  // auth over

  registerEmployee(employee){
    return this._http.post<any>(this._eeurl, employee)
  }


  registerProject(project){
    return this._http.post<any>(this._epurl, project)
  }

// crud

getEmployeeList(){
  return this._http.get(this._geurl);
}

getProjectList(){
  return this._http.get(this._gpurl);
}

getEmployee(_id : string){
  return this._http.get(this._geurl+`/${_id}`);
}

getProject(_id : string){
  return this._http.get(this._gpurl+`/${_id}`);
}

putEmployee(emp){
  return this._http.put(this._ueurl+`/${emp._id}`, emp)
}

putProject(project){
  return this._http.put(this._gpurl+`/${project._id}`, project)
}


deleteEmployee(_id: string){
  return this._http.delete(this._deurl+`/${_id}`);
}

deleteProject(_id: string){
  return this._http.delete(this._gpurl+`/${_id}`);
}


}
