import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  config = {
    paddingAtStart: true,
    listBackgroundColor: 'white',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: 'white',
    selectedListFontColor: '#3f51b5',
  };
  appitems =[];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public commonService: CommonService,
    private authService: AuthService) {
    this.appitems = this.commonService.getMenuItem();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  selectedItem(item) {
    this.router.navigate([item.link]);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('/auth/login');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
