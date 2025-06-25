"use client";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
