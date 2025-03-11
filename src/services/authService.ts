
import { supabase } from '@/integrations/supabase/client';

interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Get admin user from database
const loginWithSupabase = async (username: string, password: string): Promise<AuthUser> => {
  try {
    // Query the admin_users table
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .or(`username.eq.${username},email.eq.${username}`)
      .eq('password', password)
      .single();
    
    if (error) throw error;
    
    if (data) {
      // Create auth user
      const authUser: AuthUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role
      };
      
      // Store in sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(authUser));
      
      return authUser;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Invalid credentials');
  }
};

// Store the current user in sessionStorage to persist through page refreshes
// but clear when the browser is closed
const getCurrentUser = (): AuthUser | null => {
  const userJson = sessionStorage.getItem('currentUser');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (e) {
    console.error('Error parsing user from session storage', e);
    return null;
  }
};

const login = async (username: string, password: string): Promise<AuthUser> => {
  try {
    // First try to login with Supabase
    return await loginWithSupabase(username, password);
  } catch (error) {
    console.log('Fallback to mock login due to:', error);
    
    // Fallback to mock users if Supabase fails
    // Find the user
    const mockUsers = [
      {
        id: "1",
        username: "admin",
        email: "admin@masjidhussain.org",
        password: "Admin@123",
        role: "admin"
      },
      {
        id: "2",
        username: "imam",
        email: "imam@masjidhussain.org",
        password: "Imam@123",
        role: "editor"
      }
    ];
    
    const user = mockUsers.find(
      u => (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
      // Create a user object without the password
      const authUser: AuthUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      
      // Store in sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(authUser));
      
      return authUser;
    } else {
      throw new Error('Invalid credentials');
    }
  }
};

const logout = (): void => {
  sessionStorage.removeItem('currentUser');
};

const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

const hasRole = (roles: string[]): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  return roles.includes(user.role);
};

export const authService = {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  hasRole
};
