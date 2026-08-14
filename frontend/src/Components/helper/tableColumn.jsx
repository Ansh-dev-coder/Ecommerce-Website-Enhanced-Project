 
 import { FaEdit } from 'react-icons/fa';

export const getOrderColumns = (onEditOrder) => [
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
    field: 'email',
    headerName: 'Email',
    minWidth: 180,
    headerAlign: 'center',
    editable: false,
    headerClassName: 'test-black font-semibold border',
    cellClassName: 'test-slate-700 font-normal border',
    renderHeader: () => <span className='text-center'>Email</span>,
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
  {
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
  },
];