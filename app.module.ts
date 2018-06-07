// Modules
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome/angular-font-awesome';

import {AppRoutingModule} from './app-routing.module';
import {LibSharedModule} from 'fint-shared-components';
// Services
import {CommonComponentService} from './views/components/common-component.service';
// Components
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LibSharedModule,

    MatToolbarModule,
    AngularFontAwesomeModule,

    AppRoutingModule
  ],
  providers: [CommonComponentService/* , EventService */],
  bootstrap: [AppComponent]
})
export class AppModule {
}