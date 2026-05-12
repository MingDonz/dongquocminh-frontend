import axiosInstance from "@/lib/axiosInstance";


// 1. Lấy danh sách banner
export const getBanners = async (params = {}) => {
  const res = await axiosInstance.get("/banners", {
    params: params
  });
  return res.data;
};

// 2. Lấy chi tiết banner
export const getBannerById = async (id) => {
  const res = await axiosInstance.get(`/banners/${id}`);
  return res.data;
};

// 3. Tạo banner mới
export const createBanner = async (data) => {
  const res = await axiosInstance.post("/banners", data);
  return res.data;
};

// 4. Cập nhật banner
export const updateBanner = async (id, data) => {
  const res = await axiosInstance.put(`/banners/${id}`, data);
  return res.data;
};

// 5. Xóa banner
export const deleteBanner = async (id) => {
  const res = await axiosInstance.delete(`/banners/${id}`);
  return res.data;
};
