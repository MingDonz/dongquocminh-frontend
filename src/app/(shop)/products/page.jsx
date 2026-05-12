"use client";
import Loading from "@/components/common/loading";
import Pagination from "@/components/common/Pagination";
import ProductList from "@/components/shop/product/ProductList";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import CategoryMenu from './../../../components/shop/product/CategoryMenu';
import Search from './../../../components/shop/product/Search';
import ResetFilter from './../../../components/shop/product/ResetFilter';
import FilterPanel from './../../../components/shop/product/FilterPanel';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalpages] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 16,
    trash: 0,
    status: 1
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productData, categoryData] = await Promise.all([
          getProducts(params),
          getCategories({ trash: 0, status: 1 })
        ]);
        setProducts(productData.data);
        setTotalpages(productData.totalPage || productData.totalPages);
        setCategories(categoryData);
      } catch (e) {
        console.error("Lỗi dữ liệu:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  return (
    <>
      {/* 
          CONTAINER CHÍNH: 
          - bg-slate-50: Nền xám nhạt để nổi bật Card trắng.
          - relative overflow-hidden: Để chứa các Blobs bay lơ lửng.
      */}
      <div className="min-h-screen bg-[#f8fafc] py-12 relative overflow-hidden">
        
        {/* --- 1. HIỆU ỨNG MESH GRADIENT (BLOBS) --- */}
        {/* Đốm xanh dương góc trên */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
        {/* Đốm tím góc dưới */}
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none -z-10" />
        {/* Đốm trời nhạt ở giữa */}
        <div className="absolute top-[30%] left-[15%] w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-[90px] pointer-events-none -z-10" />

        {/* --- 2. HỌA TIẾT LƯỚI (GRID PATTERN) --- 
            Giúp bề mặt nền có chi tiết li ti, tạo cảm giác hiện đại.
        */}
        <div 
          className="absolute inset-0 pointer-events-none -z-20 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Title */}
          <div className="mb-14 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-4 tracking-tighter">
              Khám Phá Sản Phẩm
            </h1>
            <div className="h-2 w-28 bg-blue-600 mx-auto rounded-full shadow-lg shadow-blue-200/50"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            
            {/* --- 3. SIDEBAR GLASSMORPHISM --- */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 
                              shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-8 transition-all hover:bg-white/50">
                
                <div>
                  <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 ml-1">Tìm kiếm & Lọc</h2>
                  <div className="space-y-5">
                    <Search setParams={setParams} params={params} />
                    <ResetFilter setParams={setParams} />
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200/50">
                  <CategoryMenu categories={categories} params={params} setParams={setParams} />
                </div>

                <div className="pt-8 border-t border-slate-200/50">
                  <FilterPanel params={params} setParams={setParams} />
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT Area */}
            <div className="lg:col-span-3 space-y-12">
              <div className="min-h-[600px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                    <Loading />
                    <p className="text-slate-400 font-bold animate-pulse uppercase text-xs tracking-widest">Đang tải sản phẩm...</p>
                  </div>
                ) : (
                  <ProductList products={products} title="Tất cả sản phẩm" />
                )}
              </div>

              {/* PAGINATION Section */}
              {!loading && (
                <div className="flex justify-center pt-10 border-t border-slate-200/60">
                  <Pagination
                    totalPages={totalPages}
                    params={params}
                    onChangeParams={setParams}
                  />
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}