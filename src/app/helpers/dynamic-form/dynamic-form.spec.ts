import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicForm } from './dynamic-form';
import { UserFormService } from '../../services/user-form-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ReactiveFormsModule } from '@angular/forms';

describe('DynamicForm', () => {
  let component: DynamicForm;
  let fixture: ComponentFixture<DynamicForm>;

  const userFormServiceMock = {
    getQuestions: vi.fn().mockReturnValue([
      { key: 'username', label: 'User', controlType: 'textbox', required: true },
      { key: 'password', label: 'Pass', controlType: 'textbox', required: true, type: 'password' },
      { key: 'age', label: 'Age', controlType: 'textbox', required: true }
    ]),
    toFormGroup: new UserFormService().toFormGroup
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicForm, NoopAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: UserFormService, useValue: userFormServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with questions', () => {
    expect(component.form).toBeDefined();
    expect(component.form.contains('username')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should toggle password visibility signal', () => {
    expect(component.hidePassword()).toBe(true);
    const event = new MouseEvent('click');
    component.togglePassword(event);

    expect(component.hidePassword()).toBe(false);
  });

  it('should be invalid when age is less than 0', () => {
    const ageControl = component.form.get('age');
    ageControl?.setValue(-1);
    expect(ageControl?.valid).toBeFalsy();
    expect(ageControl?.hasError('min')).toBeTruthy();
  });

  it('should be invalid when password does not match pattern', () => {
    const passControl = component.form.get('password');
    passControl?.setValue('simplepass');
    expect(passControl?.hasError('pattern')).toBeTruthy();
  });

  it('should emit save event when form is valid and submitted', () => {
    const saveSpy = vi.spyOn(component.save, 'emit');
    component.form.patchValue({
      username: 'testuser',
      password: 'SafePassword123',
      age: 25
    });

    component.onSubmit();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should emit closeDialog when cancel is clicked', () => {
    const closeSpy = vi.spyOn(component.closeDialog, 'emit');
    component.onClose();
    expect(closeSpy).toHaveBeenCalled();
  });
});
