import React, { useEffect, useState } from 'react'
import { MdAdd, MdCategory } from 'react-icons/md'
import { FaBoxOpen } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import Loader from '../../shared/Loader'
import Modal from '../../shared/Modal'
import DeleteModal from '../../shared/DeleteModal'
import { adminCategoryTableColumn } from '../../helper/tableColumn'
import { deleteCategory, fetchCategories } from '../../../store/actions'
import AddCategoryForm from './AddCategoryForm'

const Category = () => {
  const dispatch = useDispatch()
  const { categories, pagination } = useSelector((state) => state.products)
  const { categoryLoader, errorMessage } = useSelector((state) => state.error)

  const [paginationModel, setPaginationModel] = useState({
    page: pagination?.pageNumber ?? 0,
    pageSize: pagination?.pageSize,
  })

  const [openCategoryModal, setOpenCategoryModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [deleteLoader, setDeleteLoader] = useState(false)

  const dataGridPaginationModel = {
    page: paginationModel.page,
    pageSize: paginationModel.pageSize ?? pagination?.pageSize,
  }

  const getCategoryQueryString = (page = paginationModel.page) => {
    const params = new URLSearchParams()
    params.set('pageNumber', String(page))

    if (dataGridPaginationModel.pageSize !== undefined) {
      params.set('pageSize', String(dataGridPaginationModel.pageSize))
    }

    return params.toString()
  }

  useEffect(() => {
    dispatch(fetchCategories(getCategoryQueryString()))
  }, [dispatch, paginationModel.page, paginationModel.pageSize])

  useEffect(() => {
    setPaginationModel((previousModel) => {
      const nextModel = {
        page: pagination?.pageNumber ?? previousModel.page,
        pageSize: pagination?.pageSize ?? previousModel.pageSize,
      }

      if (
        nextModel.page === previousModel.page &&
        nextModel.pageSize === previousModel.pageSize
      ) {
        return previousModel
      }

      return nextModel
    })
  }, [pagination?.pageNumber, pagination?.pageSize])

  const emptyCategory = !categories || categories.length === 0

  const tableRecords = categories?.map((category) => ({
    id: category.categoryId,
    categoryId: category.categoryId,
    categoryName: category.categoryName,
  })) || []

  const handleAddNew = () => {
    setOpenCategoryModal(true)
  }

  const handleDelete = (category) => {
    setSelectedCategory(category)
    setOpenDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (!selectedCategory) {
      return
    }

    const nextPage = tableRecords.length === 1 && paginationModel.page > 0
      ? paginationModel.page - 1
      : paginationModel.page

    dispatch(deleteCategory(
      selectedCategory.categoryId,
      toast,
      () => {
        setOpenDeleteModal(false)
        setSelectedCategory(null)
      },
      setDeleteLoader,
      getCategoryQueryString(nextPage)
    ))
  }

  const handleDeleteModalOpen = (open) => {
    setOpenDeleteModal(open)

    if (!open) {
      setSelectedCategory(null)
    }
  }

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage product categories used across the store.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <MdAdd size={20} />
          Add New Category
        </button>
      </div>

      {!emptyCategory && (
        <h2 className="mb-4 text-xl font-semibold text-slate-800">All Categories</h2>
      )}

      {categoryLoader ? (
        <Loader text="Categories Loading" />
      ) : (
        <>
          {emptyCategory ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaBoxOpen size={28} />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">No categories found</h2>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                Add your first category to start organizing products in the admin dashboard.
              </p>
              <button
                type="button"
                onClick={handleAddNew}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                <MdCategory />
                Add New Category
              </button>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-4 shadow-md">
              <DataGrid
                rows={tableRecords}
                columns={adminCategoryTableColumn(handleDelete)}
                autoHeight
                paginationMode="server"
                rowCount={pagination?.totalElements || 0}
                paginationModel={dataGridPaginationModel}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={pagination?.pageSize ? [pagination.pageSize] : []}
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: paginationModel.page === pagination?.totalPages - 1,
                }}
                disableRowSelectionOnClick
                disableColumnResize
                sx={{
                  '& .MuiDataGrid-cell': { py: 1 },
                  '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f3f4f6' },
                }}
              />
            </div>
          )}
        </>
      )}

      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

      <Modal
        open={openCategoryModal}
        setOpen={setOpenCategoryModal}
        title="Add New Category"
      >
        <AddCategoryForm
          setOpen={setOpenCategoryModal}
          queryString={getCategoryQueryString()}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={handleDeleteModalOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        onDelete={handleDeleteConfirm}
        isLoading={deleteLoader}
      />
    </div>
  )
}

export default Category
