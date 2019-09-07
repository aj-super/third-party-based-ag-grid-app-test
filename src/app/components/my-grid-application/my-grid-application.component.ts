import { Component, OnInit, Input } from '@angular/core';
import { GridOptions, SelectionChangedEvent } from 'ag-grid-community';
import { ThumbnailsComponent } from '../thumbnails/thumbnails.component';
import { TitleLinkComponent } from '../title-link/title-link.component';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
import { AppService } from '../../app.service';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.scss']
})
export class MyGridApplicationComponent implements OnInit {

  @Input()
  videos: any[] = [];

  selectionModeEnabled = true;
  selectedCount = 0;

  gridOptions: GridOptions;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {

    this.gridOptions = {
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true
      },
      suppressRowClickSelection: true,
      rowSelection: 'multiple',
      columnDefs: [
        {
          headerName: '',
          field: 'selected',
          headerComponentFramework: CustomHeaderComponent,
          checkboxSelection: true,
          width: 40,
        },
        {
          headerName: '',
          field: 'thumbnails',
          cellRendererFramework: ThumbnailsComponent,
          autoHeight: true
        },
        {
          headerName: 'Video Title',
          field: 'title',
          cellRendererFramework: TitleLinkComponent,
          width: 300
        },
        {
          headerName: 'Published On',
          field: 'publishedAt',
          width: 200,
        },
        {
          headerName: 'Description',
          field: 'description',
          width: 400,
        }
      ],
      rowData: this.videos.map(video => ({
        ...video.snippet,
        title: {
          title: video.snippet.title,
          link: `https://www.youtube.com/watch?v=${video.id.videoId}`
        },
        thumbnails: video.snippet.thumbnails.default.url
      })),
      onSelectionChanged: (event: SelectionChangedEvent) => {
        this.selectedCount = event.api.getSelectedRows().length;
        this.appService.selectionChanged.next(this.gridOptions.rowData.length === this.selectedCount);
      }
    };
  }

  getContextMenuItems(params) {
    if (params.column.colId !== 'title') {
      return [];
    }
    return [{
      name: 'Open in new tab',
      action: () => {
        window.open(params.value.link, '_blank');
      }
    }];
  }

  onToggleSelectionMode(event) {
    this.selectionModeEnabled = event;
    this.gridOptions.columnApi.setColumnVisible('selected', event);
  }

}
