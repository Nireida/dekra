import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {UserFormService} from '../../services/user-form-service';
import {QuestionBase} from '../../interfaces/question-base';
import {User} from '../../interfaces/user.model';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIcon],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      @for (q of questions; track q.key) {
        <div class="form-row">
          @if (q.controlType === 'textbox') {
            <mat-form-field appearance="outline">
              <mat-label>{{q.label}}</mat-label>
              <input matInput
                     [formControlName]="q.key"
                     [type]="q.key === 'password' ? (hidePassword() ? 'password' : 'text') : (q?.type || 'text')"
                     spellcheck="false">

              @if (q.key === 'password') {
                <button mat-icon-button matSuffix (click)="togglePassword($event)" type="button" tabindex="-1">
                  <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              }

              @if (form.get(q.key)?.invalid && form.get(q.key)?.touched) {
                <mat-error>
                  @if (form.get(q.key)?.hasError('required')) {
                    {{ q.errors?.['required'] || 'This field is required' }}
                  }
                  @else if (form.get(q.key)?.hasError('email')) {
                    Invalid email format
                  }
                  @else if (form.get(q.key)?.hasError('min')) {
                    {{ q.errors?.['min'] || 'Value is too low' }}
                  }
                  @else if (form.get(q.key)?.hasError('max')) {
                    {{ q.errors?.['max'] || 'Value is too big' }}
                  }
                  @else if (form.get(q.key)?.hasError('minlength')) {
                    {{ q.errors?.['minlength'] || 'Value is too short' }}
                  }
                  @else if (form.get(q.key)?.hasError('pattern')) {
                    {{ q.errors?.['pattern'] || 'Must contain A-Z, a-z and 0-9' }}
                  }
                </mat-error>
              }
            </mat-form-field>
          }

          @if (q.controlType === 'checkbox') {
             <mat-checkbox [formControlName]="q.key">{{q.label}}</mat-checkbox>
          }
        </div>
      }
      <div class="form-actions">
        <button mat-button type="button" (click)="onClose()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="form.invalid || !form.dirty" type="submit">
          Save
        </button>
      </div>
    </form>
  `
})
export class DynamicForm implements OnInit {
  @Input() questions: QuestionBase<User>[] = [];
  @Input() initialData: User | null = null;
  @Output() save = new EventEmitter<User>();
  @Output() closeDialog = new EventEmitter<void>(); // Событие отмены
  form!: FormGroup;
  private qService = inject(UserFormService);
  hidePassword = signal(true);

  ngOnInit() {
    if (this.questions.length === 0) {
      this.questions = this.qService.getQuestions();
    }
    this.form = this.qService.toFormGroup(this.questions);
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword.update(v => !v);
    event.preventDefault();
    event.stopPropagation();
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
    }
  }

  onClose() {
    this.closeDialog.emit();
  }
}
