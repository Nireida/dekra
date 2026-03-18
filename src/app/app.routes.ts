import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then(m => m.USER_ROUTES)
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];
