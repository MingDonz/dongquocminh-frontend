"use client";
import Loading from "@/components/common/loading";
import ProductList from "@/components/shop/product/ProductList";
import { 
  getNewProducts, 
  getBestSellerProducts, 
  getByViewProducts, 
  getHotProducts 
} from "@/services/productService";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    new: [],
    best: [],
    view: [],
    hot: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Gọi đồng thời cả 4 API để tối ưu tốc độ
        const [resNew, resBest, resView, resHot] = await Promise.all([
          getNewProducts(12),
          getBestSellerProducts(12),
          getByViewProducts(12),
          getHotProducts(12)
        ]);

        setData({
          new: resNew.data || resNew,
          best: resBest.data || resBest,
          view: resView.data || resView,
          hot: resHot.data || resHot
        });
      } catch (e) {
        console.error("Lỗi khi tải dữ liệu trang chủ:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="bg-slate-50 min-h-screen space-y-12"> {/* Dùng space-y-12 để tạo khoảng cách tự động */}
  
  <div className="max-w-7xl mx-auto px-4 py-16">
    {/* Section sáng */}
    <ProductList products={data.new} title="Sản phẩm mới" icon="✨" accentColor="blue" />

       {/* <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" /> */}
       <ProductList 
         products={data.hot} 
         title="Sản phẩm HOT nhất" 
         icon="🔥" 
         accentColor="amber" 
         isDark={false} 
       />

    {/* Section sáng tiếp theo */}
    <ProductList products={data.best} title="Sản phẩm bán chạy" icon="⚡" accentColor="red" />
  </div>
</main>
  );
}