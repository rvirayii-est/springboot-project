export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
  lastLogin: string;
  salary: number;
  age: number;
}