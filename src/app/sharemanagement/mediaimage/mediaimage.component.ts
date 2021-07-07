import { Component, OnInit, Inject,ViewChild , Input , OnChanges , Output , EventEmitter} from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { SharemanagementService } from '../sharemanagement.service';
import { DialogServiceService } from '../../services/dialog-service.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { MatGridList } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

export interface DialogData {
  type: string;
}

@Component({
  selector: 'app-mediaimage',
  templateUrl: './mediaimage.component.html',
  styleUrls: ['./mediaimage.component.scss']
})
export class MediaimageComponent implements OnInit {
  @ViewChild('grid') grid: MatGridList;
  imageUrl: any;
  medias: Array<any> = [];
  pageNo = 1;
  gridByBreakpoint = {
    xl: 6,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  }
  listdescpagescount:number;
  
    @Input() totalRecords = 0;  
    @Input() recordsPerPage = 20;  
  
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();  
  
    public pages: number [] = [];  
    activePage: number; 
  constructor(
    private observableMedia: ObservableMedia,
    public dialogRef: MatDialogRef<MediaimageComponent>,
    public loaderService: LoaderService,
    public dialog: MatDialog,
    public sharemanagementService: SharemanagementService,
    public dialogServiceService: DialogServiceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.getAllImage(1,null,1);
    this.getAllImageTotal();
  }

  onScrollDown() {
  //  this.getAllImage(1);
  }

  //get image from server based on page number and concat new data with existing data 
  getAllImage(pagenumb:number,search:string,sortby:number) {
    //this.loaderService.showSpinner("Uploading...");
    console.log(pagenumb);
    this.sharemanagementService.listImage(pagenumb,search,sortby).subscribe(data => {
    //  this.loaderService.hideSpinner();
      if (!data.error) {
        let rowdata = data.data;
        if (rowdata.length) {
          this.pageNo++;
         // this.medias = this.medias.concat(rowdata.reverse());
         this.medias = rowdata;
        }
      }
      else {
        this.dialogServiceService.showDiloag(data.message);
      }
    });
  }

  getAllImageTotal() {
    //this.loaderService.showSpinner("Uploading...");
    this.sharemanagementService.listImagetotal().subscribe(data => {
    //  this.loaderService.hideSpinner();
      if (!data.error) {
        let rowdata = data.data;
        this.listdescpagescount = data.data;
        console.log(this.listdescpagescount);
        const pageCount = this.getPageCount();  
        this.pages = this.getArrayOfPage(pageCount);  
        this.activePage = 1;  
        this.onPageChange.emit(1);
       
      }
      else {
        this.dialogServiceService.showDiloag(data.message);
      }
    });
  }

  // open popup for choosing image file form system and check image size 
  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      let filesize = (event.target.files[0].size) / 1024 / 1024;
      if (filesize < 10) {
        this.addimage(event.target.files[0]);
      }
      else {
        this.dialogServiceService.showDiloag('Image size should be not greater than 10 MB');
      }
    }
  }

  //send data to server for adding new image
  addimage(imgurl) {
    this.loaderService.showSpinner("Uploading...");
    this.sharemanagementService.addImage(imgurl).subscribe(data => {
      this.loaderService.hideSpinner();
      if (!data.error) {
        this.dialogServiceService.showDiloag(data.message);
        this.pageNo = 1;
        this.medias = [];
        this.getAllImage(1,null,1);
      }
      else {
        this.dialogServiceService.showDiloag(data.message);
      }
    });
  }

  //delete image data from server database after confirmation 
  deleteimage() {
    var imgobj = this.medias.filter(function (node) {
      return node.select == true;
    });
    if (imgobj.length) {
      const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
        data: "Do you want to delete image ?"
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          imgobj.forEach(element => {
            delete element['createdAt'];
            delete element['select'];
          });
          this.loaderService.showSpinner("Uploading...");
          this.sharemanagementService.deleteImage(imgobj).subscribe(data => {
            this.loaderService.hideSpinner();
            if (!data.error) {
              this.pageNo = 1;
              this.medias = [];
              this.getAllImage(1,null,1);
              this.dialogServiceService.showDiloag('Image has been deleted successfully');
            }
            else {
              this.dialogServiceService.showDiloag(data.message);
            }
          });
        }
      });
    }
    else {
      this.dialogServiceService.showDiloag("Select at least one image");
    }
  }

  // choose image based on single or multiple value
  selectedimage() {
    var imgobj = this.medias.filter(function (node) {
      return node.select == true;
    });
    if (imgobj.length) {
      imgobj.forEach(element => {
        delete element['createdAt'];
        delete element['select'];
      });
      switch (this.data.type) {
        case 'single':
          if (imgobj.length == 1) {
            this.dialogRef.close(imgobj);
          }
          else {
            this.dialogServiceService.showDiloag("Select only one image");
          }
          break;
        case 'multiple':
          this.dialogRef.close(imgobj);
          break;
        default:
          break;
      }
    }
    else {
      this.dialogServiceService.showDiloag("Select at least one image");
    }

  }

  // close media modal
  close() {
    this.dialogRef.close();
  }

  // config gird layout based on device screen 
  ngOnInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  private  getPageCount(): number {  
    let totalPage = 0;        
      this.totalRecords = this.listdescpagescount;
      console.log(this.totalRecords);
    if (this.totalRecords > 0 && this.recordsPerPage > 0) {  
      const pageCount = this.totalRecords / this.recordsPerPage;  
      const roundedPageCount = Math.floor(pageCount);  

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
    }  

    return totalPage;  
  }
  
  private getArrayOfPage(pageCount: number): number [] {  
    const pageArray = [];  

    if (pageCount > 0) {  
        for(let i = 1 ; i <= pageCount ; i++) {  
          pageArray.push(i);  
        }  
    }  

    return pageArray;  
  }  

  onClickPage(pageNumber: number): void {  
      if (pageNumber >= 1 && pageNumber <= this.pages.length) {  
          this.activePage = pageNumber;  
          this.onPageChange.emit(this.activePage); 
          this.getAllImage(this.activePage,null,1);
          console.log(this.activePage);
      }  
  } 

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    if(searchValue!='') {
    this.getAllImage(1,searchValue,1);
    } else {
      this.getAllImage(1,null,1);
    }
  }

  
  onOptionsSelected(sortvalue:number){
    this.getAllImage(1,null,sortvalue);
  }

}
