import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-full-preview',
  templateUrl: './full-preview.component.html',
  styleUrls: ['./full-preview.component.css']
})
export class FullPreviewComponent implements OnInit {
  html = ''; // Holds the rendered HTML from the backend
  templateName: string = ''; // Holds the selected template name

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the template name from the route parameters
    this.templateName = this.route.snapshot.params['template'];

    // Prepare the form data to send to the backend
    const form = new FormData();
    form.append('template_name', this.templateName);

    // Fetch the rendered HTML from the backend
    this.http.post(`${environment.apiUrl}/preview/full`, form, { responseType: 'text' })
      .subscribe(
        (data) => {
          this.html = data; // Assign the rendered HTML to the `html` variable
        },
        (error) => {
          console.error('Error fetching preview:', error);
        }
      );
  }
}
