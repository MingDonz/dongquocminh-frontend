"use client";
import Loading from "@/components/common/loading";
import { getPostById } from "@/services/postService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        const normalizedPost = {
          ...data,
          title: data.title || data.post_name || data.name || "",
        };
        setPost(normalizedPost);
      } catch (e) {
        setErrors({ message: e.message || "Lấy bài viết thất bại" });
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
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 font-semibold"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-purple-300 text-lg">✨ Không tìm thấy bài viết ✨</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <article className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 text-pink-400 hover:text-pink-300 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
        >
          ← Quay lại
        </button>

        <div className="bg-gradient-to-br from-pink-600/30 via-purple-600/30 to-blue-600/30 backdrop-blur-md border border-purple-400/30 rounded-2xl p-8 md:p-12 hover:border-pink-400/50 transition-colors duration-300">
          <header className="mb-10 pb-8 border-b border-purple-400/20">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.short_desc && (
              <p className="text-lg md:text-xl text-purple-300/90 italic mb-4 font-semibold">
                {post.short_desc}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 text-purple-300/80 text-sm">
              <p>📅 {new Date(post.created_at).toLocaleString('vi-VN')}</p>
              {post.updated_at && post.updated_at !== post.created_at && (
                <p>🔄 Cập nhật: {new Date(post.updated_at).toLocaleString('vi-VN')}</p>
              )}
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            <div className="text-lg leading-relaxed text-purple-100/90 whitespace-pre-wrap break-words">
              {post.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-purple-400/20 text-center">
            <p className="text-purple-400/60 text-sm">✨ Cảm ơn bạn đã đọc ✨</p>
          </div>
        </div>
      </article>
    </div>
  );
}
