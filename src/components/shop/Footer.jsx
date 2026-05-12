import React from 'react'
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-900 via-gray-800 to-gray-900 mt-16 border-t-4 border-blue-400 text-white shadow-2xl">
      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 w-full">
          {/* About Section */}
          <div className="hover:transform hover:scale-105 transition-all duration-300 p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl sm:text-3xl">✨</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Về Cửa Hàng</h3>
            </div>
            <p className="text-gray-200 text-sm sm:text-base leading-6">
              Cửa hàng trực tuyến chuyên cung cấp các sản phẩm chất lượng cao, giá tốt nhất thị trường. Hỗ trợ khách hàng 24/7.
            </p>
          </div>

          {/* Links Section */}
          <div className="hover:transform hover:scale-105 transition-all duration-300 p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl sm:text-3xl">📍</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Thông Tin</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/pages" className="text-gray-200 text-sm sm:text-base hover:text-blue-300 transition-all duration-300 inline-flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Trang thông tin
                </a>
              </li>
              <li>
                <a href="/posts" className="text-gray-200 text-sm sm:text-base hover:text-blue-300 transition-all duration-300 inline-flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Bài viết
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-200 text-sm sm:text-base hover:text-blue-300 transition-all duration-300 inline-flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="hover:transform hover:scale-105 transition-all duration-300 p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl sm:text-3xl">💬</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Hỗ Trợ</h3>
            </div>
            <div className="text-gray-200 text-sm sm:text-base space-y-3">
              <p className="hover:text-blue-300 transition-colors cursor-pointer inline-flex items-center gap-2">
                <span>📧</span> support@shop.vn
              </p>
              <p className="hover:text-blue-300 transition-colors cursor-pointer inline-flex items-center gap-2">
                <span>📞</span> (84) 123-456-789
              </p>
              <p className="hover:text-blue-300 transition-colors cursor-pointer inline-flex items-center gap-2">
                <span>⏰</span> 8:00 - 22:00 (Hàng ngày)
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hover:transform hover:scale-105 transition-all duration-300 p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl sm:text-3xl">🔗</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">Liên Kết</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-200 text-sm sm:text-base hover:text-blue-300 transition-all duration-300 inline-flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-200 text-sm sm:text-base hover:text-blue-300 transition-all duration-300 inline-flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="/posts" className="text-gray-200 text-sm sm:text-base hover:text-blue-300 transition-all duration-300 inline-flex items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Cộng đồng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8 sm:my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-300 text-xs sm:text-sm">
            © 2026 <span className="font-bold text-blue-300">Minz Donz Shop</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <a href="#" className="hover:text-blue-300 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-300 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

