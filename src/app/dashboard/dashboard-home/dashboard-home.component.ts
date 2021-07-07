import { Component, OnInit } from '@angular/core';
import { DialogServiceService } from '../../services/dialog-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { SeatsService } from '../../services/seats.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})

export class DashboardHomeComponent implements OnInit {
  listcountAll:number = 0;
  listAvailable:number=0;
  listReserved:number=0;
  listSold:number=0;

  statusAvailable = "A";
  statusReserved = "R";
  statusSold = "S";
  constructor(public dialogServiceService: DialogServiceService,
     private router: Router,
     private seatsService: SeatsService) {
       this.getseatstotal();
       this.getAvailableseatstotal(this.statusAvailable);
       this.getReservedseatstotal(this.statusReserved);
       this.getSoldseatstotal(this.statusSold);
      }

  ngOnInit() {
   // console.log("enter");
    
  }

  getseatstotal() {    
    this.seatsService.listAllSeatsTotal()
    .subscribe(data => {
      if (!data.error) {
        this.listcountAll = data.data;
      }
      else {
        this.dialogServiceService.showDiloag(data.message);
      }
    });
  }

  getAvailableseatstotal(availableStatus:string) {    
    this.seatsService.listSeatsTotal(availableStatus)
      .subscribe(data => {
        if (!data.error) {
          this.listAvailable = data.data;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }
  getReservedseatstotal(reservedStatus:string) {    
    this.seatsService.listSeatsTotal(reservedStatus)
      .subscribe(data => {
        if (!data.error) {
          this.listReserved = data.data;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }
  getSoldseatstotal(soldStatus:string) {    
    this.seatsService.listSeatsTotal(soldStatus)
      .subscribe(data => {
        if (!data.error) {
          this.listSold = data.data;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }
  add(){
    this.router.navigate(['/addseat']);
  }

  listavailable(){
    this.router.navigate(['/listavailable']);
  }

  listreserved(){
    this.router.navigate(['/listreserved']);
  }

  listsold(){
    this.router.navigate(['/listsold']);
  }

}
