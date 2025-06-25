"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../lib/axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace("/pages/public-profiles");
    }
  }, [token, router]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      toast.success("Registration successful!");
      login(res.data.data.token); // Save token in context/localStorage
      router.replace("/pages/public-profiles"); // Redirect after register
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-100 to-blue-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 border border-blue-100 dark:border-neutral-700">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex items-center mb-2">
            <input
              id="show-password"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((v) => !v)}
              className="mr-2"
            />
            <label htmlFor="show-password" className="text-sm text-gray-600 dark:text-gray-300">Show Password</label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/pages/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}