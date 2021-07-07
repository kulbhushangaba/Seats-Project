import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import { LoaderComponent } from '../loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  dia:any;
  constructor(public dialog: MatDialog) { }

  showSpinner(data)
  {
    this.dia =  this.dialog.open(LoaderComponent, {
      data: data,
      disableClose: true
    });
  }

  hideSpinner()
  {
     this.dia.close();
  }
}