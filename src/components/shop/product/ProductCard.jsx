import Link from "next/link"; // Thêm dòng này để hết lỗi "Link is not defined"

export default function ProductCard({ product, isDarkTheme = false }) {
  const placeholderUrl = `https://picsum.photos/seed/${product.product_id || 'minzdonz'}/500/500`;

  const imageUrl = product.image 
    ? `${process.env.NEXT_PUBLIC_IMG_URL}${product.image}`
    : placeholderUrl;

  return (
    <div className="h-full group">
      <article className={`relative h-full flex flex-col ${isDarkTheme ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-100'} rounded-[2rem] p-5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,112,184,0.1)] hover:-translate-y-2 overflow-hidden`}>
        
        {/* Badge trang trí */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-blue-200 uppercase tracking-wider">
            New
          </span>
        </div>

        <Link href={`/products/${product.product_id || product.id}`} className="flex-1 block">
          <div className="relative aspect-square bg-slate-50 rounded-[1.5rem] overflow-hidden mb-5 border border-slate-50 transition-colors group-hover:border-blue-100">
            <img 
              src={imageUrl} 
              alt={product.product_name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = placeholderUrl; 
              }}
            />
          </div>

          <h3 className={`text-base font-bold transition-colors duration-300 mb-2 line-clamp-2 min-h-[3rem] leading-tight ${isDarkTheme ? 'text-slate-300 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>
            {product.product_name}
          </h3>
          
          <div className="mb-5">
            <p className={`text-xl font-black tracking-tighter ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
              {product.price?.toLocaleString('vi-VN')} ₫
            </p>
          </div>
        </Link>
        
        <button 
          className="w-full bg-slate-900 text-white text-xs font-black py-4 px-4 rounded-2xl 
                     hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 
                     transition-all duration-300 transform active:scale-95 
                     flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Thêm vào giỏ
        </button>
      </article>
    </div>
  );
}