export default function Button({ children, params, setParams, category_name }) {
  return (
    <button
      className="
px-4 py-2 rounded-sm border w-full
bg-white text-gray-700 border-gray-300
hover:bg-gray-100 hover:border-gray-400
transition cursor-pointer
"
      onClick={() => {
        setParams((prev) => ({
          ...prev,
          ...(category_name && { category: category_name }),
        }));
      }}
    >
      {children}
    </button>
  );
}
