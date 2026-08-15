import React, { useState } from 'react'
import {MdAddShoppingCart} from 'react-icons/md'
import {FaBoxOpen} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import Loader from '../../shared/Loader';
import { adminProductTableColumn } from '../../helper/tableColumn';
import { DataGrid } from '@mui/x-data-grid';
const AdminProducts = () => {
  const [products, setProducts] = useState([
    {
      productId: 1,
      productName: 'Samsung Galaxy S24',
      description: 'Flagship Android smartphone with Snapdragon processor',
      image: 'http://localhost:8080/images/default.png',
      quantity: 10,
      price: 74999.0,
      discount: 10.0,
      specialPrice: 67499.0
    },
    {
      productId: 2,
      productName: 'iPhone 15 Pro',
      description: 'Premium Apple smartphone with A17 Pro chip',
      image: 'http://localhost:8080/images/default.png',
      quantity: 15,
      price: 129999.0,
      discount: 8.0,
      specialPrice: 119599.0
    },
    {
      productId: 3,
      productName: 'Sony WH-1000XM5 Headphones',
      description: 'Noise-cancelling wireless headphones with 30-hour battery',
      image: 'http://localhost:8080/images/default.png',
      quantity: 25,
      price: 29990.0,
      discount: 15.0,
      specialPrice: 25491.5
    },
    {
      productId: 4,
      productName: 'Apple iPad Pro 12.9',
      description: 'Powerful tablet with M2 chip and ProMotion display',
      image: 'http://localhost:8080/images/default.png',
      quantity: 8,
      price: 119999.0,
      discount: 12.0,
      specialPrice: 105599.0
    },
    {
      productId: 5,
      productName: 'Dell XPS 13 Laptop',
      description: 'Ultra-thin laptop with Intel i7 processor',
      image: 'http://localhost:8080/images/default.png',
      quantity: 0,
      price: 99999.0,
      discount: 5.0,
      specialPrice: 94999.0
    },
    {
      productId: 6,
      productName: 'Samsung 55" 4K TV',
      description: '55-inch QLED 4K Smart TV with HDR support',
      image: 'http://localhost:8080/images/default.png',
      quantity: 5,
      price: 54999.0,
      discount: 20.0,
      specialPrice: 43999.0
    },
    {
      productId: 7,
      productName: 'GoPro Hero 12',
      description: 'Action camera with 5.3K video recording',
      image: 'http://localhost:8080/images/default.png',
      quantity: 18,
      price: 44999.0,
      discount: 7.0,
      specialPrice: 41849.0
    },
    {
      productId: 8,
      productName: 'Canon EOS R5 Camera',
      description: 'Professional mirrorless camera with 8K video',
      image: 'http://localhost:8080/images/default.png',
      quantity: 3,
      price: 349999.0,
      discount: 6.0,
      specialPrice: 329099.0
    }
  ])

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 8,
    totalPages: 1
  })
  const [currentPage, setCurrentPage] = useState(0)

  const emptyProduct=!products || products?.length===0;
  const {isLoding,errorMessage}=useSelector((state)=>state.error)
  
  const tableRecords=products?.map((item)=>{
        return {
            id: item.productId,
            productId: item.productId,
            productName : item.productName,
            description : item.description,
            image : item.image,
            quantity : item.quantity,
            price : item.price,
            discount : item.discount,
            specialPrice : item.specialPrice    
        }
    })

  const handleEdit = (product) => {
    console.log('Edit product:', product)
    // TODO: Add edit functionality
  }

  const handleDelete = (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.productId !== product.productId))
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
    setCurrentPage(newPaginationModel.page)
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
          <MdAddShoppingCart    />
           Add New Product
        </button>
      </div>

        {!emptyProduct && (
          <h1>All Products</h1>
        )}
        {isLoding ? (<Loader/>)
        :
         <>
         {emptyProduct ? (<div>
          <FaBoxOpen/>
          <h2>No Product exist</h2>
         </div>) : (<div>

          <DataGrid
                        rows={tableRecords}
                        columns={adminProductTableColumn(handleEdit,handleDelete,handleImageUpload,handleProductView)}
                        paginationMode="server"
                        rowCount={pagination?.totalElements || 0}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: pagination?.pageSize || 10,
                              page: currentPage
                            }
                          }
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
                          hideNextButton: currentPage === pagination?.totalPages - 1,
                        }}
                      />


         </div>)}
        </>}

      
    </div>
  )
}

export default AdminProducts