"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function PublicProfilesPage() {
  const { token, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users")
      .then(res => setProfiles(res.data.data))
      .catch(() => toast.error("Failed to load profiles"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-10">
      <div className="w-full max-w-2xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-blue-700 hover:underline font-semibold">
          &larr; Home
        </Link>
        <div className="flex gap-4">
          {token && (
            <>
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
            </>
          )}
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-8">Public Profiles</h1>
      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {profiles.length === 0 && (
            <div className="text-gray-500 text-center">No profiles found.</div>
          )}
          {profiles.map(profile => (
            <div
              key={profile._id}
              className="bg-white dark:bg-neutral-800 rounded shadow p-6 border border-blue-100 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold">{profile.name}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{profile.email}</div>
                </div>
                <Link
                  href={`/pages/public/${profile._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  View Profile
                </Link>
              </div>
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
          ))}
        </div>
      )}
    </main>
  );
}