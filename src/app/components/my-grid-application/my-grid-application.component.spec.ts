import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGridApplicationComponent } from './my-grid-application.component';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
import { ThumbnailsComponent } from '../thumbnails/thumbnails.component';
import { TitleLinkComponent } from '../title-link/title-link.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ApiService } from '../../api/api.service';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('MyGridApplicationComponent', () => {
  let component: MyGridApplicationComponent;
  let fixture: ComponentFixture<MyGridApplicationComponent>;

  let apiService: ApiService;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyGridApplicationComponent, CustomHeaderComponent, ThumbnailsComponent, TitleLinkComponent],
      imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AgGridModule.withComponents([CustomHeaderComponent, ThumbnailsComponent, TitleLinkComponent])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGridApplicationComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    appService = TestBed.get(AppService);
    component.videos = [{
      kind: 'youtube#searchResult',
      etag: '\'8jEFfXBrqiSrcF6Ee7MQuz8XuAM/QtJ4MlYKdN_zTBjfY3xY6mn7ZRg\'',
      id: {
        kind: 'youtube#video',
        videoId: '3fumBcKC6RE'
      },
      snippet: {
        publishedAt: '2011-05-12T20:01:31.000Z',
        channelId: 'UCEOhcOACopL42xyOBIv1ekg',
        title: 'Lil Wayne - John (Explicit) ft. Rick Ross',
        description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg',
            width: 120,
            height: 90
          },
          medium: {
            url: 'https://i.ytimg.com/vi/3fumBcKC6RE/mqdefault.jpg',
            width: 320,
            height: 180
          },
          high: {
            url: 'https://i.ytimg.com/vi/3fumBcKC6RE/hqdefault.jpg',
            width: 480,
            height: 360
          }
        },
        channelTitle: 'LilWayneVEVO',
        liveBroadcastContent: 'none'
      }
    }];
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('grid API is available after `detectChanges`', () => {
    expect(component.gridOptions.api).toBeTruthy();
  });

  it('agGrid displays correct data', () => {
    const appElement = fixture.debugElement.nativeElement;
    const cellElements = appElement.querySelectorAll('.ag-cell-value');
    expect(cellElements.length).toBe(5);
  });

  it('toggle selection mode', () => {
    component.onToggleSelectionMode(false);
    fixture.detectChanges();
    const appElement = fixture.debugElement.nativeElement;
    expect(appElement.querySelectorAll('.ag-cell.ag-cell-not-inline-editing.ag-cell-with-height.ag-cell-value').length).toBe(4);
  });
});
