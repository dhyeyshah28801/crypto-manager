export interface User {
  userId?: number;
  status: number | string;
  name: string;
  email: string;
  userRoleId: UserRole ;
}

export interface UserFetchRequest {
  searchString: string,
  status: 0 | 1,
  userRole: UserRole
}

export type UserRole = 1 | 2 