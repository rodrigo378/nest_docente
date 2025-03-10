export interface AuthenticatedUser {
  id: string;
  email: string;
  authProvider: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
}
