"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../lib/axios";
import toast from "react-hot-toast";

export default function PublicProfilePage() {
  const { userId } = useParams();
  const { token, logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ slotId: "" });
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch profile and slots
  const fetchProfileAndSlots = () => {
    setLoading(true);
    api.get(`/slots/${userId}`)
      .then(res => {
        const data = res.data.data;
        setProfile({
          name: data.name,
          skills: data.skills,
          bio: data.bio,
        });
        setSlots(data.slots || []);
      })
      .catch(() => toast.error("Failed to load profile or slots"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!userId) return;
    fetchProfileAndSlots();
    // eslint-disable-next-line
  }, [userId]);

  const handleBook = async e => {
    e.preventDefault();
    if (!booking.slotId) return toast.error("Please select a slot");
    setBookingLoading(true);
    try {
      await api.post("/bookings", { slotId: booking.slotId });
      toast.success("Booking successful!");
      setBooking({ slotId: "" });
      fetchProfileAndSlots(); // Refresh slots after booking
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-10">
      <div className="w-full max-w-2xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/pages/public-profiles" className="text-blue-700 hover:underline font-semibold">
          &larr; Public Profiles
        </Link>
        {token && (
          <div className="flex gap-4">
            <Link href="/pages/dashboard" className="text-blue-700 hover:underline font-semibold">
              Dashboard
            </Link>
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
        )}
      </div>
      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : !profile ? (
        <div className="text-gray-500 text-center">Profile not found.</div>
      ) : (
        <div className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded shadow p-6 border border-blue-100 dark:border-neutral-700">
          <div className="mb-4">
            <div className="text-2xl font-bold">{profile.name}</div>
            {profile.bio && (
              <div className="mt-2 text-gray-700 dark:text-gray-300">{profile.bio}</div>
            )}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.skills.map(skill => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <div className="font-semibold mb-2">Available Slots</div>
            {slots.length === 0 ? (
              <div className="text-gray-500">No slots available.</div>
            ) : (
              <ul className="space-y-2">
                {slots.map(slot => (
                  <li
                    key={slot._id}
                    className={`flex items-center justify-between bg-blue-50 dark:bg-blue-900 rounded px-4 py-2 cursor-pointer ${token && slot.status === "available" ? "hover:ring-2 ring-blue-400" : ""
                      }`}
                    onClick={() => {
                      if (token && slot.status === "available") {
                        setBooking({ slotId: slot._id });
                      }
                    }}
                  >
                    <span>
                      {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleTimeString()}{" "}
                      <span className="ml-2 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
                        {slot.status}
                      </span>
                    </span>
                    {token && slot.status === "available" && (
                      <input
                        type="radio"
                        name="slot"
                        value={slot._id}
                        checked={booking.slotId === slot._id}
                        onChange={() => setBooking({ slotId: slot._id })}
                        className="ml-2"
                        onClick={e => e.stopPropagation()} // Prevents double event
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {token && slots.some(slot => slot.status === "available") && (
            <form onSubmit={handleBook} className="mt-6 flex flex-col items-end">
              <button
                type="submit"
                disabled={bookingLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
              >
                {bookingLoading ? "Booking..." : "Book Selected Slot"}
              </button>
            </form>
          )}
        </div>
      )}
    </main>
  );
}