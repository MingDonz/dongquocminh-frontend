"use client";
import Loading from "@/components/common/loading";
import AdminTable from "@/components/table/AdminTable";
import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "@/services/categoryService";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";

const columns = [
  { key: "cat_id", label: "ID" },
  { key: "cat_name", label: "Category Name" },
  { key: "status", label: "Status" },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalpages] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });

  const handleDelete = async (category) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${category.cat_name || category.category_name}" không?`,
    );
    if (!confirmDelete) return;
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");
      await deleteCategory(category.cat_id || category.category_id);
      setSuccess("Xóa danh mục thành công!");
      // Refresh data
      const data = await getCategories(params);
      setCategories(Array.isArray(data) ? data : data?.data || []);
      setTotalpages(data?.totalPage || data?.totalPages || 0);
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    router.push(`/admin/categories/${category.cat_id || category.category_id}`);
  };

  // goi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategories(params);
        setCategories(Array.isArray(data) ? data : data?.data || []);
        setTotalpages(data?.totalPage || data?.totalPages || 0);
      } catch (e) {
        setErrors({ message: e.message || e.data?.message || "Lấy danh mục thất bại" });
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
          <h1 className="text-3xl font-bold text-slate-900">Admin Categories</h1>
          {success ? <p className="text-sm text-green-500">{success}</p> : ""}
          {errors ? (
            <p className="text-sm text-red-500">{errors.message}</p>
          ) : (
            ""
          )}
          <p className="text-sm text-slate-500">Danh sách danh mục sản phẩm</p>
        </div>
        <button
          onClick={() => router.push("/admin/categories/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thêm danh mục
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <AdminTable
              columns={columns}
              data={categories}
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
