import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {controlType, QuestionBase} from '../interfaces/question-base';
import {User} from '../interfaces/user.model';

@Injectable({ providedIn: 'root' })
export class UserFormService {
  getQuestions(): QuestionBase<User>[] {
    return [
      { key: 'username', label: 'Username', controlType: controlType.textbox, required: true, order: 1, errors: {
          required: 'Username is required'} },
      { key: 'name', label: 'First Name', controlType: controlType.textbox, required: true, order: 2, errors: {
          required: 'First Name is required'} },
      { key: 'surnames', label: 'Surnames', controlType: controlType.textbox, required: true, order: 3, errors: {
          required: 'Surnames is required'}},
      { key: 'email', label: 'Email', type: 'email', controlType: controlType.textbox, required: true, order: 4, errors: {
          required: 'Email is required'}},
      { key: 'password', label: 'Password', type: 'password', controlType: controlType.textbox, required: true, order: 5, errors: {
          required: 'Password is required',
          minlength: 'Minimum 8 characters',
          pattern: 'Must contain: A-Z, a-z and 0-9'
        } },
      { key: 'age', label: 'Age', type: 'number', controlType: controlType.textbox, required: true, order: 6, errors: {
          min: 'Minimum age is 0',
          max: 'Maximum age is 120',
          required: 'Age is required',
        } },
      { key: 'active', label: 'Active Status', controlType: controlType.checkbox, order: 7, value: false }
    ].sort((a, b) => a.order - b.order) as QuestionBase<User>[];
  }

  toFormGroup<T extends object>(questions: QuestionBase<T>[]) {
    const group: Record<string, AbstractControl> = {};

    questions.forEach(q => {
      const validators = [];

      if (q.required) {
        validators.push(Validators.required);
      }

      if (q.type === 'email') {
        validators.push(Validators.email);
      }

      if (q.key === 'age') {
        validators.push(Validators.min(0), Validators.max(120));
      }

      if (q.key === 'password') {
        validators.push(
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        );
      }

      group[q.key as string] = new FormControl(q.value ?? '', validators);
    });

    return new FormGroup(group);
  }
}
