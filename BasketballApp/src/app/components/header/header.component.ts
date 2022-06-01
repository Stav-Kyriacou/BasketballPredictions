import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  //
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, @Inject(DOCUMENT) public document: Document, public auth: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
