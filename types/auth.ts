// Define role mapping as a const
const ROLES = {
  1: "admin",
  2: "user",
  // Add other roles as needed
} as const;

type RoleNumber = keyof typeof ROLES;
type RoleString = (typeof ROLES)[RoleNumber];

interface User {
  name: string;
  email: string;
  role: RoleString;
  readonly isAdmin: boolean;
}

interface RawUser {
  name: string;
  email: string;
  role: number;
}

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Utility function to transform raw user data
function transformUser(rawUser: RawUser): User {
  const roleString = ROLES[rawUser.role as RoleNumber] || "user";

  return {
    ...rawUser,
    role: roleString,
    get isAdmin() {
      return this.role === "admin";
    },
  };
}

export type { User, RawUser, LoginForm, RegisterForm };
export { transformUser, ROLES };
