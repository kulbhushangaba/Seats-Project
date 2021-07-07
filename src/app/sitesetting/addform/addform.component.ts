import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogServiceService } from '../../services/dialog-service.service';
import { LoaderService } from '../../services/loader.service';
import { CommonService } from '../../services/common.service';
import { SitesettingService } from '../sitesetting.service';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.scss']
})
export class AddformComponent implements OnInit {
  ckeConfig = {
    allowedContent: false,
    extraPlugins: 'divarea',
    forcePasteAsPlainText: true
  }
  addform: FormGroup;
  formdata: any = {};
  constructor(
    public formBuilder: FormBuilder,
    public commonService: CommonService,
    public loaderService: LoaderService,
    public sitesettingService: SitesettingService,
    public dialogServiceService: DialogServiceService
  ) {

    // initialize form with blank value and required field  
    this.addform = this.formBuilder.group({
      about_title: ["", Validators.required],
      contact_us_title: ["", Validators.required],
      contact_us_phone_no: ["", Validators.required],
      contact_us_email: ["", Validators.required],
      contact_us_mobile: ["", Validators.required],
      contact_us_address: ["", Validators.required],
      raj_yoga_title: ["", Validators.required],
      raj_yoga_phone_no: ["", Validators.required],
      raj_yoga_address: ["", Validators.required],
      how_to_reach: ["", Validators.required],
      facebook_url: ["", Validators.required],
      twitter_url: ["", Validators.required],
      linkedin_url: ["", Validators.required],
      instagram_url: ["", Validators.required],
      footer_menu: ["", Validators.required],
      footer_menu_bar: ["", Validators.required],
      flat_rate: ["", Validators.required],
    });
    
    this.getform();
  }

  // get form data from server and intialize form and other variables
  getform() {
    this.loaderService.showSpinner("Sending...");
    this.sitesettingService.getForm()
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          if (data.data) {
            this.formdata = data.data;
            this.addform = this.formBuilder.group({
              about_title: [this.formdata.about_title, Validators.required],
              contact_us_title: [this.formdata.contact_us_title, Validators.required],
              contact_us_phone_no: [this.formdata.contact_us_phone_no, Validators.required],
              contact_us_email: [this.formdata.contact_us_email, Validators.required],
              contact_us_mobile: [this.formdata.contact_us_mobile, Validators.required],
              contact_us_address: [this.formdata.contact_us_address, Validators.required],
              raj_yoga_title: [this.formdata.raj_yoga_title, Validators.required],
              raj_yoga_phone_no: [this.formdata.raj_yoga_title, Validators.required],
              raj_yoga_address: [this.formdata.raj_yoga_address, Validators.required],
              facebook_url: [this.formdata.facebook_url, Validators.required],
              twitter_url: [this.formdata.twitter_url, Validators.required],
              linkedin_url: [this.formdata.linkedin_url, Validators.required],
              instagram_url: [this.formdata.instagram_url, Validators.required],
              footer_menu: [this.formdata.footer_menu, Validators.required],
              footer_menu_bar: [this.formdata.footer_menu_bar, Validators.required],
              how_to_reach: [this.formdata.how_to_reach, Validators.required],
              flat_rate: [this.formdata.flat_rate, Validators.required]
            });
          }
          else {
            this.formdata._id = '0';
          }
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  //send data to server for new and edit data 
  save() {
    this.loaderService.showSpinner("Sending...");
    this.sitesettingService.addForm(this.addform.value.about_title, this.addform.value.contact_us_title, this.addform.value.contact_us_phone_no, this.addform.value.contact_us_email, this.addform.value.contact_us_mobile, this.addform.value.contact_us_address, this.addform.value.raj_yoga_title, this.addform.value.how_to_reach, this.addform.value.raj_yoga_phone_no,this.addform.value.raj_yoga_address,this.addform.value.facebook_url,this.addform.value.twitter_url,this.addform.value.linkedin_url,this.addform.value.instagram_url,this.addform.value.footer_menu,this.addform.value.footer_menu_bar, this.formdata._id,this.addform.value.flat_rate)
      .subscribe(data => {
        this.loaderService.hideSpinner();
        if (!data.error) {
          this.dialogServiceService.showDiloag(data.message);
        }
        else {
          this.dialogServiceService.showDiloag(data.message);
        }
      });
  }

  ngOnInit() {
  }

}
