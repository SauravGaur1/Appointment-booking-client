"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
// If you use Zod, import and use it as in your existing code.

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

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
      const res = await api.post("/auth/login", form);
      toast.success("Login successful!");
      login(res.data.data.token);
      router.replace("/pages/public-profiles"); // Redirect after login
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-100 to-blue-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 border border-blue-100 dark:border-neutral-700">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/pages/register" className="text-blue-700 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}