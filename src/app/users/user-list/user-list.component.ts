import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../user.service';
import { GroupUserCountResponse, UserResponse } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  displayedColumns: string[] = ['name', 'email', 'groups', 'actions'];
  users: UserResponse[] = [];
  totalUsers = 0;

  ngOnInit(): void {
    this.loadUsers();
    this.loadTotalCount();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
        }
      },
      error: (err) => console.error(err)
    });
  }

  loadTotalCount() {
    this.userService.getTotalUsers().subscribe({
      next: (count: any) => this.totalUsers = count.data,
      error: (err) => console.error(err)
    });
  }

  addUser() {
    this.router.navigate(['/users/create']);
  }

  editUser(id: string) {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers()
    });
  }
}
