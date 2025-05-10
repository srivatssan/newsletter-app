import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent implements OnInit {
  templates: string[] = [];

  constructor(private templateService: TemplateService, private router: Router) {}

  ngOnInit(): void {
    this.templateService.getTemplates().subscribe(
      (data) => {
        this.templates = data;
      },
      (error) => {
        console.error('Error fetching templates:', error);
      }
    );
  }

  selectTemplate(templateName: string): void {
    this.router.navigate(['/section-form', templateName]);
  }
}
