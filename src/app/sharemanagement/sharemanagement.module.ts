import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharemanagementService } from './sharemanagement.service';
import { SharedModule } from '../shared/shared.module';
import { SharemanagementRoutingModule } from './sharemanagement-routing.module';
import { AddtagComponent } from './addtag/addtag.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddpageComponent } from './addpage/addpage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharemanagementRoutingModule
  ],
  declarations: [AddtagComponent, AddcategoryComponent, AddpageComponent],
  entryComponents: [],
  providers:[SharemanagementService]
})
export class SharemanagementModule { }
