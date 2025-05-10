import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.css']
})
export class TemplatePreviewComponent implements OnInit {
  templateName: string = '';
  previewHtml: string = '';

  constructor(private route: ActivatedRoute, private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateName = this.route.snapshot.paramMap.get('template') || '';
    this.templateService.previewTemplate(this.templateName).subscribe(
      (data: any) => {
        this.previewHtml = data;
      },
      (error) => {
        console.error('Error fetching preview:', error);
      }
    );
  }
}