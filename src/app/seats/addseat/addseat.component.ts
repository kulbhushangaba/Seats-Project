import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogServiceService } from '../../services/dialog-service.service';
import { LoaderService } from '../../services/loader.service';
import { SeatsService } from '../../services/seats.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharemanagementService } from '../../sharemanagement/sharemanagement.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-addseat',
  templateUrl: './addseat.component.html',
  styleUrls: ['./addseat.component.scss']
})
export class AddseatComponent implements OnInit {
 
  addseats: FormGroup;
  checkedhome:boolean;
  params:any;
  statuses: any = ['A','R','S'];

  constructor(
    private seatsService: SeatsService,
    public formBuilder: FormBuilder,
    public loaderService: LoaderService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public sharemanagementService: SharemanagementService,
    private router: Router,
    public dialogServiceService: DialogServiceService) {
    // initialize form with blank value and required field
    this.addseats = this.formBuilder.group({
      id: ["", Validators.required],
      left: ["", Validators.required],
      right: ["", Validators.required],
      status: ["", Validators.required],
      rank: ["", Validators.required]
    });
          // get id from PARAMETERS
          this.route.queryParams.subscribe(params => {
            if (params && (Object.keys(params).length != 0)) {
              this.getSeats(params._id)
            }
            else {
              // reset all data for adding new data
              this.addseats.reset();
              this.params = null;
            }
          });
  }
  onChangehome(event) {
    console.log(event);
    this.checkedhome = event.checked;
  }

  getSeats(id){
    this.loaderService.showSpinner("Loading...");
    this.seatsService.getseats(id)
    .subscribe(data => {
      this.loaderService.hideSpinner();
      if (!data.error) {
        this.params = data.data[0];
        this.addseats = this.formBuilder.group({
          id: [this.params.id, Validators.required],
          left: [this.params.left, Validators.required],
          right: [this.params.right, Validators.required],
          status: [this.params.right, Validators.required],
          rank: [this.params.rank, Validators.required],
        });
      }
      else {
        this.dialogServiceService.showDiloag(data.message);
      }
    });
  }

  slugify(string) {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

   // check all required fields and then send data to server for new and edit data 
   savewithImageUrl() {
 
    if (this.params) {
      //send data to server for edting and navigate to list page 
      this.loaderService.showSpinner("Sending...");
      this.seatsService.addseats(this.addseats.value.id, this.addseats.value.left, this.addseats.value.right, this.addseats.value.status, this.addseats.value.rank, this.slugify(this.addseats.value.id),this.params._id)
        .subscribe(data => {
          this.loaderService.hideSpinner();
          if (!data.error) {
            this.dialogServiceService.showDiloag(data.message);
            this.router.navigate(['/dashboard']);
          }
          else {
            this.dialogServiceService.showDiloag(data.message);
          }
        });
    }
    else {
      //send data to server for adding new data and reset form and other variables
      this.loaderService.showSpinner("Sending...");
      this.seatsService.addseats(this.addseats.value.id, this.addseats.value.left, this.addseats.value.right, this.addseats.value.status, this.addseats.value.rank, this.slugify(this.addseats.value.id),'0')
        .subscribe(data => {
          this.loaderService.hideSpinner();
          if (!data.error) {
            this.dialogServiceService.showDiloag(data.message);
            this.addseats.reset();
            this.addseats.controls['seats'].setValue("");
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
