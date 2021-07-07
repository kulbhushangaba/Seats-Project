import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DialogComponent } from './dialog/dialog.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { DialogServiceService } from './services/dialog-service.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { CommonService } from './services/common.service';
import { SharedialogComponent } from './sharemanagement/sharedialog/sharedialog.component';
import { MediaimageComponent } from './sharemanagement/mediaimage/mediaimage.component';
import { ConfirmationdialogComponent } from './sharemanagement/confirmationdialog/confirmationdialog.component';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { AddaddressComponent } from './sharemanagement/addaddress/addaddress.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotfoundPageComponent,
    DialogComponent,
    LoaderComponent,
    SharedialogComponent,
    MediaimageComponent,
    AddaddressComponent,
    ConfirmationdialogComponent
        
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    NgxInfiniteScrollerModule
  ],
    providers: [
    DialogServiceService,
    LoaderService,
    CommonService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }],
  entryComponents: [
    DialogComponent,
    LoaderComponent,
    SharedialogComponent,
    MediaimageComponent,
    AddaddressComponent,
    ConfirmationdialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
