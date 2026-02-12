import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CreateUserRequest, UpdateUserRequest } from '../../models/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm!: FormGroup;
  userId?: string;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      sname: ['', Validators.required]
    });

    this.userId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.userId) {
      this.isEdit = true;
      this.userService.getUsers().subscribe(users => {
        const user = users.data.find(u => u.id === this.userId);
        if (user) this.userForm.patchValue(user);
      });
    }
  }

  save() {
    const data: CreateUserRequest | UpdateUserRequest = this.userForm.value;

    if (this.isEdit && this.userId) {
      this.userService.updateUser(this.userId, data as UpdateUserRequest).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.addUser(data as CreateUserRequest).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
