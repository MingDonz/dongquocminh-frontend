"use client";
import Loading from "@/components/common/loading";
import ProductDetail from "@/components/shop/product/ProductDetail";
import { product } from "@/data/product";
import { getProductById } from "@/services/productService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProductDetailPage({ params }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
  
    // goi api
    useEffect(() => {
      // ham fetchdada
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await getProductById(id);
          setProduct(data);
        } catch (e) {
          setErrors({ message: e.data });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [id]);
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="px-4 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="mb-8 px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
          >
            ← Quay lại
          </button>
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">Chi tiết sản phẩm {id}</h1>
          </div>
          {loading ? <Loading /> : <ProductDetail product={product} />}
        </div>
      </div>
    </div>
  );
}