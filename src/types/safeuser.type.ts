export interface SafeUser {
  id: string;
  username: string;
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  role: 'admin' | 'user';
  createdAt?: string;
}

