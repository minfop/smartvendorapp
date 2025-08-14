import React from "react";

export default function Topbar({ username = "Jane Doe", role = "CS Manager" }) {
  // Get initials from username
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div class="h-20 bg-white shadow-md flex items-center justify-between px-6">
    <div class="text-2xl font-semibold">Dashboard</div>
    <div class="flex items-center space-x-4">
        <span>{username} ({role})</span>
        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
    </div>
</div>
  );
} 