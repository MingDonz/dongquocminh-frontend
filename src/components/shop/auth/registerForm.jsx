"use client";
import { register } from "@/services/authService";
import { validateRegister, isEmpty } from "@/utils/validators";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export const RegisterForm = (props) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateRegister({
      username,
      fullname,
      email,
      pass,
      confirm_password,
    });
    setErrors(validateErrors);
    if (!isEmpty(validateErrors)) return;
    // goi API đăng ký ở đây
    let data = {
      username: username,
      fullname: fullname,
      email: email,
      pass: pass,
    };
    try {
      setLoading(true);
      let res = await register(data);
      console.log(res);
      setSuccess("Register success");
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (e) {
      setErrors({ message: e.data.error })
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div suppressHydrationWarning className="w-full max-w-md bg-gradient-to-br from-blue-100 to-cyan-100 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-blue-300/60 hover:border-blue-400/80 transition-colors duration-300">
      {errors.message && <p className='text-sm text-red-300 bg-red-900/30 border border-red-500/50 rounded p-3 mb-4 backdrop-blur-sm'>{errors.message}</p>}
      {success && <p className='text-sm text-emerald-300 bg-emerald-900/30 border border-emerald-500/50 rounded p-3 mb-4 backdrop-blur-sm'>{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">👤 Tên người dùng</label>
          {errors.username && <p className='text-sm text-red-300 mb-1'>{errors.username}</p>}
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg bg-indigo-900/40 border border-blue-400/30 px-4 py-3 text-blue-100 placeholder-blue-400/60 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
            placeholder="Nhập tên người dùng"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">📝 Họ và tên</label>
          {errors.fullname && <p className='text-sm text-red-300 mb-1'>{errors.fullname}</p>}
          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full rounded-lg bg-indigo-900/40 border border-blue-400/30 px-4 py-3 text-blue-100 placeholder-blue-400/60 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
            placeholder="Nhập họ và tên"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">✉️ Email</label>
          {errors.email && <p className='text-sm text-red-300 mb-1'>{errors.email}</p>}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-indigo-900/40 border border-blue-400/30 px-4 py-3 text-blue-100 placeholder-blue-400/60 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">🔐 Mật khẩu</label>
          {errors.pass && <p className='text-sm text-red-300 mb-1'>{errors.pass}</p>}
          <input
            type="password"
            name="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-lg bg-indigo-900/40 border border-blue-400/30 px-4 py-3 text-blue-100 placeholder-blue-400/60 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">🔒 Xác nhận mật khẩu</label>
          {errors.confirm_password && <p className='text-sm text-red-300 mb-1'>{errors.confirm_password}</p>}
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
            className="w-full rounded-lg bg-indigo-900/40 border border-blue-400/30 px-4 py-3 text-blue-100 placeholder-blue-400/60 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
            placeholder="Nhập lại mật khẩu"
          />
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 text-white font-bold py-3 px-6 hover:from-blue-400 hover:via-cyan-300 hover:to-emerald-400 disabled:opacity-60 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/60 hover:shadow-2xl mt-6 text-lg tracking-wide hover:scale-105 active:scale-95 transform uppercase">
          {loading ? "⏳ Đang kết nối..." : "🚀 Đăng Ký Ngay"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
