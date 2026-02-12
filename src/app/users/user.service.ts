import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserRequest, GroupUserCountResponse, UpdateUserRequest, UserResponse } from '../models/user.model';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5132/User'; // change to your API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ApiResponse<UserResponse[]>> {
    return this.http.get<ApiResponse<UserResponse[]>>(`${this.apiUrl}/all`);
  }

  addUser(user: CreateUserRequest): Observable<ApiResponse<UserResponse[]>> {
    return this.http.post<ApiResponse<UserResponse[]>>(this.apiUrl, user);
  }

  updateUser(id: string, user: UpdateUserRequest): Observable<ApiResponse<UserResponse[]>> {
    return this.http.put<ApiResponse<UserResponse[]>>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getUsersPerGroup(): Observable<GroupUserCountResponse[]> {
    return this.http.get<GroupUserCountResponse[]>(`${this.apiUrl}/users-per-group`);
  }
}
