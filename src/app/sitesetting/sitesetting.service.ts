import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SitesettingService {

  constructor(private http: HttpClient) {
   }
   
  // get sitesetting data from server 
  getForm(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/sitesetting/getform', {
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  //send data to server for adding or editing sitesetting
  addForm(about_title: string, contact_us_title: string, contact_us_phone_no: string, contact_us_email: string, contact_us_mobile: string, contact_us_address: string, raj_yoga_title: string, how_to_reach: string, raj_yoga_phone_no: string, raj_yoga_address: string, facebook_url: string, twitter_url: string, linkedin_url: string, instagram_url: string, footer_menu: string, footer_menu_bar: string, id: string,flat_rate: string): Observable<any> {
    console.log(contact_us_phone_no, id);
    return Observable.create(observer => {
      this.http.post('/api/sitesetting/addform', {
        about_title,
        contact_us_title,
        contact_us_phone_no,
        contact_us_email,
        contact_us_mobile,
        contact_us_address,
        raj_yoga_title,
        how_to_reach,
        raj_yoga_phone_no,
        raj_yoga_address,
        facebook_url,
        twitter_url,
        linkedin_url,
        instagram_url,
        footer_menu,
        footer_menu_bar,
        id,
        flat_rate
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }
}
