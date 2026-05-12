"use client";
import CartItem from "@/components/shop/cart/CartItem";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, total } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-black text-slate-800 mb-10 tracking-tight">Giỏ hàng của bạn</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center shadow-xl border border-slate-100">
             <p className="text-xl text-slate-500 font-bold">Giỏ hàng đang trống!</p>
             <Link href="/products" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Quay lại</Link>
          </div>
        ) : (
          /* CONTAINER CHÍNH: Ép cứng cấu trúc để không bị nhảy form */
          <div className="flex flex-col lg:flex-row items-start gap-8">
            
            {/* PHẦN TRÁI: DANH SÁCH SẢN PHẨM */}
            <div className="w-full lg:w-2/3 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">
                Sản phẩm ({cart.length})
              </h2>
              <div className="flex flex-col">
                {cart.map((item) => (
                  <div key={item.product_id} className="py-6 border-b border-slate-50 last:border-0">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* PHẦN PHẢI: THANH TOÁN (STICKY) */}
            <div className="w-full lg:w-1/3 sticky top-28">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl">
                <h2 className="text-xl font-black mb-8 text-yellow-400 uppercase tracking-tight border-b border-white/10 pb-4">
                  Thanh toán
                </h2>
                
                <div className="space-y-5 mb-10">
                  <div className="flex justify-between text-slate-400 font-bold text-sm">
                    <span>Tạm tính</span>
                    <span className="text-white">{total.toLocaleString("vi-VN")} ₫</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-bold text-sm">
                    <span>Giao hàng</span>
                    <span className="text-green-400 italic">Miễn phí</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Tổng cộng</span>
                    <span className="text-3xl font-black text-white tracking-tighter">
                      {total.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-900/40 uppercase tracking-widest text-xs">
                    Xác nhận thanh toán
                  </button>
                </Link>

                {/* Sửa chữ bảo mật: Tăng màu slate-400 để dễ đọc hơn trên nền tối */}
                <div className="mt-8 flex items-center justify-center gap-2 opacity-80">
                   <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                   </svg>
                   <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                     Bảo mật bởi Minz Donz Pay
                   </p>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}