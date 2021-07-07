import { Injectable } from '@angular/core';

export interface Page {
  value: string;
  viewValue: string;
}

export interface MenuItem {
  label: string;
  link?: string;
  icon: string;
  items?: MenuItem[];
  
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  language: Page[] =[
    {
      value: 'english', viewValue: 'English'
    },
    {
      value: 'hindi', viewValue: 'Hindi'
    }
  ];
  
  appitems: MenuItem[] = [
    {
      label: 'Dashborad',
      link: 'dashboard',
      icon: 'dashboard'
    },
    {
      label: 'Add Seat',
      link: '/seats/addseat',
      icon: 'add_box'
    },
    {
      label: 'Available',
      link: '/seats/listavailable',
      icon: 'event_available'
    },
    {
      label: 'Reserved',
      link: '/seats/listreserved',
      icon: 'how_to_vote'
    },
    {
      label: 'Sold',
      link: '/seats/listsold',
      icon: 'check_circle_outline'
    }
  ];
  constructor() { }

  getMenuItem()
  {
     return this.appitems;
  }

  getLanguage()
  {
     return this.language;
  }

}
