import React, { useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaBoxOpen } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import Loader from '../../shared/Loader';
import { adminProductTableColumn } from '../../helper/tableColumn';
import { DataGrid } from '@mui/x-data-grid';
import useDashboardProductFilter from '../../../hooks/UseDashboardProductFilter';

const AdminProducts = () => {
  const { products, pagination } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState((pagination?.pageNumber ?? 0) + 1);

  useDashboardProductFilter();

  const emptyProduct = !products || products?.length === 0;
  const { isLoading, errorMessage } = useSelector((state) => state.error);

  const tableRecords = products?.map((item) => {
    return {
      id: item.productId,
      productId: item.productId,
      productName: item.productName,
      description: item.description,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      specialPrice: item.specialPrice,
    };
  });

  const handleEdit = (product) => {
    console.log('Edit product:', product)
    // TODO: Add edit functionality
  }

  const handleDelete = (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Delete product:', product)
    }
  }

  const handleImageUpload = (product) => {
    console.log('Upload image for product:', product)
    // TODO: Add image upload functionality
  }

  const handleProductView = (product) => {
    console.log('View product:', product)
    // TODO: Add view product functionality
  }

  const handlePaginationChange = (newPaginationModel) => {
    setCurrentPage(newPaginationModel.page + 1)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
          <MdAddShoppingCart />
          Add New Product
        </button>
      </div>

      {!emptyProduct && <h1>All Products</h1>}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyProduct ? (
            <div>
              <FaBoxOpen />
              <h2>No Product exist</h2>
            </div>
          ) : (
            <div>
              <DataGrid
                rows={tableRecords}
                columns={adminProductTableColumn(handleEdit, handleDelete, handleImageUpload, handleProductView)}
                autoHeight
                paginationMode="server"
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={[pagination?.pageSize || 10]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnResize
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: currentPage === pagination?.totalPages,
                }}
                sx={{
                  '& .MuiDataGrid-cell': { py: 1 },
                  '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f3f4f6' },
                }}
              />
            </div>
          )}
        </>
      )}

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  )
}

export default AdminProducts
