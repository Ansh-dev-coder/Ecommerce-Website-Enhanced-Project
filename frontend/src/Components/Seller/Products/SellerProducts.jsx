import React from "react";
import AdminProducts from "../../Admin/Products/AdminProducts";

const sellerProductsPagination = {
  pageNumber: 0,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
  lastPage: true,
};

const SellerProducts = () => {
  return (
    <AdminProducts
      panelType="seller"
      fetchProducts={false}
      productsOverride={[]}
      paginationOverride={sellerProductsPagination}
      integrationPending
    />
  );
};

export default SellerProducts;
