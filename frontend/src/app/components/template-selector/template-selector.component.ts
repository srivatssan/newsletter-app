import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({ selector: 'app-template-selector', templateUrl: './template-selector.component.html' })
export class TemplateSelectorComponent implements OnInit {
  templates: string[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.http.get<string[]>(`${environment.apiUrl}/templates`).subscribe(data => this.templates = data);
  }
  select(t: string) {
    this.router.navigate(['/section-form', t]);
  }
}
