import { useState } from "react";

export default function Search({setParams, params}) {
    const [searchKey, setSearchkey] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        setParams((prev)=>({
            ...prev,
            name: searchKey
        }))
    }
  return (
    <div className="w-full">
      <form className="grid gap-3 w-full" onSubmit={handleSubmit}>
        {/* Ô Input: Đổi từ màu tối sang màu sáng để tăng tương phản */}
        <div className="relative group">
          <input
            type="search"
            name="keyword"
            value={searchKey}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-100 rounded-xl 
                       text-sm font-medium text-slate-700 placeholder:text-slate-400
                       shadow-sm shadow-slate-200/50
                       focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
                       outline-none transition-all duration-300"
            onChange={(e) => setSearchkey(e.target.value)}
          />
          {/* Icon Search thay cho emoji để nhìn chuyên nghiệp hơn */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Nút Tìm kiếm: Chuyển sang tông xanh dương (Blue) của hệ thống */}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest
                     hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Tìm kiếm ngay
        </button>
      </form>
    </div>
  );
}