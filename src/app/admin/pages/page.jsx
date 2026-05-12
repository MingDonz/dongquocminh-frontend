"use client";
import Loading from "@/components/common/loading";
import AdminTable from "@/components/table/AdminTable";
import { useEffect, useState } from "react";
import { deletePage, getPages } from "@/services/pageService";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";

const columns = [
  { key: "page_id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
];

export default function AdminPagesPage() {
  const [pages, setPages] = useState([]);
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

  const handleDelete = async (page) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${page.title || page.page_name || page.name}" không?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");
      await deletePage(page.page_id || page.id);
      setSuccess("Xóa trang thành công!");
      const data = await getPages(params);
      const pagesData = Array.isArray(data) ? data : data?.data || [];
      const normalizedPages = pagesData.map(page => ({
        ...page,
        title: page.title || page.page_name || page.name || "",
        page_id: page.page_id || page.id,
      }));
      setPages(normalizedPages);
      setTotalPages(data?.totalPage || data?.totalPages || 0);
    } catch (error) {
      setErrors({ message: "Xóa thất bại!" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page) => {
    router.push(`/admin/pages/${page.page_id || page.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPages(params);
        const pagesData = Array.isArray(data) ? data : data?.data || [];
        // Normalize field names: convert 'name' to 'title' if needed
        const normalizedPages = pagesData.map(page => ({
          ...page,
          title: page.title || page.page_name || page.name || "",
          page_id: page.page_id || page.id,
        }));
        setPages(normalizedPages);
        setTotalPages(data?.totalPage || data?.totalPages || 0);
      } catch (e) {
        setErrors({ message: e.message || e.data?.message || "Lấy danh sách trang thất bại" });
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
          <h1 className="text-3xl font-bold text-slate-900">Admin Pages</h1>
          {success ? <p className="text-sm text-green-500">{success}</p> : ""}
          {errors.message ? (
            <p className="text-sm text-red-500">{errors.message}</p>
          ) : (
            ""
          )}
          <p className="text-sm text-slate-500">Danh sách các trang</p>
        </div>
        <button
          onClick={() => router.push("/admin/pages/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thêm trang
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <AdminTable
              columns={columns}
              data={pages}
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
