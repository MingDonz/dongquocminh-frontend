import axiosInstance from "@/lib/axiosInstance";

// 1. Lấy danh sách post
export const getPosts = async (params = {}) => {
  const res = await axiosInstance.get("/posts", {
    params: params
  });
  return res.data;
};

// 2. Lấy chi tiết post
export const getPostById = async (id) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
};

// 3. Tạo post mới
export const createPost = async (data) => {
  const res = await axiosInstance.post("/posts", data);
  return res.data;
};

// 4. Cập nhật post
export const updatePost = async (id, data) => {
  const res = await axiosInstance.put(`/posts/${id}`, data);
  return res.data;
};

// 5. Xóa post
export const deletePost = async (id) => {
  const res = await axiosInstance.delete(`/posts/${id}`);
  return res.data;
};
