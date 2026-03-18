import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserList } from './user-list';
import { UserService } from '../../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;

  const userServiceMock = {
    getUsers: vi.fn().mockReturnValue(of({ items: [], totalCount: 0 })),
    deleteUser: vi.fn().mockReturnValue(of(true))
  };

  const dialogMock = {
    open: vi.fn().mockReturnValue({
      afterClosed: () => of(true)
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load users on init', () => {
    expect(component).toBeTruthy();
    expect(userServiceMock.getUsers).toHaveBeenCalled();
  });

  it('should open confirm dialog when deleteUser is called', () => {
    const testId = '123';
    component.deleteUser(testId);
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should have all mandatory columns', () => {
    const columns = component.displayedColumns;
    expect(columns).toContain('username');
    expect(columns).toContain('email');
    expect(columns).toContain('age');
    expect(columns).toContain('actions');
  });
});
