"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
export default function Userinfo() {
  const { user, setUser } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        setUser(null);
    };

  return (
    <div className="flex items-center space-x-2">
      {!user ? (
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-300 hover:shadow-lg transition-all duration-300 shadow-lg text-sm"
        >
          🔐 Login
        </Link>
      ) : (
        <>
          <Link
            href="/profile"
            className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all duration-300 shadow-lg text-sm"
          >
            👤 Profile
          </Link>
          <button onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg text-sm"
          >
            ⏚ Logout
          </button>
        </>
      )}
    </div>
  );
}
