"use client";
import Loading from "@/components/common/loading";
import Pagination from "@/components/common/Pagination";
import { getPages } from "@/services/pageService";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PagesPage() {
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
    status: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPages(params);
        const pagesData = Array.isArray(data) ? data : data?.data || [];
        const normalizedPages = pagesData.map(page => ({
          ...page,
          title: page.title || page.page_name || page.name || "",
          page_id: page.page_id || page.id,
        }));
        setPages(normalizedPages);
        setTotalPages(data?.totalPage || data?.totalPages || 0);
      } catch (e) {
        setErrors({ message: e.message || "Lấy danh sách trang thất bại" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  if (loading && pages.length === 0) return <Loading />;

  return (
    <>
      <div className="min-h-[70vh] bg-white py-12">
        <div className="max-w-5xl mx-auto p-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-3">Danh sách Trang</h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {errors.message && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            {errors.message}
          </div>
        )}

        {pages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl">✨ Không có trang nào ✨</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pages.map((page, idx) => (
              <Link key={page.page_id} href={`/pages/${page.page_id}`}>
                <div className="group relative overflow-hidden rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-400 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 flex-1">{page.title}</h2>
                      <span className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300 ml-2">→</span>
                    </div>
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-4 text-sm leading-relaxed">{page.content}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 group-hover:border-blue-200 transition-colors duration-300">
                      <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        {new Date(page.updated_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && <Pagination totalPages={totalPages} params={params} onChangeParams={setParams} />}
        </div>
      </div>
    </>
  );
} 