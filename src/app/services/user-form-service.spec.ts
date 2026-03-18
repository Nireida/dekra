import { TestBed } from '@angular/core/testing';
import { UserFormService } from './user-form-service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UserFormService', () => {
  let service: UserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [UserFormService]
    });
    service = TestBed.inject(UserFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 7 questions for the user form', () => {
    const questions = service.getQuestions();
    expect(questions.length).toBe(7);
    expect(questions[0].key).toBe('username');
    expect(questions[6].key).toBe('active');
  });

  describe('toFormGroup', () => {
    it('should create a FormGroup from questions', () => {
      const questions = service.getQuestions();
      const form = service.toFormGroup(questions);

      expect(form instanceof FormGroup).toBeTruthy();
      expect(form.contains('username')).toBeTruthy();
      expect(form.contains('email')).toBeTruthy();
      expect(form.contains('password')).toBeTruthy();
    });

    it('should apply email validator to email field', () => {
      const questions = service.getQuestions();
      const form = service.toFormGroup(questions);
      const emailControl = form.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.hasError('email')).toBeFalsy();
    });

    it('should apply complex password pattern validator', () => {
      const questions = service.getQuestions();
      const form = service.toFormGroup(questions);
      const passwordControl = form.get('password');
      passwordControl?.setValue('simplepass123');
      expect(passwordControl?.hasError('pattern')).toBeTruthy();
      passwordControl?.setValue('SafePass123');
      expect(passwordControl?.hasError('pattern')).toBeFalsy();
    });

    it('should apply age range validator (0-120)', () => {
      const questions = service.getQuestions();
      const form = service.toFormGroup(questions);
      const ageControl = form.get('age');

      ageControl?.setValue(-1);
      expect(ageControl?.hasError('min')).toBeTruthy();

      ageControl?.setValue(121);
      expect(ageControl?.hasError('max')).toBeTruthy();

      ageControl?.setValue(25);
      expect(ageControl?.valid).toBeTruthy();
    });

    it('should make required fields invalid when empty', () => {
      const questions = service.getQuestions();
      const form = service.toFormGroup(questions);
      const usernameControl = form.get('username');

      usernameControl?.setValue('');
      expect(usernameControl?.hasError('required')).toBeTruthy();
    });
  });
});
