import { Component, OnInit, Inject } from '@angular/core';
import { DialogServiceService } from '../../services/dialog-service.service';
import { LoaderService } from '../../services/loader.service';
import { SharemanagementService } from '../sharemanagement.service';
import { MatDialog } from '@angular/material';
import { SharedialogComponent } from '../sharedialog/sharedialog.component';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  categorylist = [];
  constructor(
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public sharemanagementService: SharemanagementService,
    public dialogServiceService: DialogServiceService
  ) {
    this.listcategory();
  }

  // get category list from server and intialize drop down category list 
  listcategory() {
    this.loaderService.showSpinner("Sending...");
    this.sharemanagementService.listcategory()
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.categorylist = data.data;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  //edit existing category
  edit(category) {
    const dialogRef = this.dialog.open(SharedialogComponent, {
      width: '400px',
      data: {
        name: category.category_name,
        id: category._id
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
    this.sharemanagementService.addcategory(rowdata.name.toLowerCase(), rowdata.id)
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.dialogServiceService.showDiloag(data.message);
          this.listcategory();
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
        this
      });
  }

  ngOnInit() {
  }

}
