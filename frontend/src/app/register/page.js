"use client"; // Required for using hooks and client-side logic in Next.js

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation"; // Using router for redirection after successful registration
import { USER_END_POINT } from "@/lib/constant";
import { toast } from "react-toastify";
import Header from "@/components/Header";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend
      const response = await axios.post(`${USER_END_POINT}/register`, {
        name,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        // If registration is successful, you can redirect the user to the login page
        router.push("/login");
        toast.success("successfully registered");
      }
    } catch (error) {
      // Handle error (e.g., user already exists, validation failed, etc.)
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8 bg-slate-100 dark:bg-slate-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-white">
            Create an account
          </h2>
          {error && <p className="mt-3 text-red-500">{error}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
              >
                Name
              </Label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
              >
                Email address
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
              >
                Password
              </Label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <RadioGroup
              value={role}
              onValueChange={(value) => setRole(value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 dark:hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 dark:focus-visible:outline-slate-500"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
