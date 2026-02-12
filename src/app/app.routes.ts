import { Routes } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },

    { path: 'users', component: UserListComponent },
    { path: 'users/create', component: UserFormComponent },
    { path: 'users/edit/:id', component: UserFormComponent }
];
