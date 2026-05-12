"use client";
import { useState } from "react";
import { isEmpty, validatePage } from "@/utils/validators";
import { createPage } from "@/services/pageService";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    alias: "",
    content: "",
    status: 1,
    trash: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type === "checkbox") {
      newValue = checked ? 1 : 0;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validatePage(formData);
    setErrors(validateErrors);
    if (!isEmpty(validateErrors)) return;

    try {
      setLoading(true);
      await createPage(formData);
      setSuccess("Tạo trang thành công");
      setTimeout(() => {
        router.push("/admin/pages");
      }, 1000);
    } catch (e) {
      setErrors({ message: e.data?.error || "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Thêm trang</h2>
      {success && <p className="text-green-500">{success}</p>}
      {errors.message && <p className="text-red-500">{errors.message}</p>}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Tên trang:</label>
        {errors.title && <p className="text-red-500">{errors.title}</p>}
        <input
          type="text"
          name="title"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Nhập tên trang"
          value={formData.title}
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
        <label className="block text-sm font-medium text-slate-700">Nội dung:</label>
        {errors.content && <p className="text-red-500">{errors.content}</p>}
        <textarea
          name="content"
          rows="5"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Nhập nội dung trang"
          value={formData.content}
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
          {loading ? "Đang tạo..." : "Tạo trang"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/pages")}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
