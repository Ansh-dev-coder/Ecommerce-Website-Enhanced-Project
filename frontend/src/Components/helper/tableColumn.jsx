 
 import { FaEdit, FaTrash, FaEye, FaImage } from 'react-icons/fa';

export const getOrderColumns = (onEditOrder, canUpdateStatus = false, showEmail = true, flexibleColumns = false) => {
  const columns = [
    {
      sortable: false,
      disableColumnMenu: true,
      field: 'id',
      headerName: 'orderId',
      minWidth: 180,
      headerAlign: 'center',
      editable: false,
      headerClassName: 'test-black font-semibold border',
      cellClassName: 'test-slate-700 font-normal border',
      renderHeader: () => <span className='text-center'>Order ID</span>,
    },
    {
      sortable: true,
      field: 'totalAmount',
      headerName: 'Total Amount',
      minWidth: 180,
      headerAlign: 'center',
      editable: false,
      headerClassName: 'test-black font-semibold border',
      cellClassName: 'test-slate-700 font-normal border',
      renderHeader: () => <span className='text-center'>Total Amount</span>,
    },
    {
      sortable: false,
      field: 'status',
      headerName: 'Status',
      minWidth: 180,
      headerAlign: 'center',
      editable: false,
      headerClassName: 'test-black font-semibold border',
      cellClassName: 'test-slate-700 font-normal border',
      renderHeader: () => <span className='text-center'>Status</span>,
    },
    {
      sortable: false,
      field: 'date',
      headerName: 'Order Date',
      minWidth: 180,
      headerAlign: 'center',
      editable: false,
      headerClassName: 'test-black font-semibold border',
      cellClassName: 'test-slate-700 font-normal border',
      renderHeader: () => <span className='text-center'>Order Date</span>,
    },
  ]

  if (showEmail) {
    columns.splice(1, 0, {
      field: 'email',
      headerName: 'Email',
      minWidth: 180,
      headerAlign: 'center',
      editable: false,
      headerClassName: 'test-black font-semibold border',
      cellClassName: 'test-slate-700 font-normal border',
      renderHeader: () => <span className='text-center'>Email</span>,
    })
  }

  if (canUpdateStatus) {
    columns.push({
      sortable: false,
      field: 'action',
      headerName: 'Action',
      minWidth: 250,
      headerAlign: 'center',
      editable: false,
      headerClassName: 'test-black font-semibold border',
      cellClassName: 'test-slate-700 font-normal border',
      renderHeader: () => <span className='text-center'>Action</span>,
      renderCell: (params) => (
        <div className='flex h-full items-center justify-center pt-2'>
          <button
            type='button'
            onClick={() => onEditOrder(params.row)}
            className='flex h-9 items-center rounded-md bg-blue-500 px-4 text-white'
          >
            <FaEdit className='mr-2' />
            Edit
          </button>
        </div>
      ),
    })
  }

  return flexibleColumns
    ? columns.map((column) => ({ ...column, flex: 1 }))
    : columns
}

