// src/components/common/Pagination.jsx
import React from "react";

export default function Pagination({
  totalPages = 1,
  params = {},
  onChangeParams,
}) {
  // 1. Ép kiểu dữ liệu để so sánh chính xác
  const currentPage = Number(params.page) || 1;

  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPages, currentPage + 3);

  // 2. Logic xử lý khi click trang
  const handleClick = (newPage) => {
    const pageNum = Number(newPage);
    if (pageNum < 1 || pageNum > totalPages || pageNum === currentPage) return;

    if (onChangeParams) {
      onChangeParams({
        ...params, // Giữ lại các params khác như limit, search...
        page: pageNum,
      });
    }
  };

  // 3. ĐỊNH NGHĨA CLASS TẠI ĐÂY (PHẢI TRƯỚC RETURN)[cite: 1]
  const buttonClass = (isActive) =>
    `px-3 py-2 mx-1 rounded-lg font-medium text-sm transition-all duration-300 ease-out ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105"
        : "bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md hover:scale-105"
    }`;

  const disabledClass = "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none hover:bg-white border-gray-200";

  return (
    <div id="pagination" className="flex flex-wrap justify-center items-center gap-2 py-6">
      {/* Nút First */}
      <button
        onClick={() => handleClick(1)}
        disabled={currentPage <= 1}
        className={`${buttonClass(false)} ${currentPage <= 1 ? disabledClass : ""}`}
      >
        ⏮ First
      </button>

      {/* Nút Previous */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${buttonClass(false)} ${currentPage <= 1 ? disabledClass : ""}`}
      >
        ← Previous
      </button>

      <div className="h-6 w-px bg-gray-300 mx-1" />

      {/* Danh sách số trang */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const p = startPage + i;
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => handleClick(p)}
            className={`${buttonClass(isActive)} ${isActive ? "cursor-default" : "cursor-pointer"}`}
          >
            {p}
          </button>
        );
      })}

      <div className="h-6 w-px bg-gray-300 mx-1" />

      {/* Nút Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${buttonClass(false)} ${currentPage >= totalPages ? disabledClass : ""}`}
      >
        Next →
      </button>

      {/* Nút Last */}
      <button
        onClick={() => handleClick(totalPages)}
        disabled={currentPage >= totalPages}
        className={`${buttonClass(false)} ${currentPage >= totalPages ? disabledClass : ""}`}
      >
        Last ⏭
      </button>
    </div>
  );
}