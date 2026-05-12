import { adminMenu } from "@/data/adminMenu";

export default function Sidebar() {
  return (
    <aside className="w-72 fixed inset-y-0 left-0 z-50 bg-slate-900 shadow-2xl flex flex-col">
  {/* Logo / Brand Name */}
  <div className="p-6 border-b border-slate-800">
    <h2 className="text-2xl font-bold text-white tracking-tight">
      Store<span className="text-blue-500">Admin</span>
    </h2>
  </div>

  {/* Navigation Links */}
  <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
    <a href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-200 group">
      <span className="font-medium">Dashboard</span>
    </a>
    
    <a href="/admin/products" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md transition-all">
      <span className="font-medium">Products</span>
    </a>

    <a href="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all">
      <span className="font-medium">Categories</span>
    </a>

    {/* Thêm các mục khác tương tự... */}
  </nav>

  {/* Footer Sidebar (Tùy chọn) */}
  <div className="p-4 border-t border-slate-800">
    <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex-center text-white text-xs">AD</div>
      <div className="overflow-hidden">
        <p className="text-xs font-medium text-white truncate">Min Don</p>
        <p className="text-[10px] text-slate-400">Quản trị viên</p>
      </div>
    </div>
  </div>
</aside>
  );
}
