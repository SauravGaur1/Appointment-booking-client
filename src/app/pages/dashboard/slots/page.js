"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../lib/axios";
import toast from "react-hot-toast";

export default function MySlotsPage() {
  const { logout } = useAuth();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchSlots = () => {
    setLoading(true);
    api.get("/slots/mine")
      .then(res => setSlots(res.data.data))
      .catch(() => toast.error("Failed to load slots"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAddSlot = async e => {
    e.preventDefault();
    if (!date || !startTime || !endTime) {
      toast.error("Please provide date, start time, and end time");
      return;
    }
    setAdding(true);
    try {
      const startISO = new Date(`${date}T${startTime}`).toISOString();
      const endISO = new Date(`${date}T${endTime}`).toISOString();
      await api.post("/slots", { date, startTime: startISO, endTime: endISO });
      toast.success("Slot added!");
      setDate("");
      setStartTime("");
      setEndTime("");
      fetchSlots();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add slot");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async slotId => {
    if (!window.confirm("Delete this slot?")) return;
    try {
      await api.delete(`/slots/${slotId}`);
      toast.success("Slot deleted!");
      fetchSlots();
    } catch (err) {
      toast.error("Failed to delete slot");
    }
  };

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
        <h1 className="text-2xl font-bold mb-6">My Slots</h1>
        <form onSubmit={handleAddSlot} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
          <button
            type="submit"
            disabled={adding}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded font-semibold"
          >
            {adding ? "Adding..." : "Add Slot"}
          </button>
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : slots.length === 0 ? (
          <div className="text-gray-500">No slots found.</div>
        ) : (
          <ul className="space-y-3">
            {slots.map(slot => (
              <li
                key={slot._id}
                className="flex items-center justify-between bg-blue-50 dark:bg-blue-900 rounded px-4 py-2"
              >
                <span>
                  {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleTimeString()}
                </span>
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}