"use client";

export default function PageTitle({ children, className = "" }) {
  return (
    <h2 className={`text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </h2>
  );
}
