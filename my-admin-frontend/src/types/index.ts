export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  roles: Role;
}

export interface AuthContextType {
  token: string | null;
  user: { username: string; authorities: string } | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}