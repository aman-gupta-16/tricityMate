"use client"; // Required for client-side hooks and logic in Next.js

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { USER_END_POINT } from "@/lib/constant";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Header from "@/components/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending POST request to login endpoint
      const { data } = await axios.post(`${USER_END_POINT}/login`, {
        email,
        password,
      });
      login(data);

      // If login is successful, redirect to the dashboard or home
      router.push("/profile");
      toast.success("welcome back");
    } catch (error) {
      // Handle errors (e.g., incorrect credentials)
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100 dark:bg-slate-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-white">
            Sign in to your account
          </h2>
          {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 dark:hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 dark:focus-visible:outline-slate-500"
              >
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Not registered yet?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-slate-800 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
