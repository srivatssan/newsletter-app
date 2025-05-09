import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { SectionPreviewComponent } from './components/section-preview/section-preview.component';
import { FullPreviewComponent } from './components/full-preview/full-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplateSelectorComponent,
    SectionFormComponent,
    SectionPreviewComponent,
    FullPreviewComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
