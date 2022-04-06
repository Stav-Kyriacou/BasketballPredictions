import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() h1 = '';
  @Input() h2 = '';
  @Input() h3 = '';
  constructor() { }

  ngOnInit(): void {
  }

}
