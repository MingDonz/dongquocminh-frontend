export default function ResetFilter({ setParams }) {
  const handleReset = () => {
    setParams({
      page: 1,
      limit: 12,
      trash: 0,
      status: 1
    });
  };

  return (
    <button
      onClick={handleReset}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 
                 border border-slate-200 hover:border-red-200 
                 rounded-xl font-bold text-xs uppercase tracking-wider 
                 transition-all duration-300 active:scale-95 shadow-sm"
    >
      <svg 
        className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Làm mới bộ lọc
    </button>
  );
}