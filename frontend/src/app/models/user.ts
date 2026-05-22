export interface User {
  name: string; // Keep name optional via '?' since it is used for register but not login
  email: string;
  password: string;
}
