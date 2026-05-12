"use client";
import Loading from "@/components/common/loading";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CategorySelect from "@/components/common/CategorySelect";
import BrandSelect from "@/components/common/BrandSelect";
import { isEmpty, validateProduct } from "@/utils/validators";
import { getProductById, updateProduct } from "@/services/productService";
const EditForm = (props) => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    product_name: "",
    alias: "",
    cat_id: 1,
    brand_id: 1,
    detail: "",
    price: 200,
    sale_price: "",
    image: "",
    launch_date: "",
    tag: "",
    summary: "",
    status: 1,
    trash: 0,
    view: 50,
  });
  // goi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        const safeString = (value) => value ?? "";
        setFormData({
          product_name: safeString(data.product_name),
          alias: safeString(data.alias),
          cat_id: data.cat_id ?? 1,
          brand_id: data.brand_id ?? 1,
          detail: safeString(data.detail),
          price: data.price ?? 0,
          sale_price: data.sale_price ?? "",
          image: safeString(data.image),
          launch_date: safeString(data.launch_date),
          tag: safeString(data.tag),
          summary: safeString(data.summary),
          status: data.status ?? 1,
          trash: data.trash ?? 0,
          view: data.view ?? 0,
        });
      } catch (e) {
        setErrors({ message: e.data?.error || e.message || "Lấy sản phẩm thất bại" });
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
    //validation
    const validateErrors = validateProduct(formData);
    setErrors(validateErrors);
    if (!isEmpty(validateErrors)) return;
    // gọi API bằng axios
    try {
      setLoading(true);
      let res = await updateProduct(id, formData);
      console.log(res);
      setSuccess("Cập nhật sản phẩm thành công");
    } catch (e) {
      setErrors({ message: e.data.error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">
          Cập nhật sản phẩm id = {id}
        </h2>
        {success && <p className="text-sm text-green-600">{success}</p>}
        {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
        {/* Tên sản phẩm */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Tên sản phẩm:
          </label>
          {errors.product_name && (
            <p style={{ color: "red" }}>{errors.product_name}</p>
          )}
          <input
            type="text"
            name="product_name"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập tên sản phẩm"
            value={formData.product_name}
            onChange={handleChange}
          />
        </div>

        {/* Alias (slug URL) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Alias:
          </label>
          {errors.alias && <p style={{ color: "red" }}>{errors.alias}</p>}
          <input
            type="text"
            name="alias"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập slug URL"
            value={formData.alias}
            onChange={handleChange}
          />
        </div>

        {/* Cat_id và Brand_id in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* cat_id */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Danh mục
            </label>
            {errors.cat_id && <p style={{ color: "red" }}>{errors.cat_id}</p>}
            <CategorySelect
              name="cat_id"
              value={formData.cat_id}
              onChange={handleChange}
            />
          </div>

          {/* brand_id */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Thương hiệu
            </label>
            {errors.brand_id && (
              <p style={{ color: "red" }}>{errors.brand_id}</p>
            )}
            <BrandSelect
              name="brand_id"
              value={formData.brand_id}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Chi tiết ngắn:
          </label>
          {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}
          <input
            type="text"
            name="summary"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập chi tiết ngắn"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        {/* Detail */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Mô tả chi tiết
          </label>
          {errors.detail && <p style={{ color: "red" }}>{errors.detail}</p>}
          <textarea
            name="detail"
            rows="5"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-vertical"
            placeholder="Nhập mô tả chi tiết sản phẩm"
            value={formData.detail}
            onChange={handleChange}
          />
        </div>

        {/* Price & Sale Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Giá
            </label>
            {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Nhập giá sản phẩm"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Giá khuyến mãi
            </label>
            {errors.sale_price && (
              <p style={{ color: "red" }}>{errors.sale_price}</p>
            )}
            <input
              type="number"
              name="sale_price"
              step="1"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Nhập giá khuyến mãi"
              value={formData.sale_price}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Hình ảnh:
          </label>
          {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
          <input
            type="text"
            name="image"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập tên file hình ảnh"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {/* Trash và Status in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* trash */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Trash
            </label>
            {errors.trash && <p style={{ color: "red" }}>{errors.trash}</p>}
            <select
              name="trash"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              value={formData.trash}
              onChange={handleChange}
            >
              <option value="0">Chưa xóa</option>
              <option value="1">Đã xóa</option>
            </select>
          </div>

          {/* status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Trạng thái
            </label>
            {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
            <select
              name="status"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="1">Hiển thị</option>
              <option value="0">Ẩn</option>
            </select>
          </div>
        </div>

        {/* Ngày ra mắt */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Ngày ra mắt:
          </label>
          {errors.launch_date && (
            <p style={{ color: "red" }}>{errors.launch_date}</p>
          )}
          <input
            type="datetime-local"
            name="launch_date"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={formData.launch_date}
            onChange={handleChange}
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Tag:
          </label>
          {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
          <input
            type="text"
            name="tag"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập tag (phân cách bằng dấu phẩy)"
            value={formData.tag}
            onChange={handleChange}
          />
        </div>

        {/* Lượt xem */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Lượt xem:
          </label>
          {errors.view && <p style={{ color: "red" }}>{errors.view}</p>}
          <input
            type="number"
            name="view"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Nhập số lượt xem"
            value={formData.view}
            onChange={handleChange}
          />
        </div>

        {/* Nút submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? <Loading /> : "Cập nhật sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
