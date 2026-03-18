import {Component, inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {DynamicForm} from '../dynamic-form/dynamic-form';
import {User} from '../../interfaces/user.model';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [MatDialogModule, DynamicForm],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit' : 'Create' }} user</h2>
    <mat-dialog-content>
      <app-dynamic-form [initialData]="data" (closeDialog)="onClose()" (save)="onSave($event)"></app-dynamic-form>
    </mat-dialog-content>
  `
})
export class UserEditDialog {
  readonly dialogRef = inject(MatDialogRef<UserEditDialog>);
  readonly data = inject<User | null>(MAT_DIALOG_DATA);

  onSave(updatedUser: User): void {
    this.dialogRef.close(updatedUser);
  }

  onClose() {
    this.dialogRef.close();
  }
}
