import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtagComponent } from './addtag/addtag.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddpageComponent } from './addpage/addpage.component';
import { AddaddressComponent } from './addaddress/addaddress.component';

//define all routes with path and component which is used in share management section only
const routes: Routes = [
  {
    path: 'addpage',
    component: AddpageComponent
  },
  {
    path: 'addtag',
    component: AddtagComponent
  },
  {
    path: 'addcategory',
    component: AddcategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SharemanagementRoutingModule { }
