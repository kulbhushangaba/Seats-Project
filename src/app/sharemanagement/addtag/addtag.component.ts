import { Component, OnInit, Inject } from '@angular/core';
import { DialogServiceService } from '../../services/dialog-service.service';
import { LoaderService } from '../../services/loader.service';
import { SharemanagementService } from '../sharemanagement.service';
import { MatDialog } from '@angular/material';
import { SharedialogComponent } from '../sharedialog/sharedialog.component';

@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.scss']
})
export class AddtagComponent implements OnInit {
  taglist = [];
  constructor(
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public sharemanagementService: SharemanagementService,
    public dialogServiceService: DialogServiceService
  ) {
    this.gettag();
  }

  // get tag list from server and intialize drop down tag list 
  gettag() {
    this.loaderService.showSpinner("Sending...");
    this.sharemanagementService.listtag()
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.taglist = data.data;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  //edit existing category
  edit(tag) {
    const dialogRef = this.dialog.open(SharedialogComponent, {
      width: '400px',
      data: {
        name: tag.tag_name,
        id: tag._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  //add new category
  add() {
    const dialogRef = this.dialog.open(SharedialogComponent, {
      width: '400px',
      data: {
        name: "",
        id: '0'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save(result);
      }
    });
  }

  //send data to server for new and edit data 
  save(rowdata) {
    this.loaderService.showSpinner("Sending...");
    this.sharemanagementService.addTag(rowdata.name, rowdata.id)
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.dialogServiceService.showDiloag(data.message);
          this.gettag();
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  ngOnInit() {
  }

}
