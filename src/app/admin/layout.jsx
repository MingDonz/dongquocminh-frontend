"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/shop/Footer";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";

export default function AdminLayout({ children }) {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Chỉ check auth sau khi provider load xong user từ localStorage
    if (!isLoading) {
      if (!user || user.user_type !== "admin") {
        router.push("/"); // hoặc page "Không đủ quyền"
      }
    }
  }, [user, isLoading, router]);

  // Nếu đang load hoặc chưa login hoặc không phải admin → không render children
  if (isLoading || !user || user.user_type !== "admin") {
    return null; // hoặc <p>Loading...</p>
  }
  
return (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    {/* Header tràn viền hoàn toàn */}
    <div className="sticky top-0 z-50 w-full bg-slate-900 shadow-md">
      <AdminHeader />
    </div>

    {/* Phần nội dung chính */}
    <main className="flex-1 w-full">
      {/* Loại bỏ container giới hạn chiều rộng để tràn viền */}
      <div className="w-full"> 
        {/* Nội dung bên trong vẫn cần một chút padding để không dính sát chữ vào mép màn hình */}
        <div className="p-4 lg:p-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[calc(100vh-160px)]">
            {children}
          </div>
        </div>
      </div>
    </main>

    <footer className="w-full py-4 border-t border-slate-200 bg-white">
      <Footer />
    </footer>
  </div>
);
}
 