import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { SectionPreviewComponent } from './components/section-preview/section-preview.component';
import { FullPreviewComponent } from './components/full-preview/full-preview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'templates', component: TemplateSelectorComponent },
  { path: 'section-form/:template', component: SectionFormComponent },
  { path: 'section-preview', component: SectionPreviewComponent },
  { path: 'full-preview/:template', component: FullPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