export const adminProductTableColumn = (handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView) => {
  const columns = [

  {
    sortable: false,
    disableColumnMenu: true,
    field: 'image',
    headerName: 'Image',
    minWidth: 120,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Image</span>,
    renderCell: (params) => (
      <div className='flex h-full items-center justify-center py-2'>
        {params.row.image ? (
          <img
            src={params.row.image}
            alt={params.row.productName || 'Product'}
            className='h-12 w-12 rounded-md object-cover border border-gray-200 bg-white shadow-sm'
          />
        ) : (
          <div className='flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-100 text-xs text-gray-500'>
            No Image
          </div>
        )}
      </div>
    ),
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'productId',
    headerName: 'ID',
    minWidth: 100,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Product ID</span>,
  },
  {
    sortable: true,
    field: 'productName',
    headerName: 'Product Name',
    minWidth: 180,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Product Name</span>,
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 250,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Description</span>,
  },
  {
    sortable: true,
    field: 'price',
    headerName: 'Price',
    minWidth: 120,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Price</span>,
    renderCell: (params) => <span>₹{params.row.price.toFixed(2)}</span>,
  },
  {
    sortable: true,
    field: 'discount',
    headerName: 'Discount',
    minWidth: 120,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Discount %</span>,
    renderCell: (params) => <span>{params.row.discount}%</span>,
  },
  {
    sortable: true,
    field: 'specialPrice',
    headerName: 'Special Price',
    minWidth: 140,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Special Price</span>,
    renderCell: (params) => <span className='text-green-600 font-semibold'>₹{params.row.specialPrice.toFixed(2)}</span>,
  },
  {
    sortable: true,
    field: 'quantity',
    headerName: 'Quantity',
    minWidth: 120,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Quantity</span>,
    renderCell: (params) => (
      <span className={params.row.quantity === 0 ? 'text-red-600 font-semibold' : ''}>
        {params.row.quantity}
      </span>
    ),
  },
  {
    sortable: false,
    field: 'status',
    headerName: 'Status',
    minWidth: 140,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Status</span>,
    renderCell: (params) => (
      params.row.quantity === 0 ? (
        <span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold'>Out of Stock</span>
      ) : (
        <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold'>Active</span>
      )
    ),
  },
  {
    sortable: false,
    field: 'action',
    headerName: 'Action',
    minWidth: 350,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Action</span>,
    renderCell: (params) => (
      <div className='flex h-full items-center justify-center gap-2 pt-2'>
        <button
          type='button'
          onClick={() => handleProductView(params.row)}
          className='flex h-9 items-center rounded-md bg-sky-500 px-3 text-white hover:bg-sky-600 transition'
          title='View'
        >
          <FaEye className='mr-1' />
          View
        </button>
        {handleEdit && (
          <button
            type='button'
            onClick={() => handleEdit(params.row)}
            className='flex h-9 items-center rounded-md bg-blue-500 px-3 text-white hover:bg-blue-600 transition'
            title='Edit'
          >
            <FaEdit className='mr-1' />
            Edit
          </button>
        )}
        {handleImageUpload && (
          <button
            type='button'
            onClick={() => handleImageUpload(params.row)}
            className='flex h-9 items-center rounded-md bg-purple-500 px-3 text-white hover:bg-purple-600 transition'
            title='Upload Image'
          >
            <FaImage className='mr-1' />
            Image
          </button>
        )}
        {handleDelete && (
          <button
            type='button'
            onClick={() => handleDelete(params.row)}
            className='flex h-9 items-center rounded-md bg-red-500 px-3 text-white hover:bg-red-600 transition'
            title='Delete'
          >
            <FaTrash className='mr-1' />
            Delete
          </button>
        )}
      </div>
    ),
  },
]

  const hasProductActions = Boolean(handleEdit || handleDelete || handleImageUpload)

  return hasProductActions
    ? columns
    : columns.map((column) =>
        column.field === 'action' ? { ...column, minWidth: 140 } : column
      )
};

export const adminCategoryTableColumn = (handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'categoryId',
    headerName: 'ID',
    minWidth: 140,
    flex: 0.4,
    headerAlign: 'center',
    align: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Category ID</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'categoryName',
    headerName: 'Category Name',
    minWidth: 240,
    flex: 1,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Category Name</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'action',
    headerName: 'Action',
    minWidth: 180,
    headerAlign: 'center',
    align: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Action</span>,
    renderCell: (params) => (
      <div className='flex h-full items-center justify-center pt-2'>
        <button
          type='button'
          onClick={() => handleDelete(params.row)}
          className='flex h-9 items-center rounded-md bg-red-500 px-3 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-slate-400'
          title='Delete'
        >
          <FaTrash className='mr-1' />
          Delete
        </button>
      </div>
    ),
  },
];

export const adminSellerTableColumn = (handleView, handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'userId',
    headerName: 'Seller ID',
    minWidth: 140,
    flex: 0.4,
    headerAlign: 'center',
    align: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Seller ID</span>,
  },
  {
    sortable: true,
    disableColumnMenu: true,
    field: 'username',
    headerName: 'Username',
    minWidth: 200,
    flex: 1,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Username</span>,
  },
  {
    sortable: true,
    disableColumnMenu: true,
    field: 'email',
    headerName: 'Email',
    minWidth: 240,
    flex: 1,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Email</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'role',
    headerName: 'Role',
    minWidth: 180,
    flex: 0.7,
    headerAlign: 'center',
    align: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Role</span>,
    renderCell: (params) => (
      <span className='rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800'>
        {params.row.role || 'SELLER'}
      </span>
    ),
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'action',
    headerName: 'Action',
    minWidth: 240,
    headerAlign: 'center',
    align: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Action</span>,
    renderCell: (params) => (
      <div className='flex h-full items-center justify-center gap-2 pt-2'>
        <button
          type='button'
          onClick={() => handleView(params.row)}
          className='flex h-9 items-center rounded-md bg-sky-500 px-3 text-white transition hover:bg-sky-600'
          title='View'
        >
          <FaEye className='mr-1' />
          View
        </button>
        <button
          type='button'
          onClick={() => handleDelete(params.row)}
          className='flex h-9 items-center rounded-md bg-red-500 px-3 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-slate-400'
          title='Delete'
        >
          <FaTrash className='mr-1' />
          Delete
        </button>
      </div>
    ),
  },
];
