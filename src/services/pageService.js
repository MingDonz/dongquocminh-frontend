import axiosInstance from "@/lib/axiosInstance";

// 1. Lấy danh sách page
export const getPages = async (params = {}) => {
  const res = await axiosInstance.get("/pages", {
    params: params
  });
  return res.data;
};

// 2. Lấy chi tiết page
export const getPageById = async (id) => {
  const res = await axiosInstance.get(`/pages/${id}`);
  return res.data;
};

// 3. Tạo page mới
export const createPage = async (data) => {
  const res = await axiosInstance.post("/pages", data);
  return res.data;
};

// 4. Cập nhật page
export const updatePage = async (id, data) => {
  const res = await axiosInstance.put(`/pages/${id}`, data);
  return res.data;
};

// 5. Xóa page
export const deletePage = async (id) => {
  const res = await axiosInstance.delete(`/pages/${id}`);
  return res.data;
};
