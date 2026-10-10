import { User } from '../types';

const STORAGE_KEYS = {
  USERS: 'ghumlo_registered_users_v1',
  CURRENT_USER: 'ghumlo_current_user_v1',
};

interface StoredUserAccount extends User {
  passwordHash: string;
}

const DEMO_USER: StoredUserAccount = {
  id: 'user-demo-1',
  name: 'Aarav Sharma',
  email: 'aarav@ghumlo.in',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  createdAt: '2026-08-15T09:00:00Z',
  passwordHash: 'demo123',
};

export const authService = {
  getRegisteredUsers(): StoredUserAccount[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([DEMO_USER]));
        return [DEMO_USER];
      }
      return JSON.parse(data);
    } catch {
      return [DEMO_USER];
    }
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (!data) return null;
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  },

  signUp(name: string, email: string, password: string): { success: boolean; user?: User; error?: string } {
    try {
      const users = this.getRegisteredUsers();
      const normalizedEmail = email.trim().toLowerCase();

      if (users.some((u) => u.email === normalizedEmail)) {
        return { success: false, error: 'An account with this email already exists. Please Sign In.' };
      }

      const newUser: StoredUserAccount = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: name.trim(),
        email: normalizedEmail,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=2878d0`,
        createdAt: new Date().toISOString(),
        passwordHash: password, // client storage
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      // Automatically sign in
      const safeUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        createdAt: newUser.createdAt,
      };

      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
      window.dispatchEvent(new Event('ghumlo_auth_changed'));

      return { success: true, user: safeUser };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to create account.' };
    }
  },

  signIn(email: string, password: string): { success: boolean; user?: User; error?: string } {
    try {
      const users = this.getRegisteredUsers();
      const normalizedEmail = email.trim().toLowerCase();
      const found = users.find((u) => u.email === normalizedEmail);

      if (!found) {
        return { success: false, error: 'No account found with this email. Please check or Sign Up.' };
      }

      if (found.passwordHash !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const safeUser: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        avatarUrl: found.avatarUrl,
        createdAt: found.createdAt,
      };

      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
      window.dispatchEvent(new Event('ghumlo_auth_changed'));

      return { success: true, user: safeUser };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to sign in.' };
    }
  },

  signInDemo(): User {
    const safeUser: User = {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      avatarUrl: DEMO_USER.avatarUrl,
      createdAt: DEMO_USER.createdAt,
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    window.dispatchEvent(new Event('ghumlo_auth_changed'));
    return safeUser;
  },

  signOut(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.dispatchEvent(new Event('ghumlo_auth_changed'));
  },
};
