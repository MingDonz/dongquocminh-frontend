import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white border-b border-gray-100 py-4 gap-4">
      {/* Thông tin sản phẩm */}
      <div className="flex-1 w-full">
        <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2">
          {item.product_name}
        </h3>
        <p className="text-xs text-gray-500">
          Đơn giá: <span className="font-semibold text-blue-600">{item.price.toLocaleString("vi-VN")} ₫</span>
        </p>
      </div>

      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
        {/* Bộ tăng giảm số lượng */}
        <div className="flex flex-col items-center gap-1.5">
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
            Số lượng
          </label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden h-9">
            <button
              onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
              className="w-8 h-full flex items-center justify-center hover:bg-slate-200 text-gray-600 transition-colors font-bold"
            >
              -
            </button>
            <input
              type="text" // Đổi sang text để không bị dính spin-button của trình duyệt
              readOnly // Tránh người dùng nhập linh tinh làm lỗi logic
              value={item.quantity}
              className="w-10 h-full text-center bg-transparent text-sm font-bold text-gray-700 focus:outline-none"
            />
            <button
              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
              className="w-8 h-full flex items-center justify-center hover:bg-slate-200 text-gray-600 transition-colors font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Thành tiền & Nút Xóa */}
        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Thành tiền</p>
          <p className="text-base font-black text-slate-800">
            {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
          </p>
          
          {/* Nút Xóa được làm lại cho giống Button thực thụ */}
          <button 
            onClick={() => removeFromCart(item.product_id)}
            className="mt-1 flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all active:scale-95 border border-red-100"
          >
            <span className="text-xs font-bold uppercase tracking-tighter">Xóa</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}