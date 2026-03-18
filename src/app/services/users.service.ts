import {finalize, Observable, of, switchMap, timer} from 'rxjs';
import {User} from '../interfaces/user.model';
import {inject, Injectable} from '@angular/core';
import {LoaderService} from './load.service';
import {UserMockData} from '../mock/user-data';

@Injectable({ providedIn: 'root' })
export class UserService {
  private loaderService = inject(LoaderService);
  private users: User[] = UserMockData;

  getUsers(pageIndex = 0, pageSize = 8): Observable<{ items: User[], totalCount: number }> {
    this.loaderService.show();

    return timer(1000).pipe(
      switchMap(() => {
        const start = pageIndex * pageSize;
        const end = start + pageSize;
        const paginatedUsers = this.users.slice(start, end);
        return of({items: paginatedUsers, totalCount: this.users.length});
      }),
      finalize(() => this.loaderService.hide())
    );
  }

  createUser(user: User) {
    user.id = Date.now().toString();
    user.creationDate = new Date();
    this.users.push(user);
    return of(this.users);
  }

  updateUser(userId: string, user: User) {
    const id = this.users.findIndex((el) => el.id === userId);
    this.users[id] = {...user, lastLogin: this.users[id]?.lastLogin, creationDate: this.users[id]?.creationDate};
    return of(this.users);
  }

  deleteUser(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1); // Удаляем 1 элемент по этому индексу
    }
    return of(this.users)
  }
}
