import { useState, useEffect } from "react";
import { getBrands } from "@/services/brandService";

export default function FilterPanel({ params, setParams }) {
  const [brands, setBrands] = useState([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands({ status: 1, trash: 0 });
        setBrands(data.data || data || []);
      } catch (e) {
        console.error("Error fetching brands:", e);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setSelectedBrand(value);
    setParams((prev) => ({
      ...prev,
      ...(value ? { brand: value } : { brand: undefined }),
      page: 1
    }));
  };

  const handlePriceChange = () => {
    setParams((prev) => ({
      ...prev,
      ...(priceMin && { price_min: priceMin }),
      ...(priceMax && { price_max: priceMax }),
      page: 1
    }));
  };

  const handleClearPrice = () => {
    setPriceMin("");
    setPriceMax("");
    setParams((prev) => {
      const { price_min, price_max, ...rest } = prev;
      return { ...rest, page: 1 };
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-md rounded-xl p-5 border border-purple-400/30 hover:border-purple-400/60 transition-colors duration-300">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm font-bold"
      >
        <option value="">🔍 Lọc (Filter)</option>
        <option value="brand">🏷️ Thương hiệu</option>
        <option value="price">💰 Khoảng giá</option>
        <option value="tag">📌 Thẻ</option>
      </select>

      {/* Brand Filter */}
      {filterType === "brand" && (
        <div className="mb-6 mt-4">
          <label className="block text-sm font-bold text-cyan-300 mb-3">
            🏷️ Thương hiệu
          </label>
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm"
          >
            <option value="">Tất cả thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_name}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range Filter */}
      {filterType === "price" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Khoảng giá (đ)
          </label>
          <div className="flex flex-col gap-2 mb-2">
            <input
              type="number"
              placeholder="Giá tối thiểu"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <input
              type="number"
              placeholder="Giá tối đa"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePriceChange}
              className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition duration-200 font-medium text-sm"
            >
              Áp dụng
            </button>
            <button
              onClick={handleClearPrice}
              className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-400 transition duration-200 font-medium text-sm"
            >
              Xóa
            </button>
          </div>
        </div>
      )}

      {/* Tags Filter */}
      {filterType === "tag" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thẻ
          </label>
          <div className="flex flex-wrap gap-2">
            {["Hot", "New", "Sale", "Best"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setParams((prev) => ({
                    ...prev,
                    tag: prev.tag === tag ? "" : tag,
                    page: 1
                  }));
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  params.tag === tag
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}