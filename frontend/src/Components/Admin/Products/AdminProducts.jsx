import React, { useState, useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaBoxOpen } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../../shared/Loader';
import { adminProductTableColumn } from '../../helper/tableColumn';
import { DataGrid } from '@mui/x-data-grid';
import useDashboardProductFilter from '../../../hooks/UseDashboardProductFilter';
import Modal from '../../shared/Modal';
import DeleteModal from '../../shared/DeleteModal';
import AddProductForm from './AddProductForm';
import { deleteProduct } from '../../../store/actions';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, pagination } = useSelector((state) => state.products);

  const [paginationModel, setPaginationModel] = useState({
    page: pagination?.pageNumber ?? 0,
    pageSize: pagination?.pageSize,
  });

  useDashboardProductFilter(paginationModel.page, paginationModel.pageSize);

  // Keep the controlled DataGrid model aligned with the server response.
  useEffect(() => {
    setPaginationModel((previousModel) => {
      const nextModel = {
        page: pagination?.pageNumber ?? previousModel.page,
        pageSize: pagination?.pageSize ?? previousModel.pageSize,
      };

      if (
        nextModel.page === previousModel.page &&
        nextModel.pageSize === previousModel.pageSize
      ) {
        return previousModel;
      }

      return nextModel;
    });
  }, [pagination?.pageNumber, pagination?.pageSize]);

  const emptyProduct = !products || products?.length === 0;
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

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
  const dataGridPaginationModel = {
    page: paginationModel.page,
    pageSize: paginationModel.pageSize ?? pagination?.pageSize,
  };

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsEditMode(true)
    setOpenProductModal(true)
  }

  const handleAddNew = () => {
    setSelectedProduct(null)
    setIsEditMode(false)
    setOpenProductModal(true)
  }

  const handleDelete = (product) => {
    setSelectedDeleteProduct(product)
    setOpenDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (!selectedDeleteProduct) {
      return
    }

    const params = new URLSearchParams()
    params.set('pageNumber', String(paginationModel.page))

    if (dataGridPaginationModel.pageSize !== undefined) {
      params.set('pageSize', String(dataGridPaginationModel.pageSize))
    }

    dispatch(deleteProduct(
      selectedDeleteProduct.productId,
      toast,
      () => {
        setOpenDeleteModal(false)
        setSelectedDeleteProduct(null)
      },
      params.toString()
    ))
  }

  const handleDeleteModalOpen = (open) => {
    setOpenDeleteModal(open)

    if (!open) {
      setSelectedDeleteProduct(null)
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
    setPaginationModel(newPaginationModel);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
        <button 
          onClick={handleAddNew}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 flex items-center gap-2"
        >
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
                paginationModel={dataGridPaginationModel}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={pagination?.pageSize ? [pagination.pageSize] : []}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnResize
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: paginationModel.page === pagination?.totalPages - 1,
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

      <Modal 
        open={openProductModal}
        setOpen={setOpenProductModal}
        title={isEditMode ? 'Update Product' : 'Add New Product'}
      >
        <AddProductForm
          setOpen={setOpenProductModal}
          product={selectedProduct}
          update={isEditMode}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={handleDeleteModalOpen}
        title="Delete Product"
        onDelete={handleDeleteConfirm}
      />
    </div>
  )
}

export default AdminProducts
