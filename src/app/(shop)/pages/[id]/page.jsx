"use client";
import Loading from "@/components/common/loading";
import { getPageById } from "@/services/pageService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPageById(id);
        const normalizedPage = {
          ...data,
          title: data.title || data.page_name || data.name || "",
        };
        setPage(normalizedPage);
      } catch (e) {
        setErrors({ message: e.message || "Lấy trang thất bại" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  if (errors.message) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-6 text-lg">{errors.message}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-semibold"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-purple-300 text-lg">✨ Không tìm thấy trang ✨</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <article className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
        >
          ← Quay lại
        </button>

        <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-md border border-purple-400/30 rounded-2xl p-8 md:p-12">
          <header className="mb-10 pb-8 border-b border-purple-400/20">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4 leading-tight">
              {page.title}
            </h1>
            <div className="flex flex-col gap-2 text-purple-300/80 text-sm">
              <p>📅 {new Date(page.created_at).toLocaleString('vi-VN')}</p>
              {page.updated_at && page.updated_at !== page.created_at && (
                <p>🔄 Cập nhật: {new Date(page.updated_at).toLocaleString('vi-VN')}</p>
              )}
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            <div className="text-lg leading-relaxed text-purple-100/90 whitespace-pre-wrap break-words">
              {page.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
} 