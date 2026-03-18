import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';

describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;
  const dialogRefMock = {
    close: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
