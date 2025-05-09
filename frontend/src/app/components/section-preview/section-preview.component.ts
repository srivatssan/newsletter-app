import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({ selector: 'app-section-preview', templateUrl: './section-preview.component.html' })
export class SectionPreviewComponent implements OnInit {
  sections: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/sections`).subscribe(data => this.sections = data);
  }
  accept() { this.router.navigate(['/full-preview', /* pass template if needed */ sections[0].template ]); }
  modify() { this.router.navigate(['/section-form', /* pass template */ ]); }
}
