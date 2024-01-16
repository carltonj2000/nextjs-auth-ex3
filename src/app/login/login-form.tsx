"use client";

import { login } from "@/app/login/actions";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUserName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username);
  };

  return (
    <div className="flex flex-col mt-5 mx-auto">
      <form
        className="flex flex-row space-x-3 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="username" className="mr-3">
            Username:
          </label>
          <input
            id="username"
            name="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="text-gray-400"
          />
        </div>
        <button className="border border-gray-400 px-2 py-1" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
