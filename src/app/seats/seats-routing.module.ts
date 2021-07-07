import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListavailableComponent } from './listavailable/listavailable.component';
import { ListreservedComponent } from './listreserved/listreserved.component';
import { ListsoldComponent } from './listsold/listsold.component';
import { AddseatComponent } from './addseat/addseat.component';

const routes: Routes = [
  {
    path: 'addseat',
    component: AddseatComponent
  },
  {
    path: 'listavailable',
    component: ListavailableComponent
  },
  {
    path: 'listreserved',
    component: ListreservedComponent
  },
  {
    path: 'listsold',
    component: ListsoldComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatsRoutingModule { }
