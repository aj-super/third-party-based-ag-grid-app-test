import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements OnInit {

  params: IHeaderAngularComp;

  @ViewChild('selection', { static: true })
  checkbox: ElementRef;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  agInit(params: IHeaderAngularComp): void {
    this.params = params;
    this.appService.selectionChanged.subscribe(value => {
      this.checkbox.nativeElement.checked = value;
    });
  }

  onChange(event) {
    if (event.target.checked) {
      this.params['api'].selectAll();
    } else {
      this.params['api'].deselectAll();
    }
  }

}
