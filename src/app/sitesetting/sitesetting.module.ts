import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SitesettingService } from './sitesetting.service';
import { AddformComponent } from './addform/addform.component';
import { SitesettingRoutingModule } from './sitesetting-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule,
    SitesettingRoutingModule
  ],
  declarations: [AddformComponent],
  providers:[SitesettingService]
})
export class SitesettingModule { }
