"use client";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();

  // 1. Xử lý logic ảnh giống Product Card để tránh lỗi 404
  const placeholderUrl = `https://picsum.photos/seed/${product?.product_id || 'detail'}/800/800`;
  const imageUrl = product?.image 
    ? `${process.env.NEXT_PUBLIC_IMG_URL}${product.image}`
    : placeholderUrl;

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl">
        <p className="text-red-500 font-bold">Không tìm thấy sản phẩm.</p>
      </div>
    );
  }

  const priceValue = Number(product.price ?? 0);
  const formattedPrice = !isNaN(priceValue) ? formatCurrency(priceValue) : "0 ₫";

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row gap-12 items-center">
      
      {/* 2. Cột trái: Container ảnh nâng cấp */}
      <div className="w-full md:w-1/2 group">
        <div className="relative aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-8 transition-all duration-500 group-hover:border-blue-200 group-hover:shadow-inner">
          {/* Badge trang trí giống Product Card */}
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-blue-200 uppercase tracking-widest">
              Premium
            </span>
          </div>

          <img
            src={imageUrl}
            alt={product.product_name || "Sản phẩm"}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = placeholderUrl; 
            }}
          />
        </div>
      </div>

      {/* 3. Cột phải: Thông tin sản phẩm */}
      <div className="w-full md:w-1/2 flex flex-col h-full">
        <div className="flex-1">
          <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">
            ✨ Chi tiết sản phẩm
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight mb-4 tracking-tighter">
            {product.product_name}
          </h2>
          
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-xl mb-6">
            <p className="text-4xl font-black text-blue-600 tracking-tighter">
              {formattedPrice}
            </p>
          </div>

          <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 mb-8">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Mô tả sản phẩm</h4>
            <p className="text-slate-600 leading-relaxed text-base">
              {product.description ?? "Sản phẩm cao cấp được tuyển chọn kỹ lưỡng, mang lại chất lượng và trải nghiệm tốt nhất cho người dùng."}
            </p>
          </div>
        </div>

        {/* Nút bấm đồng bộ với phong cách Dark Mode của Header/Footer */}
        <button 
          onClick={() => addToCart(product)} 
          className="w-full bg-slate-900 text-white font-black px-8 py-5 rounded-2xl 
                     hover:bg-blue-600 transition-all duration-300 transform active:scale-95 
                     shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 
                     uppercase tracking-[0.15em] text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}