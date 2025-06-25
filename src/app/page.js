"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/pages/public-profiles");
    }
  }, [token, router]);

  // If logged in, redirect will happen. Otherwise, show landing page:
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-100 to-blue-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950">
      <div className="w-full max-w-2xl text-center shadow-2xl border border-blue-200 dark:border-neutral-700 rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Appointment Booking Platform</h1>
        <p className="mb-8 text-lg text-gray-800 dark:text-gray-200">
          Book appointments, manage your slots, and connect with professionals easily.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/pages/register">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold">Register</button>
          </Link>
          <Link href="/pages/login">
            <button className="w-full bg-white text-blue-700 border border-blue-600 hover:bg-blue-50 dark:bg-neutral-900 dark:text-blue-400 dark:border-blue-400 px-6 py-2 rounded font-semibold">Login</button>
          </Link>
          <Link href="/pages/public-profiles">
            <button className="w-full bg-blue-100 text-blue-900 border border-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800 px-6 py-2 rounded font-semibold">Browse Public Profiles</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800">
            <div className="font-semibold mb-2">Book Appointments</div>
            <div className="text-sm">Find professionals and book slots in seconds.</div>
          </div>
          <div className="p-4 rounded bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800">
            <div className="font-semibold mb-2">Manage Your Slots</div>
            <div className="text-sm">Professionals can add, edit, and delete their available slots.</div>
          </div>
          <div className="p-4 rounded bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800">
            <div className="font-semibold mb-2">Share Public Profile</div>
            <div className="text-sm">Share your profile and let clients book you directly.</div>
          </div>
        </div>
      </div>
    </main>
  );
}