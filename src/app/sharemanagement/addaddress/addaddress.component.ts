import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';
import { DialogServiceService } from '../../services/dialog-service.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SharemanagementService } from '../sharemanagement.service';

export interface DialogData {
  address: string;
  landmark:string;
  phone:number;
  pin_code:number;
  state:any;
  country:any;
  city:any;
}

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.scss']
})
export class AddaddressComponent implements OnInit {
  statelist = [];
  citylist = [];
  countrylist = [{
    country_id: 101,
    name: "India"
  }];
  adduser: FormGroup;
  params: any;
  selectedstate: any;
  selectedcountry:any;
  selectedcity:any;
  updateData:any;
  constructor(
    public loaderService: LoaderService,
    public dialogRef: MatDialogRef<AddaddressComponent>,
    public sharemanagementService: SharemanagementService,
    public dialogServiceService: DialogServiceService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log("in model",data);
    this.updateData = data;
    // initialize form with blank value and required field
    if(data)
    {
      this.adduser = this.formBuilder.group({
        landmark: [data.landmark, Validators.required],
        phone: [data.phone, Validators.required],
        address: [data.address, Validators.required],
        pin_code: [data.pin_code, Validators.required]
      });
      this.selectedstate = data.state;
      this.selectedcountry= data.country;
      this.selectedcity= data.city;
    }
    else{
      this.adduser = this.formBuilder.group({
        landmark: ["", Validators.required],
        phone: ["", Validators.required],
        address: ["", Validators.required],
        pin_code: ["", Validators.required]
      });
    }
    this.liststate();
  }

  changeState(item)
  {
    console.log(item.value);
    this.listcity(item.value.state_id);
    this.selectedcity = null;
    this.citylist = [];
  }
   // compare Country based on id and autofill selected value
   compareCountry(quote1, quote2) {
    return quote1 && quote2 ? quote1._id === quote2._id : quote1 === quote2;
  }

  // compare state based on id and autofill selected value
  compareState(quote1, quote2) {
      return quote1 && quote2 ? quote1._id === quote2._id : quote1 === quote2;
  }
      
  // compare city based on id and autofill selected value
  compareCity(quote1, quote2) {
    return quote1 && quote2 ? quote1._id === quote2._id : quote1 === quote2;
  }
  
  // get state list from server and intialize drop down state list 
  liststate() {
    this.loaderService.showSpinner("Loading...");
    this.sharemanagementService.liststate()
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.statelist = data.data;
          if(this.updateData)
          {
            this.listcity(this.selectedstate.state_id);
          }
          
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }
  
    // get city list based on state id from server and intialize drop down state list 
    listcity(id) {
      this.loaderService.showSpinner("Loading...");
      this.sharemanagementService.listcity(parseInt(id))
        .subscribe(data => {
          this.loaderService.hideSpinner();
          if (!data.error) {
            this.citylist = data.data;
          }
          else {
            this.dialogServiceService.showDiloag(data.message);
          }
        });
    }

  // check all required fields and then send data to server for new and edit data 
  savewithimageurl() {
    if (!this.selectedcountry) {
      this.dialogServiceService.showDiloag("Please select country");
      return;
    }

    if (!this.selectedstate) {
      this.dialogServiceService.showDiloag("Please select state");
      return;
    }

    if (!this.selectedcity) {
      this.dialogServiceService.showDiloag("Please select city");
      return;
    }
    this.adduser.value.state = this.selectedstate;
    this.adduser.value.country = this.selectedcountry;
    this.adduser.value.city = this.selectedcity;
    this.dialogRef.close(this.adduser.value);
  }

  // close media modal
  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}