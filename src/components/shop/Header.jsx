"use client";
import React from "react";
import Link from "next/link";
import Userinfo from "./auth/userinfo";
import Menu from "./Menu";
import { shopMenu } from "@/data/menu";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-gray-900 to-black shadow-2xl border-b border-yellow-400/30 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. LOGO SECTION */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="group select-none">
              <div 
                className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tighter transition-all duration-300 group-hover:scale-105" 
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
              >
                Minz Donz <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">Shop</span>
              </div>
            </Link>
          </div>

          {/* 2. CENTER NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 font-bold flex-1 justify-center px-6">
            {['Trang chủ', 'Sản phẩm', 'Trang', 'Bài viết', 'Liên hệ'].map((item, index) => {
              const paths = ['/', '/products', '/pages', '/posts', '/contact'];
              return (
                <Link 
                  key={index} 
                  href={paths[index]} 
                  className="text-gray-400 hover:text-white transition-all duration-300 relative group text-sm uppercase tracking-widest"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#facc15]"></span>
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT ACTIONS (CART & USER) */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Cụm Giỏ hàng - Thiết kế hiện đại hơn */}
            <Link href="/cart" className="relative p-2 group transition-all active:scale-90">
              <div className="relative">
                <svg 
                  className="w-7 h-7 text-white group-hover:text-yellow-400 transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {/* Badge thông báo số lượng nổi bật */}
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-900 animate-in fade-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            {/* Vạch chia ngăn cách nhẹ giữa Cart và User */}
            <div className="hidden sm:block h-6 w-[1px] bg-gray-800 mx-1"></div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Menu items={shopMenu} />
            </div>

            {/* Khu vực UserInfo - Được bọc lại cho dễ tiếp cận */}
            <div className="hidden sm:block">
              <div className="hover:opacity-90 transition-opacity">
                <Userinfo />
              </div>
            </div>

          </div>

        </div>
      </div>
      
      {/* Một dải line vàng mỏng dưới cùng để tăng tính nhận diện thương hiệu */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
    </header>
  );
}