import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({ selector: 'app-section-form', templateUrl: './section-form.component.html' })
export class SectionFormComponent {
  template!: string;
  title = ''; abstract = ''; link = '';
  thumbnailFile!: File;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.template = this.route.snapshot.params['template'];
  }
  onFileChange(e: any) { this.thumbnailFile = e.target.files[0]; }
  submit() {
    const form = new FormData();
    form.append('title', this.title);
    form.append('abstract', this.abstract);
    form.append('link', this.link);
    form.append('thumbnail', this.thumbnailFile);
    this.http.post(`${environment.apiUrl}/sections`, form).subscribe(() => {
      this.router.navigate(['/section-preview']);
    });
  }
}
