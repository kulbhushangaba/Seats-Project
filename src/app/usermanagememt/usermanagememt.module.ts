import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermanagememtRoutingModule } from './usermanagememt-routing.module';
import { AdduserComponent } from './adduser/adduser.component';
import { ListuserComponent } from './listuser/listuser.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../shared/shared.module';
import { UsermanagememtService } from './usermanagememt.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule,
    UsermanagememtRoutingModule
  ],
  declarations: [AdduserComponent, ListuserComponent],
  providers:[UsermanagememtService]
})
export class UsermanagememtModule { }
