import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReportComponent } from './report/report.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [
  {path:"", redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent , canActivate : [AuthGuard]},
  {path: 'details/:_id', component: DetailsComponent, canActivate : [AuthGuard]},
  {path: 'project-details/:_id', component: ProjectDetailsComponent, canActivate : [AuthGuard]},
  {path: 'report', component: ReportComponent, canActivate : [AuthGuard]},
  {path: 'manage-employee', component:ManageEmployeeComponent, canActivate : [AuthGuard]},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
