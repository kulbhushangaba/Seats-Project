import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(public dialog: MatDialog) { }

  showDiloag(data)
  {
    this.dialog.open(DialogComponent, {
      data: data
    });
  }
}
