import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'reviewer' | 'public';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Create context for authentication
export const AuthContext = createContext<AuthContextType | null>(null);

// Mock authentication service - ready for real implementation
class AuthService {
  private storageKey = 'mlp_auth_state';

  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - replace with real API call
    if (credentials.email === 'admin@mlpresearch.com' && credentials.password === 'demo') {
      const user: User = {
        id: '1',
        username: 'admin',
        email: credentials.email,
        role: 'admin',
        createdAt: new Date()
      };
      
      this.setStoredUser(user);
      return user;
    }
    
    if (credentials.email === 'reviewer@mlpresearch.com' && credentials.password === 'demo') {
      const user: User = {
        id: '2',
        username: 'reviewer',
        email: credentials.email,
        role: 'reviewer',
        createdAt: new Date()
      };
      
      this.setStoredUser(user);
      return user;
    }
    
    throw new Error('Invalid credentials');
  }

  async register(data: RegisterData): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock registration - replace with real API call
    const user: User = {
      id: Date.now().toString(),
      username: data.username,
      email: data.email,
      role: 'public',
      createdAt: new Date()
    };
    
    this.setStoredUser(user);
    return user;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const user = JSON.parse(stored);
        // Check if session is still valid (mock implementation)
        return user;
      }
    } catch (error) {
      console.debug('Auth storage error:', error);
    }
    return null;
  }

  private setStoredUser(user: User): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } catch (error) {
      console.debug('Auth storage error:', error);
    }
  }

  // Role-based access control
  hasPermission(user: User | null, permission: string): boolean {
    if (!user) return permission === 'read:public';
    
    const permissions = {
      admin: ['read:all', 'write:all', 'delete:all', 'manage:users'],
      reviewer: ['read:all', 'write:reviews', 'edit:own'],
      public: ['read:public', 'comment:public']
    };
    
    return permissions[user.role]?.includes(permission) || false;
  }
}

export const authService = new AuthService();

// Hook for using authentication
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for authentication state management
export function useAuthState(): [AuthState, (state: AuthState) => void] {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Initialize auth state from storage
    const user = authService.getCurrentUser();
    setAuthState({
      user,
      isLoading: false,
      isAuthenticated: !!user
    });
  }, []);

  return [authState, setAuthState];
}

// Future-ready API integration points
export interface AuthApiEndpoints {
  login: '/api/auth/login';
  register: '/api/auth/register';
  logout: '/api/auth/logout';
  refresh: '/api/auth/refresh';
  profile: '/api/auth/profile';
}

export const AUTH_ENDPOINTS: AuthApiEndpoints = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  refresh: '/api/auth/refresh',
  profile: '/api/auth/profile'
};