"use client";
import React, { useState } from "react";
import CartPage from "../cart/page";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  const [formData, setFormData] = useState({
    user_id: user?.user_id || "",
    customer_name: user?.fullname || "",
    address: "",
    phone: "",
    email: user?.email || "",
    note: "",
    status: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-[#f1f5f9] py-16 flex justify-center items-start relative overflow-hidden">
      
      {/* Background Blobs - Giữ nhẹ nhàng để không làm rối mắt */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] z-0" />
      
      <div className="w-full max-w-6xl mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          
          {/* CỘT TRÁI: Đã giảm độ bo góc xuống mức 2xl (1rem) để hài hòa với Input */}
          <div className="w-full lg:w-[60%] h-fit bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-md shadow-blue-100">
                1
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Thông Tin Giao Hàng</h2>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Họ và tên</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                    placeholder="09xx xxx xxx"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Địa chỉ giao hàng</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="Số nhà, tên đường, phường/xã..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Ghi chú (Shipper)</label>
                <textarea
                  name="note"
                  rows="3"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm"
                  placeholder="Lưu ý khi giao hàng..."
                ></textarea>
              </div>
            </form>
          </div>

          {/* CỘT PHẢI: Đồng bộ độ bo góc 2xl */}
          <div className="w-full lg:w-[40%] h-fit sticky top-10">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h2 className="text-lg font-bold text-slate-800">Đơn hàng</h2>
              </div>
              
              <div className="px-4 py-2 max-h-[35vh] overflow-y-auto custom-scrollbar">
                <CartPage isCheckoutView={true} />
              </div>

              <div className="p-6 bg-slate-50/50 space-y-3">
                <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                  <span>Tạm tính</span>
                  <span>{cart?.totalPrice?.toLocaleString()} đ</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                  <span>Vận chuyển</span>
                  <span className="text-green-600 font-black italic">FREE</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-slate-900 font-bold text-base">TỔNG CỘNG</span>
                    <span className="text-blue-600 font-black text-xl tracking-tight">
                      {cart?.totalPrice?.toLocaleString()} đ
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100"
                  >
                    XÁC NHẬN ĐẶT HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;