import { Component, OnInit, Input , OnChanges , Output , EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { DialogServiceService } from '../services/dialog-service.service';
import { SeatsService } from '../services/seats.service';

@Component({
  selector: 'app-listavailable',
  templateUrl: './listavailable.component.html',
  styleUrls: ['./listavailable.component.scss']
})
export class ListavailableComponent implements OnInit {

  listseats = [];
  listcount:number = 0;
  status:string = "A";
   
  @Input() totalRecords = 0;  
  @Input() recordsPerPage = 10;  

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();  

  public pages: number [] = [];  
  activePage: number = 0; 
  constructor(
    public loaderService: LoaderService,
    public dialogServiceService: DialogServiceService,
    private router: Router,
    private seatsService: SeatsService
  ) {
    this.getseats(this.status,0,null,1);
    this.getseatstotal();
  } 
  getseats(status:string,offset:number,search:any,sortby:number){
    this.loaderService.showSpinner("Loading...");
    this.seatsService.listseats(status,offset,search,sortby)
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.listseats = data.data;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }
  
  getseatstotal() {    
    this.seatsService.listSeatsTotal()
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
  
  
  download(){ 
      this.seatsService.downloadFile(this.listseats, 'seatsreport'); 
    } 

  // navigate to addblog page for editing data and pass id as query parameter in url
  edit(seats) {
    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        _id: seats._id
      }
    };
    this.router.navigate(['/addseat'], navigationExtras);
  }

   // delete data
   delete(seats) {
    console.log(seats);
    this.loaderService.showSpinner("Loading...");
    this.seatsService.deleteSeats(seats)
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          console.log("delete");
          this.getseats(this.status,0,null,1);
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
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
          this.getseats(this.status,(this.activePage-1) *10,null,1);
          console.log(this.activePage);
      }  
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    if(searchValue!='') {
    this.getseats(this.status,0,searchValue,1);
    } else {
      this.getseats(this.status,0,null,1);
    }
  }

  onOptionsSelected(sortvalue:number){
    this.getseats(this.status,0,null,sortvalue);
  }

}
 
