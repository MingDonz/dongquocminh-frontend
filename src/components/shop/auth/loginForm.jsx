"use client";
import { AuthContext } from "@/context/AuthProvider";
import { login } from "@/services/authService";
import { validateLogin, isEmpty } from "@/utils/validators";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateLogin({
      username,
      pass,
    });
    setErrors(validateErrors);
    if (!isEmpty(validateErrors)) return;
    // goi API đăng nhập ở đây
    let data = {
      username: username,
      pass: pass,
    };
    try {
      setLoading(true);
      let res = await login(data);
      console.log(res);
      setSuccess("Login success");
      setUser(res.user);
      setTimeout(() => {
        if (res.user.user_type == "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 2000);

    } catch (e) {
      setErrors({ message: e.data.error })
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-blue-100 to-cyan-100 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-blue-300/60 hover:border-blue-400/80 transition-colors duration-300">
      {errors.message && <p className='text-sm text-red-300 bg-red-900/30 border border-red-500/50 rounded p-3 mb-4 backdrop-blur-sm'>{errors.message}</p>}
      {success && <p className='text-sm text-emerald-300 bg-emerald-900/30 border border-emerald-500/50 rounded p-3 mb-4 backdrop-blur-sm'>{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-blue-700 mb-2">👤 Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg bg-indigo-900/40 border border-blue-400/30 px-4 py-3 text-blue-100 placeholder-blue-400/60 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
            placeholder="Nhập tên đăng nhập"
          />
          {errors.username && <p className="mt-2 text-sm text-red-300">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="pass" className="block text-sm font-medium text-blue-700 mb-2">🔐 Mật khẩu</label>
          <input
            id="pass"
            type="password"
            name="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-lg bg-indigo-900/40 border border-blue-400/30 px-4 py-3 text-blue-100 placeholder-blue-400/60 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
            placeholder="Nhập mật khẩu"
          />
          {errors.pass && <p className="mt-2 text-sm text-red-300">{errors.pass}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 text-white font-bold py-3 px-6 hover:from-blue-400 hover:via-cyan-300 hover:to-emerald-400 disabled:opacity-60 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/60 hover:shadow-2xl mt-6 text-lg tracking-wide hover:scale-105 active:scale-95 transform uppercase"
        >
          {loading ? "⏳ Đang kết nối..." : "🚀 Đăng Nhập Ngay"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
