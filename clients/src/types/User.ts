export interface User {
  username: string;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  photo_url?: string;
  provider?: string;
}

export interface UserRegister extends Omit<User, "photo_url" | "provider"> {
  agreedToTerms: boolean;
}

export interface UserLogin {
  username: string;
  password: string;
}
