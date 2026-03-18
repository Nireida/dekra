import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UserService } from './users.service';
import { firstValueFrom } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should return paginated users', async () => {
    const res = await firstValueFrom(service.getUsers(0, 5));

    expect(res.items.length).toBe(5);
    expect(res.totalCount).toBeGreaterThan(10);
  });

  it('should delete a user mutationally', async () => {
    const userIdToDelete = '1111';
    await firstValueFrom(service.deleteUser(userIdToDelete));
    const res = await firstValueFrom(service.getUsers(0, 20));
    const found = res?.items.find(u => u.id === userIdToDelete);

    expect(found).toBeUndefined();
  });
});
