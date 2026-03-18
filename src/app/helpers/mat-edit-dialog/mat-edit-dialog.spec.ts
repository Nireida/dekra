import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Добавь MAT_DIALOG_DATA
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserEditDialog } from './mat-edit-dialog';

describe('UserEditDialog', () => {
  let component: UserEditDialog;
  let fixture: ComponentFixture<UserEditDialog>;

  const dialogRefMock = {
    close: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditDialog, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
