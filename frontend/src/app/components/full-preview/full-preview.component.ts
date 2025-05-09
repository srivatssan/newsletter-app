import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({ selector: 'app-full-preview', templateUrl: './full-preview.component.html' })
export class FullPreviewComponent {
  html = '';
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const template = this.route.snapshot.params['template'];
    const form = new FormData(); form.append('template_name', template);
    this.http.post(`${environment.apiUrl}/preview/full`, form, { responseType: 'text' })
      .subscribe(data => this.html = data);
  }
}
