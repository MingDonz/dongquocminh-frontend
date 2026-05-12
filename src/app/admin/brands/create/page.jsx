"use client";
import { useState } from "react";
import { isEmpty, validateBrand } from "@/utils/validators";
import { createBrand } from "@/services/brandService";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    brand_name: "",
    alias: "",
    status: 1,
    trash: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === "checkbox") {
      newValue = checked ? 1 : 0;
    } else if (type === "number") {
      newValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateBrand(formData);
    setErrors(validateErrors);
    if (!isEmpty(validateErrors)) return;

    try {
      setLoading(true);
      await createBrand(formData);
      setSuccess("Tạo thương hiệu thành công");
      setTimeout(() => {
        router.push("/admin/brands");
      }, 1000);
    } catch (e) {
      setErrors({ message: e.data?.error || "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Thêm thương hiệu</h2>
      {success && <p className="text-green-500">{success}</p>}
      {errors.message && <p className="text-red-500">{errors.message}</p>}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Tên thương hiệu:</label>
        {errors.brand_name && <p className="text-red-500">{errors.brand_name}</p>}
        <input
          type="text"
          name="brand_name"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Nhập tên thương hiệu"
          value={formData.brand_name}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Alias:</label>
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

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Đang tạo..." : "Tạo thương hiệu"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/brands")}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
