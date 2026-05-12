"use client";
import Loading from "@/components/common/loading";
import AdminTable from "@/components/table/AdminTable";
import { useEffect, useState } from "react";
import { deleteBrand, getBrands } from "@/services/brandService";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";

const columns = [
  { key: "brand_id", label: "ID" },
  { key: "brand_name", label: "Brand Name" },
  { key: "status", label: "Status" },
];

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
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

  const handleDelete = async (brand) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${brand.brand_name || brand.name}" không?`,
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");
      await deleteBrand(brand.brand_id || brand.id);
      setSuccess("Xóa thương hiệu thành công!");
      const data = await getBrands(params);
      const brandsData = Array.isArray(data) ? data : data?.data || [];
      const normalizedBrands = brandsData.map(brand => ({
        ...brand,
        brand_name: brand.brand_name || brand.name || "",
        brand_id: brand.brand_id || brand.id,
      }));
      setBrands(normalizedBrands);
      setTotalpages(data?.totalPage || data?.totalPages || 0);
    } catch (error) {
      setErrors({ message: "Xóa thất bại!" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (brand) => {
    router.push(`/admin/brands/${brand.brand_id || brand.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBrands(params);
        const brandsData = Array.isArray(data) ? data : data?.data || [];
        const normalizedBrands = brandsData.map(brand => ({
          ...brand,
          brand_name: brand.brand_name || brand.name || "",
          brand_id: brand.brand_id || brand.id,
        }));
        setBrands(normalizedBrands);
        setTotalpages(data?.totalPage || data?.totalPages || 0);
      } catch (e) {
        setErrors({ message: e.message || e.data?.message || "Lấy thương hiệu thất bại" });
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
          <h1 className="text-3xl font-bold text-slate-900">Admin Brands</h1>
          {success ? <p className="text-sm text-green-500">{success}</p> : ""}
          {errors.message ? (
            <p className="text-sm text-red-500">{errors.message}</p>
          ) : (
            ""
          )}
          <p className="text-sm text-slate-500">Danh sách thương hiệu sản phẩm</p>
        </div>
        <button
          onClick={() => router.push("/admin/brands/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thêm thương hiệu
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <AdminTable
              columns={columns}
              data={brands}
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
