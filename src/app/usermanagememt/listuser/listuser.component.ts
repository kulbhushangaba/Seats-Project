import { Component, OnInit, Input , OnChanges , Output , EventEmitter } from '@angular/core';
import { DialogServiceService } from '../../services/dialog-service.service';
import { LoaderService } from '../../services/loader.service';
import { Router, NavigationExtras } from '@angular/router';
import { UsermanagememtService } from '../usermanagememt.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  listuser = [];

  listcount:number;
  
  @Input() totalRecords = 0;  
  @Input() recordsPerPage = 10;  

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();  

  public pages: number [] = [];  
  activePage: number; 

  constructor(
    public usermanagememtService: UsermanagememtService,
    public loaderService: LoaderService,
    public dialogServiceService: DialogServiceService,
    private router: Router
  ) {
    this.getuser(0,null,1);
    this.getusersstotal();
  }

  // get user data list from server and intialize variables for shwoing data into the table
  getuser(offset:number,search:string,sortby:number) {
    this.loaderService.showSpinner("Loading...");
    this.usermanagememtService.listuser(offset,search,sortby)
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.listuser = data.data;
          //console.log(this.listuser);
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });

  }

  getusersstotal() {    
    this.usermanagememtService.listUsersTotal()
      .subscribe(data => {
        if (!data.error) {
          this.listcount = data.data;
          const pageCount = this.getPageCount();  
          console.log("Total Pages " + pageCount);
          this.pages = this.getArrayOfPage(pageCount);  
          this.activePage = 1;  
          this.onPageChange.emit(1);
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  // navigate to adduser page for editing data and pass id as query parameter in url
  edit(user) {
    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        _id: user._id
      }
    };
    this.router.navigate(['/usermanagememt/adduser'], navigationExtras);
  }

  download(){ 
    this.usermanagememtService.downloadFile(this.listuser, 'userreport'); 
  } 


  ngOnInit() {
  }

  private  getPageCount(): number {  
    let totalPage = 0;        
      this.totalRecords = this.listcount;
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
          this.getuser((this.activePage-1) *10,null,1);
          console.log(this.activePage);
      }  
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    if(searchValue!='') {
    this.getuser(0,searchValue,1);
    } else {
      this.getuser(0,null,1);
    }
  }

  onOptionsSelected(sortvalue:number){
    this.getuser(0,null,sortvalue);
  }

}
