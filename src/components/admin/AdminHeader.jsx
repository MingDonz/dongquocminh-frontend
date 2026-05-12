"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const { setUser } = useContext(AuthContext);
  const pathname = usePathname();
  const handleLogout = () => { logout(); setUser(null); };

  const navLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Sản phẩm", href: "/admin/products" },
    { name: "Danh mục", href: "/admin/categories" },
    { name: "Đơn hàng", href: "/admin/orders" },
  ];

  return (
    <header className="w-full px-6 flex items-center justify-between h-16 bg-slate-900 text-white border-b border-slate-800">
      {/* 1. Logo & Nav */}
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-bold tracking-tighter text-white">
          STORE<span className="text-blue-400">ADMIN</span>
        </h1>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                pathname === link.href 
                  ? "bg-blue-600 text-white" // Link đang active
                  : "text-slate-100 hover:bg-slate-800 hover:text-white" // Link bình thường chuyển hẳn sang slate-100 (trắng gần tuyệt đối)
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* 2. User Info & Actions */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Tài khoản</span>
          <span className="text-sm font-semibold text-white">Quản trị viên</span>
        </div>
        
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-bold transition-all shadow-lg active:scale-95"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}