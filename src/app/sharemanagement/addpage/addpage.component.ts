import { Component, OnInit, Inject } from '@angular/core';
import { DialogServiceService } from '../../services/dialog-service.service';
import { LoaderService } from '../../services/loader.service';
import { SharemanagementService } from '../sharemanagement.service';
import { MatDialog } from '@angular/material';
import { SharedialogComponent } from '../sharedialog/sharedialog.component';

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.scss']
})
export class AddpageComponent implements OnInit {
  pagelist = [];
  constructor(
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public sharemanagementService: SharemanagementService,
    public dialogServiceService: DialogServiceService
  ) {
    this.getpage();
  }

  getpage() {
    this.loaderService.showSpinner("Sending...");
    this.sharemanagementService.listpage()
      .subscribe(data => {
        console.log(data);
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.pagelist = data.data;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  edit(tag) {
    const dialogRef = this.dialog.open(SharedialogComponent, {
      width: '400px',
      data: {
        name: tag.page_name,
        id: tag._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.save(result);
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(SharedialogComponent, {
      width: '400px',
      data: {
        name: "",
        id: '0'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.save(result);
      }
    });
  }

  save(rowdata) {
    this.loaderService.showSpinner("Sending...");
    this.sharemanagementService.addpage(rowdata.name, rowdata.id)
      .subscribe(data => {
        console.log(data);
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.dialogServiceService.showDiloag(data.message);
          this.getpage();
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  ngOnInit() {
  }

}
