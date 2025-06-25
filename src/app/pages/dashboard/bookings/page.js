"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../lib/axios";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const { logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/mine")
      .then(res => setBookings(res.data.data))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-10">
      <div className="w-full max-w-2xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/pages/dashboard" className="text-blue-700 hover:underline font-semibold">
          &larr; Dashboard
        </Link>
        <div className="flex gap-4">
          <Link href="/pages/profile" className="text-blue-700 hover:underline font-semibold">
            My Profile
          </Link>
          <Link href="/pages/public-profiles" className="text-blue-700 hover:underline font-semibold">
            Public Profiles
          </Link>
          <button
            onClick={logout}
            className="text-red-600 hover:underline font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded shadow p-6 border border-blue-100 dark:border-neutral-700">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        {loading ? (
          <div>Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-500">No bookings found.</div>
        ) : (
          <ul className="space-y-3">
            {bookings.map(booking => (
              <li
                key={booking._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 dark:bg-blue-900 rounded px-4 py-2"
              >
                <div>
                  <div>
                    <span className="font-semibold">Client:</span>{" "}
                    {booking.userId?.name || "N/A"} ({booking.userId?.email || "N/A"})
                  </div>
                  <div>
                    <span className="font-semibold">Slot:</span>{" "}
                    {new Date(booking.slotId?.startTime).toLocaleString()} - {new Date(booking.slotId?.endTime).toLocaleTimeString()}
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs">
                    {booking.status || "Booked"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}