import type { ReactNode } from "react";

//user registration
export interface FormData {
  username: string;
  mobileNumber: string;
  emailId: string;
  password: string;
  lastName: string;
}

//user login
export interface LoginData {
  emailId: string;
  password: string;
}
export interface MainLayoutProps {
  children: ReactNode; // tells TS that children can be any valid React elements
}

export interface AppContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export interface FilterAttributes {
  open: boolean;
  setOpen: (value: boolean) => void;
}
