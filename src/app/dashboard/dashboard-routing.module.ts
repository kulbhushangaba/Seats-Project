import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'sharemanagement', loadChildren: '../sharemanagement/sharemanagement.module#SharemanagementModule' }, 
      { path: 'usermanagememt', loadChildren: '../usermanagememt/usermanagememt.module#UsermanagememtModule' },
      { path: 'sitesetting', loadChildren: '../sitesetting/sitesetting.module#SitesettingModule' },
      { path: 'seats', loadChildren: '../seats/seats.module#SeatsModule' }     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
