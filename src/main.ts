import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {UserList} from './app/features/users/user-list/user-list';
import {createCustomElement} from '@angular/elements';
import {DynamicForm} from './app/helpers/dynamic-form/dynamic-form';

bootstrapApplication(App, appConfig).then((appRef) => {
  const injector = appRef.injector;

  // Регистрация Списка пользователей как Web Component
  const userListElement = createCustomElement(UserList, { injector });
  customElements.define('user-list-component', userListElement);

  // Регистрация Динамической формы как Web Component
  const dynamicFormElement = createCustomElement(DynamicForm, { injector });
  customElements.define('dynamic-user-form', dynamicFormElement);

  console.log('Web Components registered: <user-list-component> and <dynamic-user-form>');
})
  .catch((err) => console.error(err));
