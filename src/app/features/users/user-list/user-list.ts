import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {UserService} from '../../../services/users.service';
import {User} from '../../../interfaces/user.model';
import {filter, switchMap,} from 'rxjs';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from '../../../helpers/confirm-dialog/confirm-dialog';
import {MatPaginatorModule, MatPaginator, PageEvent} from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {UserEditDialog} from '../../../helpers/mat-edit-dialog/mat-edit-dialog';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class UserList implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  displayedColumns: string[] = ['username', 'name', 'surnames', 'email', 'password', 'age', 'status', 'lastLogin', 'creationDate', 'actions'];
  dataSource: User[] = [];
  totalLength = 0;
  pageSize = 8;
  pageIndex = 0;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
     this.userService.getUsers(this.pageIndex, this.pageSize).pipe(
       takeUntilDestroyed(this.destroyRef)).subscribe(el => {
        this.totalLength = el.totalCount;
        this.cdr.markForCheck();
       this.dataSource = el.items;
      });
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px'
    });
    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(() => this.userService.deleteUser(id)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.loadUsers();
      this.cdr.markForCheck();
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserEditDialog, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      switchMap(newUser => this.userService.createUser(newUser)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.loadUsers();
      this.cdr.markForCheck();
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserEditDialog, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      switchMap(updatedData => this.userService.updateUser(user.id!, updatedData)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.loadUsers();
      this.cdr.markForCheck();
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
}
