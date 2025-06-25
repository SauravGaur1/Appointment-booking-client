"use client";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-10">
      <div className="w-full max-w-2xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/pages/public-profiles" className="text-blue-700 hover:underline font-semibold">
          &larr; Public Profiles
        </Link>
        <div className="flex gap-4">
          <Link href="/pages/profile" className="text-blue-700 hover:underline font-semibold">
            My Profile
          </Link>
          <button
            onClick={logout}
            className="text-red-600 hover:underline font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded shadow p-8 border border-blue-100 dark:border-neutral-700 text-center">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/pages/dashboard/slots">
            <button className="px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 w-full">
              Slots Manager
            </button>
          </Link>
          <Link href="/pages/dashboard/bookings">
            <button className="px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 w-full">
              My Appointments
            </button>
          </Link>
          <Link href="/pages/my-bookings">
            <button className="px-6 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700 w-full">
              Appointments Made By Me
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}