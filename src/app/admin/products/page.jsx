"use client";
import Loading from "@/components/common/loading";
import AdminTable from "@/components/table/AdminTable";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "@/services/productService";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";
const columns = [
  { key: "product_id", label: "ID" },
  { key: "product_name", label: "Product Name" },
  { key: "price", label: "Price" },
  { key: "status", label: "Status" },
];
export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
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
  const handleDelete = async (product) => {
  const confirmDelete = window.confirm(`Bạn có chắc muốn xóa "${product.product_name}" không?`);
  if (!confirmDelete) return;

  try {
    setLoading(true);
    await deleteProduct(product.product_id);
    setSuccess("Xóa sản phẩm thành công!");
    
    // Kích hoạt useEffect gọi lại API bằng cách set lại params
    setParams({ ...params }); 
  } catch (error) {
    setErrors({ message: "Xóa thất bại!" });
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (product) => {
    router.push(`/admin/products/${product.product_id}`);
  };
  // goi api
  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts({ params });
      setProducts(data.data);
      setTotalpages(data.totalPage);
    } catch (e) {
      setErrors({ message: e.data });
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
          <h1 className="text-3xl font-bold text-slate-900">Admin Products</h1>
          {success ? <p className="text-sm text-green-500">{success}</p> : ""}
          {errors ? (
            <p className="text-sm text-red-500">{errors.message}</p>
          ) : (
            ""
          )}
          <p className="text-sm text-slate-500">Danh sách sản phẩm cửa hàng</p>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            <AdminTable
              columns={columns}
              data={products}
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
