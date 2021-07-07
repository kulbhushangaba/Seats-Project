import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { ListuserComponent } from './listuser/listuser.component';

//define all routes with path and component which is used in user management section only
const routes: Routes = [
  {
    path:'adduser',
    component:AdduserComponent
  },
  {
    path:'listuser',
    component:ListuserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermanagememtRoutingModule { }
