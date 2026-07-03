"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/contexts/AuthContext";

export default function LoginPage() {
  const {
    login,
  } = useAuth();

  const router =
    useRouter();

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await login(
          username,
          password
        );

        router.push(
          "/dashboard"
        );
      } catch {
        alert(
          "Invalid credentials"
        );
      }
    };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      "
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        w-96
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-6
          text-center
          "
        >
          SWS Invoice
        </h1>

        <input
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <input
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="
          w-full
          bg-black
          text-white
          p-3
          rounded
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}