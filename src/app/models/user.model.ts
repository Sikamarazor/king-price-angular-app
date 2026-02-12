export interface UserResponse {
  id: string;
  email: string;
  name: string;
  sname: string;
  groups: string[];
  permissions: string[];
}

export interface CreateUserRequest {
  email: string;
  name: string;
  sname: string;
  groupIds?: string[];
}

export interface UpdateUserRequest {
  email: string;
  name: string;
  sname: string;
  groupIds?: string[];
}

export interface GroupUserCountResponse {
  groupId: string;
  groupName: string;
  userCount: number;
}
