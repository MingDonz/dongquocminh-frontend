import Table from "@/components/common/Table";

export default function AdminTable({ columns, data, onEdit, onDelete }) {
  const extendedColumns = [
    {key: "stt", label: "STT"},
    ...columns,
    {key: "actions", label: "Actions"}
  ];

  const tableData = (Array.isArray(data) ? data : []).map((item, index) => ({
    stt: index + 1,
    ...item,
    actions: (
      <div className="flex gap-2">
        <button  onClick={() => {onEdit && onEdit(item) }}
        className="px-2.5 py-1.5 text-sm bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
       
        >
          Sửa
        </button>
        <button 
        onClick={() => {onDelete && onDelete(item) }}
        className="px-2.5 py-1.5 text-sm bg-red-500 text-white rounded cursor-pointer hover:bg-red-600">
          Xóa
        </button>
      </div>
    ),
  }));

  return <Table columns={extendedColumns} data={tableData} />;
}