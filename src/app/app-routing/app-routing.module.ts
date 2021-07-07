import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { NotfoundPageComponent } from '../notfound-page/notfound-page.component';



//import { HttpStatusCode } from '@angular/common/http';

//main app routing with authguard for navigating to url based on authentication  
const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
},
{ 
  path: 'dashboard',
  canActivate: [AuthGuard],
  loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
{
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
},
{ 
  path: "404",
  component: NotfoundPageComponent
},
{ 
  path: "**", //redirect to 404 page if url did not match
  component: NotfoundPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
    providers: [AuthGuard],
    declarations: []
})

export class AppRoutingModule {}
