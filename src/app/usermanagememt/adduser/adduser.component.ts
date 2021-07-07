import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { DialogServiceService } from '../../services/dialog-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UsermanagememtService } from '../usermanagememt.service';
import { AddaddressComponent } from '../../sharemanagement/addaddress/addaddress.component';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  adduser: FormGroup;
  params: any;
  address:any;
  shippingAddress:any;
  billingAddress:any;
  constructor(
    public loaderService: LoaderService,
    public usermanagememtService: UsermanagememtService,
    public dialogServiceService: DialogServiceService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) {
    // initialize form with blank value and required field
    this.adduser = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      repeatPassword: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])]
    });

    // get id from PARAMETERS
    this.route.queryParams.subscribe(params => {
      if (params && (Object.keys(params).length != 0)) {
        this.getuser(params._id);
      }
      else {
        // reset all data for adding new data
        this.adduser.reset();
        this.params = null;
      }
    });
  }

  // open address modal 
  editaddress(type) {
    let addressdata:any;
    switch (type) {
      case 'address':
        addressdata = this.address;
        break;
      case 'shippingaddress':
        addressdata = this.shippingAddress;
          break;
      case 'billingaddress':
        addressdata = this.billingAddress;
        break;
      default:
        break;
    }
    
    const dialogRef = this.dialog.open(AddaddressComponent, {
      width: '50%',
      data: addressdata
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         console.log(result);
         if (result) {
          console.log(result);
          switch (type) {
           case 'address':
             this.address = result;
             break;
           case 'shippingaddress':
           this.shippingAddress = result;
               break;
           case 'billingaddress':
           this.billingAddress = result;
             break;
           default:
             break;
         }
       }
      }
    });
  }

   // open address modal 
   addaddress(type) {    
    const dialogRef = this.dialog.open(AddaddressComponent, {
      width: '50%',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         console.log(result);
         switch (type) {
          case 'address':
            this.address = result;
            break;
          case 'shippingaddress':
          this.shippingAddress = result;
              break;
          case 'billingaddress':
          this.billingAddress = result;
            break;
          default:
            break;
        }
      }
    });
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
  
  // get user data based on id from server and intialize form and other variables
  getuser(id) {
    this.loaderService.showSpinner("Loading...");
    this.usermanagememtService.getuser(id)
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.params = data.data[0];
          this.adduser = this.formBuilder.group({
            name: [this.params.name, Validators.required],
            phone: [this.params.phone, Validators.required],
            repeatPassword: [this.params.password, Validators.required],
            password: [this.params.password, Validators.required],
            email: [this.params.email, Validators.compose([
              Validators.required,
              Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ])]
          });
          this.address = this.params.address;
          this.shippingAddress = this.params.shipping_address;
          this.billingAddress = this.params.billing_address ;
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  // check all required fields and then send data to server for new and edit data 
  savewithimageurl() {
    if (!this.address) {
      this.dialogServiceService.showDiloag("Please add Address");
      return;
    }
    if (!this.billingAddress) {
      this.dialogServiceService.showDiloag("Please add Billing Address");
      return;
    }
    if (!this.shippingAddress) {
      this.dialogServiceService.showDiloag("Please add Shipping Address");
      return;
    }

    if (this.params) {
      //send data to server for edting and navigate to list page 
      this.loaderService.showSpinner("Sending...");
      this.usermanagememtService.adduser(this.adduser.value.name,this.adduser.value.phone,this.adduser.value.password,this.adduser.value.email,this.address,this.shippingAddress,this.billingAddress, this.params._id)
        .subscribe(data => {
          this.loaderService.hideSpinner();
          if (!data.error) {
            this.dialogServiceService.showDiloag(data.message);
            this.router.navigate(['/usermanagememt/listuser']);
          }
          else {
            this.dialogServiceService.showDiloag(data.message);
          }
        });
    }
    else {
      //send data to server for adding new data and reset form and other variables
      this.loaderService.showSpinner("Sending...");
      this.usermanagememtService.adduser(this.adduser.value.name,this.adduser.value.phone,this.adduser.value.password,this.adduser.value.email,this.address,this.shippingAddress,this.billingAddress, '0')
        .subscribe(data => {
          this.loaderService.hideSpinner();
          if (!data.error) {
            this.dialogServiceService.showDiloag(data.message);
            this.shippingAddress = null;
            this.billingAddress = null;
            this.address = null;
            this.adduser.reset();
          }
          else {
            this.dialogServiceService.showDiloag(data.message);
          }
        });
    }

  }

  ngOnInit() {
  }

}