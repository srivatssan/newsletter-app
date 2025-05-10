import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  getTemplates() {
    return this.http.get<string[]>(`${environment.apiUrl}/templates`);
  }

  getTemplate(templateName: string) {
    return this.http.get(`${environment.apiUrl}/templates/${templateName}`, { responseType: 'text' });
  }

  saveTemplate(data: any) {
    return this.http.post(`${environment.apiUrl}/save-template`, data);
  }

  getTemplateData() {
    return this.http.get(`${environment.apiUrl}/get-template-data`);
  }

  getSections() {
    return this.http.get(`${environment.apiUrl}/sections`);
  }

  saveSection(data: FormData) {
    return this.http.post(`${environment.apiUrl}/sections`, data);
  }

  previewTemplate(templateName: string) {
    return this.http.post(`${environment.apiUrl}/preview/full`, { template_name: templateName }, { responseType: 'text' });
  }

  getTemplateSections(templateName: string) {
    return this.http.get(`${environment.apiUrl}/templates/${templateName}/sections`);
  }
}