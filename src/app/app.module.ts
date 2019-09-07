import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './components/my-grid-application/my-grid-application.component';
import { TitleLinkComponent } from './components/title-link/title-link.component';
import { ThumbnailsComponent } from './components/thumbnails/thumbnails.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MyGridApplicationComponent,
    TitleLinkComponent,
    ThumbnailsComponent,
    CustomHeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([
      TitleLinkComponent,
      ThumbnailsComponent,
      CustomHeaderComponent
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
