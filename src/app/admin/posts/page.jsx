"use client";
import Loading from "@/components/common/loading";
import AdminTable from "@/components/table/AdminTable";
import { useEffect, useState } from "react";
import { deletePost, getPosts } from "@/services/postService";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";

const columns = [
  { key: "post_id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
];

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });

  const handleDelete = async (post) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${post.title || post.post_name || post.name}" không?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");
      await deletePost(post.post_id || post.id);
      setSuccess("Xóa bài viết thành công!");
      const data = await getPosts(params);
      const postsData = Array.isArray(data) ? data : data?.data || [];
      const normalizedPosts = postsData.map(post => ({
        ...post,
        title: post.title || post.post_name || post.name || "",
        post_id: post.post_id || post.id,
      }));
      setPosts(normalizedPosts);
      setTotalPages(data?.totalPage || data?.totalPages || 0);
    } catch (error) {
      setErrors({ message: "Xóa thất bại!" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    router.push(`/admin/posts/${post.post_id || post.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPosts(params);
        const postsData = Array.isArray(data) ? data : data?.data || [];
        // Normalize field names: convert 'name' to 'title' if needed
        const normalizedPosts = postsData.map(post => ({
          ...post,
          title: post.title || post.post_name || post.name || "",
          post_id: post.post_id || post.id,
        }));
        setPosts(normalizedPosts);
        setTotalPages(data?.totalPage || data?.totalPages || 0);
      } catch (e) {
        setErrors({ message: e.message || e.data?.message || "Lấy danh sách bài viết thất bại" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Posts</h1>
          {success ? <p className="text-sm text-green-500">{success}</p> : ""}
          {errors.message ? (
            <p className="text-sm text-red-500">{errors.message}</p>
          ) : (
            ""
          )}
          <p className="text-sm text-slate-500">Danh sách các bài viết</p>
        </div>
        <button
          onClick={() => router.push("/admin/posts/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thêm bài viết
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <AdminTable
              columns={columns}
              data={posts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Pagination
              totalPages={totalPages}
              params={params}
              onChangeParams={setParams}
            />
          </>
        )}
      </div>
    </div>
  );
}
