"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/pages/login");
    }
  }, [token, loading, router]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!token) {
    return null; // Or a spinner
  }

  return children;
}