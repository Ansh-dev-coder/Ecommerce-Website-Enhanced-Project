import React, { useCallback, useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { FaBoxOpen, FaStore } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import Loader from '../../shared/Loader'
import Modal from '../../shared/Modal'
import DeleteModal from '../../shared/DeleteModal'
import { adminSellerTableColumn } from '../../helper/tableColumn'
import { deleteSeller, getAllSellers } from '../../../store/actions'
import AddSellerForm from './AddSellerForm'

const Seller = () => {
  const dispatch = useDispatch()
  const { sellers, sellerPagination } = useSelector((state) => state.auth)
  const { isLoading, errorMessage } = useSelector((state) => state.error)

  const [paginationModel, setPaginationModel] = useState({
    page: sellerPagination?.pageNumber ?? 0,
    pageSize: sellerPagination?.pageSize ?? 10,
  })
  const [openSellerModal, setOpenSellerModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [selectedSeller, setSelectedSeller] = useState(null)
  const [selectedViewSeller, setSelectedViewSeller] = useState(null)
  const [deleteLoader, setDeleteLoader] = useState(false)

  const currentPageSize = paginationModel.pageSize ?? sellerPagination?.pageSize

  const dataGridPaginationModel = {
    page: paginationModel.page,
    pageSize: currentPageSize,
  }

  const getSellerQueryString = useCallback((page = paginationModel.page) => {
    const params = new URLSearchParams()
    params.set('pageNumber', String(page))

    if (currentPageSize !== undefined) {
      params.set('pageSize', String(currentPageSize))
    }

    return params.toString()
  }, [currentPageSize, paginationModel.page])

  useEffect(() => {
    dispatch(getAllSellers(getSellerQueryString()))
  }, [dispatch, getSellerQueryString, paginationModel.page, paginationModel.pageSize])

  useEffect(() => {
    setPaginationModel((previousModel) => {
      const nextModel = {
        page: sellerPagination?.pageNumber ?? previousModel.page,
        pageSize: sellerPagination?.pageSize ?? previousModel.pageSize,
      }

      if (
        nextModel.page === previousModel.page &&
        nextModel.pageSize === previousModel.pageSize
      ) {
        return previousModel
      }

      return nextModel
    })
  }, [sellerPagination?.pageNumber, sellerPagination?.pageSize])

  const getSellerRole = (roles = []) => {
    const roleNames = Array.isArray(roles)
      ? roles.map((role) => role?.roleName || role?.name || role).filter(Boolean)
      : []

    return roleNames
      .map((roleName) => String(roleName).replace('ROLE_', ''))
      .join(', ')
  }

  const emptySeller = !sellers || sellers.length === 0

  const tableRecords = sellers?.map((seller) => ({
    id: seller.userId,
    userId: seller.userId,
    username: seller.username,
    email: seller.email,
    role: getSellerRole(seller.roles),
    roles: seller.roles,
    addressDTO: seller.addressDTO,
    cartDTO: seller.cartDTO,
  })) || []

  const handleAddNew = () => {
    setOpenSellerModal(true)
  }

  const handleView = (seller) => {
    setSelectedViewSeller(seller)
    setOpenViewModal(true)
  }

  const handleViewModalOpen = (open) => {
    setOpenViewModal(open)

    if (!open) {
      setSelectedViewSeller(null)
    }
  }

  const handleDelete = (seller) => {
    setSelectedSeller(seller)
    setOpenDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (!selectedSeller) {
      return
    }

    const nextPage = tableRecords.length === 1 && paginationModel.page > 0
      ? paginationModel.page - 1
      : paginationModel.page

    dispatch(deleteSeller(
      selectedSeller.userId,
      toast,
      () => {
        setOpenDeleteModal(false)
        setSelectedSeller(null)
      },
      setDeleteLoader,
      getSellerQueryString(nextPage)
    ))
  }

  const handleDeleteModalOpen = (open) => {
    setOpenDeleteModal(open)

    if (!open) {
      setSelectedSeller(null)
    }
  }

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Seller Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage seller accounts registered in the store.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <MdAdd size={20} />
          Add New Seller
        </button>
      </div>

      {!emptySeller && (
        <h2 className="mb-4 text-xl font-semibold text-slate-800">All Sellers</h2>
      )}

      {isLoading ? (
        <Loader text="Sellers Loading" />
      ) : (
        <>
          {emptySeller ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                <FaBoxOpen size={28} />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">No sellers found</h2>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                Add a seller account to begin managing seller users from the admin dashboard.
              </p>
              <button
                type="button"
                onClick={handleAddNew}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                <FaStore />
                Add New Seller
              </button>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-4 shadow-md">
              <DataGrid
                rows={tableRecords}
                columns={adminSellerTableColumn(handleView, handleDelete)}
                autoHeight
                paginationMode="server"
                rowCount={sellerPagination?.totalElements || 0}
                paginationModel={dataGridPaginationModel}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={sellerPagination?.pageSize ? [sellerPagination.pageSize] : []}
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: paginationModel.page === sellerPagination?.totalPages - 1,
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
        open={openSellerModal}
        setOpen={setOpenSellerModal}
        title="Add New Seller"
      >
        <AddSellerForm
          setOpen={setOpenSellerModal}
          queryString={getSellerQueryString()}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={handleDeleteModalOpen}
        title="Delete Seller"
        message="Are you sure you want to delete this seller? This action cannot be undone."
        onDelete={handleDeleteConfirm}
        isLoading={deleteLoader}
      />

      <Modal
        open={openViewModal}
        setOpen={handleViewModalOpen}
        title="Seller Details"
      >
        {selectedViewSeller && (
          <div className="mt-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Seller ID</p>
              <p className="mt-1 text-base font-medium text-slate-900">{selectedViewSeller.userId}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Username</p>
              <p className="mt-1 text-base font-medium text-slate-900">{selectedViewSeller.username}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Email</p>
              <p className="mt-1 text-base font-medium text-slate-900">{selectedViewSeller.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Role</p>
              <p className="mt-1 text-base font-medium text-slate-900">{selectedViewSeller.role || 'SELLER'}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Seller
