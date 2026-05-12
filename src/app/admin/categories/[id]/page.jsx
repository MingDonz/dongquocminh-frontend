"use client";
import Loading from "@/components/common/loading";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { isEmpty, validateCategory } from "@/utils/validators";
import { getCategoryById, updateCategory } from "@/services/categoryService";

const EditForm = (props) => {
  const { id } = useParams();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    cat_name: "",
    alias: "",
    parent_id: 0,
    sort_order: 0,
    meta_key: "",
    meta_desc: "",
    status: 1,
    trash: 0,
  });

  // goi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategoryById(id);
        setFormData({
          cat_name: data.cat_name || data.category_name || "",
          alias: data.alias || "",
          parent_id: data.parent_id || 0,
          sort_order: data.sort_order || 0,
          meta_key: data.meta_key || "",
          meta_desc: data.meta_desc || "",
          status: data.status || 1,
          trash: data.trash || 0,
        });
      } catch (e) {
        setErrors({ message: e.data?.error || "Có lỗi xảy ra" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    // checkbox → 0 | 1
    if (type === "checkbox") {
      newValue = checked ? 1 : 0;
    }
    // number → convert sang number
    else if (type === "number") {
      newValue = value === "" ? "" : Number(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    const validateErrors = validateCategory(formData);
    setErrors(validateErrors);
    if (!isEmpty(validateErrors)) return;
    // gọi API bằng axios
    try {
      setLoading(true);
      let res = await updateCategory(id, formData);
      console.log(res);
      setSuccess("Cập nhật danh mục thành công");
      setTimeout(() => {
        router.push("/admin/categories");
      }, 1000);
    } catch (e) {
      setErrors({ message: e.data?.error || "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.cat_name) return <Loading />;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">
          Cập nhật danh mục id = {id}
        </h2>
        {success && <p className="text-green-500">{success}</p>}
        {errors.message && <p className="text-red-500">{errors.message}</p>}

        {/* Tên danh mục */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Tên danh mục:
          </label>
          {errors.cat_name && (
            <p className="text-red-500">{errors.cat_name}</p>
          )}
          <input
            type="text"
            name="cat_name"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập tên danh mục"
            value={formData.cat_name}
            onChange={handleChange}
          />
        </div>

        {/* Alias (slug URL) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Alias:
          </label>
          {errors.alias && <p className="text-red-500">{errors.alias}</p>}
          <input
            type="text"
            name="alias"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập slug URL"
            value={formData.alias}
            onChange={handleChange}
          />
        </div>

        {/* Parent ID */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Parent ID:
          </label>
          <input
            type="number"
            name="parent_id"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="0 nếu là danh mục cha"
            value={formData.parent_id}
            onChange={handleChange}
          />
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Thứ tự sắp xếp:
          </label>
          <input
            type="number"
            name="sort_order"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={formData.sort_order}
            onChange={handleChange}
          />
        </div>

        {/* Meta Key */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Meta Key:
          </label>
          <input
            type="text"
            name="meta_key"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Từ khóa SEO"
            value={formData.meta_key}
            onChange={handleChange}
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Meta Description:
          </label>
          <textarea
            name="meta_desc"
            rows="3"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Mô tả SEO"
            value={formData.meta_desc}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={formData.status === 1}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-slate-700">Kích hoạt</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật danh mục"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
