import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-link',
  templateUrl: './title-link.component.html',
  styleUrls: ['./title-link.component.scss']
})
export class TitleLinkComponent implements OnInit {

  private params: any;

  constructor() { }

  ngOnInit() {
  }

  agInit(params: any): void {
    this.params = params;
  }

}
