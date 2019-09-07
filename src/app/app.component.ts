import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ag-grid-cli';
  videos = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getVideos().subscribe((res: any) => {
      this.videos = res.items;
    });
  }
}
