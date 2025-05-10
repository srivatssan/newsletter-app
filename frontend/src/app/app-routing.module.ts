import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { SectionPreviewComponent } from './components/section-preview/section-preview.component';
import { TemplatePreviewComponent } from './components/template-preview/template-preview.component';
import { FullPreviewComponent } from './components/full-preview/full-preview.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Landing page
  { path: 'templates', component: TemplateSelectorComponent }, // Template selection
  { path: 'section-form/:template', component: SectionFormComponent }, // Fill sections
  { path: 'section-preview', component: SectionPreviewComponent }, // Preview sections
  { path: 'template-preview/:template', component: TemplatePreviewComponent }, // Preview template
  { path: 'preview/:template', component: FullPreviewComponent } // Full preview
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
