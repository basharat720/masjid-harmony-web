
interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Mock database of users - in a real app, this would be in a secure database
const users = [
  {
    id: "1",
    username: "admin",
    email: "admin@masjidhussain.org",
    password: "Admin@123", // In a real app, this would be hashed
    role: "admin"
  },
  {
    id: "2",
    username: "imam",
    email: "imam@masjidhussain.org",
    password: "Imam@123", // In a real app, this would be hashed
    role: "editor"
  }
];

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

const login = (username: string, password: string): Promise<AuthUser> => {
  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find the user
      const user = users.find(
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
        
        resolve(authUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800); // Simulate network delay
  });
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
