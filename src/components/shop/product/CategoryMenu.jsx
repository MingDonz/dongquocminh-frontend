import Button from "@/components/common/Button";

export default function CategoryMenu({ categories, params, setParams }) {
  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 backdrop-blur-md rounded-xl p-5 border border-blue-400/30 hover:border-blue-400/60 transition-colors duration-300">
      <h2 className="text-lg font-bold bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent mb-4">📁 Danh mục</h2>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button key={cat.cat_id} params={params} setParams={setParams} category_name={cat.cat_name}>
            {cat.cat_name}
          </Button>
        ))}
      </div>
    </div>
  );
}
