import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SeatsRoutingModule } from './seats-routing.module';
import { ListavailableComponent } from './listavailable/listavailable.component';
import { ListreservedComponent } from './listreserved/listreserved.component';
import { ListsoldComponent } from './listsold/listsold.component';
import { AddseatComponent } from './addseat/addseat.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SeatsRoutingModule
  ],
  declarations: [
    ListavailableComponent,
    ListreservedComponent,
    ListsoldComponent,
    AddseatComponent
  ]
})
export class SeatsModule { }
