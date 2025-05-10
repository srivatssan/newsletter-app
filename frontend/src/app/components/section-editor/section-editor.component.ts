import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.css']
})
export class SectionEditorComponent implements OnInit {
  templateName: string = '';
  sections: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.templateName = this.route.snapshot.paramMap.get('templateName') || '';
    this.templateService.getSections().subscribe(
      (data: any) => {
        this.sections = data;
      },
      (error) => {
        console.error('Error fetching sections:', error);
      }
    );
  }

  saveTemplate(): void {
    this.templateService.saveTemplate(this.sections).subscribe(
      (response) => {
        console.log('Template saved successfully:', response);
        this.router.navigate(['/preview', this.templateName]);
      },
      (error) => {
        console.error('Error saving template:', error);
      }
    );
  }
}