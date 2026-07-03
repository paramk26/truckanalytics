"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type AuthUser = {
  username: string;
  role: string;
};

type LoginResponse = {
  access_token: string;
  role: string;
};

interface AuthContextType {
  user: AuthUser | null;
  login: (
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(
  null
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (
    username: string,
    password: string
  ) => {
    const response = await fetch(
      "http://127.0.0.1:8002/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = (await response.json()) as LoginResponse;

    localStorage.setItem(
      "token",
      data.access_token
    );

    setUser({
      username,
      role: data.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
