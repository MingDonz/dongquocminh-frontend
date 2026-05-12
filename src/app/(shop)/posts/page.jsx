"use client";
import Loading from "@/components/common/loading";
import Pagination from "@/components/common/Pagination";
import { getPosts } from "@/services/postService";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
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
        const data = await getPosts(params);
        const postsData = Array.isArray(data) ? data : data?.data || [];
        const normalizedPosts = postsData.map(post => ({
          ...post,
          title: post.title || post.post_name || post.name || "",
          post_id: post.post_id || post.id,
        }));
        setPosts(normalizedPosts);
        setTotalPages(data?.totalPage || data?.totalPages || 0);
      } catch (e) {
        setErrors({ message: e.message || "Lấy danh sách bài viết thất bại" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  if (loading && posts.length === 0) return <Loading />;

  return (
    <>
      <div className="min-h-[70vh] bg-white py-12">
        <div className="max-w-5xl mx-auto p-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-3">Danh sách Bài viết</h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {errors.message && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            {errors.message}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl">✨ Không có bài viết nào ✨</p>
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {posts.map((post, idx) => (
              <Link key={post.post_id} href={`/posts/${post.post_id}`}>
                <div className="group relative overflow-hidden rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-400 p-6 md:p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-x-1">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 flex-1">{post.title}</h2>
                      <span className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300 text-2xl flex-shrink-0">→</span>
                    </div>
                    
                    {post.short_desc && (
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-3 font-semibold italic text-sm">
                        {post.short_desc}
                      </p>
                    )}
                    
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-4 text-base leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 group-hover:border-blue-200 transition-colors duration-300">
                      <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        📅 {new Date(post.created_at).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-xs text-gray-400">✨</span>
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
