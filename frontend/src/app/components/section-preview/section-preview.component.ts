import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-section-preview',
  templateUrl: './section-preview.component.html',
  styleUrls: ['./section-preview.component.css']
})
export class SectionPreviewComponent implements OnInit {
  sections: any[] = [];

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateService.getTemplateData().subscribe(
      (data: any) => {
        this.sections = data;
      },
      (error) => {
        console.error('Error fetching sections:', error);
      }
    );
  }
}
