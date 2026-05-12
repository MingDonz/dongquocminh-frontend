import React from 'react'
import RegisterForm from '@/components/shop/auth/registerForm'
import Link from 'next/link'

export default function page() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-10 px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4 flex-wrap mb-3">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent animate-pulse">✨ Đăng Ký</h1>
          <Link href="/login">
            <button className="rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 text-white font-bold py-3 px-6 hover:from-blue-400 hover:via-cyan-300 hover:to-emerald-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/60 text-lg tracking-wide hover:scale-105 active:scale-95 transform">
              🔐 Đăng Nhập
            </button>
          </Link>
        </div>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto rounded-full"></div>
      </div>
      <RegisterForm />
    </div>
  )
}
