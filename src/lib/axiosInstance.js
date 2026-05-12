import axios from "axios";

axios

const axiosInstance = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL, // địa chỉ API backend
timeout: 5000, // thời gian chờ tối đa (5 giây) trước khi request bị hủy
headers: {
"Content-Type": "application/json" // dữ liệu gửi lên server ở dạng JSON
}
});
axiosInstance.interceptors.request.use(
(config) => {
// Lấy token đã lưu trong localStorage
const token = localStorage.getItem("token");
// Nếu tồn tại token thì gắn vào header Authorization
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
// Bắt buộc phải return config để request tiếp tục gửi đi
return config;
},
// Nếu có lỗi xảy ra trước khi request được gửi
(error) => {
return Promise.reject(error);
}
);
axiosInstance.interceptors.response.use(
(response) => response,
(error) => {
const errorData = {
message: error.response?.data?.message || "Server error",
status: error.response?.status || 500,
data: error.response?.data || null
};
return Promise.reject(errorData);
}
);
export default axiosInstance;