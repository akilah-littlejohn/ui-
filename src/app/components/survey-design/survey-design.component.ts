import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-design',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Survey Design</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="designForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Survey Goals</mat-label>
            <textarea matInput formControlName="goals" rows="3" placeholder="Describe your survey goals..."></textarea>
          </mat-form-field>
          
          <h3>AI-Generated Questions</h3>
          <mat-card *ngFor="let question of aiQuestions; let i = index" class="question-card">
            <mat-card-content>
              <p>Question {{i + 1}}: {{question.text}}</p>
              <mat-icon [color]="question.biased ? 'warn' : 'primary'">{{question.biased ? 'warning' : 'check_circle'}}</mat-icon>
              <span>{{question.biased ? 'Potentially biased' : 'No bias detected'}}</span>
            </mat-card-content>
          </mat-card>
          
          <button mat-raised-button color="primary" type="submit" [disabled]="!designForm.valid">Next</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .question-card {
      margin-bottom: 10px;
    }
  `]
})
export class SurveyDesignComponent implements OnInit {
  designForm: FormGroup;
  aiQuestions = [
    { text: 'What is your experience with the legal system?', biased: true },
    { text: 'How would you rate the fairness of your case proceedings?', biased: false }
  ];

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.designForm = this.fb.group({
      goals: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Initialization logic here
  }

  onSubmit() {
    if (this.designForm.valid) {
      this.surveyService.updateSurveyData(this.designForm.value);
      this.surveyService.showComplianceMessage('1 question flagged for potential bias. Review suggested changes.');
      this.router.navigate(['/finalize-distribute']);
    }
  }
}