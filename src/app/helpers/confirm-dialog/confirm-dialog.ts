import {Component, inject} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title  class="margin-auto">Confirmation</h2>
    <mat-dialog-content  class="margin-auto">Are you sure?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cansel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialog {
  public dialogRef = inject(MatDialogRef<ConfirmDialog>);
  onNoClick(): void { this.dialogRef.close(); }
}
