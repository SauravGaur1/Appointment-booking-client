"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Spinner from "@/components/ui/Spinner";
import Card from "@/components/ui/Card";
import PageTitle from "@/components/ui/PageTitle";
import dayjs from "dayjs";
import Link from "next/link";

const MyBookingsPage = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("bookings/my-bookings");
        setBookings(res.data.data || []);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <header className="mb-8 flex items-center justify-between">
          <PageTitle>My Bookings</PageTitle>
          <Link href="/pages/dashboard" className="text-blue-600 hover:underline font-medium text-sm">
            &larr; Back to Dashboard
          </Link>
        </header>
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No bookings found.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking._id} className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-lg">
                    {booking.slot?.professionalId?.name || "Professional"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.slot?.professionalId?.email}
                  </div>
                  <div className="mt-2">
                    <span className="font-medium">Date:</span> {dayjs(booking.slotId?.date).format("DD MMM YYYY")}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {booking.slotId?.startTime ? new Date(booking.slotId?.startTime).toLocaleString() : "--"} - {booking.slotId?.endTime ? new Date(booking.slotId?.endTime).toLocaleTimeString() : "--"}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-sm text-gray-400">
                  Booked on {dayjs(booking.createdAt).format("DD MMM YYYY, HH:mm")}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MyBookingsPage;
