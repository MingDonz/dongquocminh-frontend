import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductList({ products, title, icon, accentColor = "blue", isDark = false }) {
  const productList = Array.isArray(products) ? products : [];

  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    red: "text-red-600 bg-red-50 border-red-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    amber: "text-amber-500 bg-amber-50 border-amber-100",
  };

  return (
    /* Thêm py-12 để các section không dính vào nhau */
    <div className={`py-12 ${isDark ? 'px-8 md:px-12' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3">
          {/* Tag tiêu đề nhỏ */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-white/10 border-white/20 text-yellow-400' : colors[accentColor]}`}>
            <span>{icon}</span>
            <span>{title}</span>
          </div>
          {/* Tiêu đề chính */}
          <h2 className={`text-3xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h2>
        </div>
        
        <Link 
          href="/products" 
          className={`group flex items-center gap-2 font-bold text-sm transition-all ${isDark ? 'text-slate-400 hover:text-yellow-400' : 'text-slate-500 hover:text-blue-600'}`}
        >
          Xem tất cả 
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productList.map((p, index) => (
          <div key={p.product_id || index}>
            <ProductCard product={p} isDarkTheme={isDark} />
          </div>
        ))}
      </div>
    </div>
  );
}