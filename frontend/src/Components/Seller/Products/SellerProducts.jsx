import React from "react";
import { useSelector } from "react-redux";
import AdminProducts from "../../Admin/Products/AdminProducts";
import {
  addSellerProduct,
  deleteSellerProduct,
  sellerProductsAction,
  updateSellerProduct,
  updateSellerProductImage,
} from "../../../store/actions";

const SellerProducts = () => {
  const { sellerProducts, sellerPagination } = useSelector((state) => state.products);

  return (
    <AdminProducts
      panelType="seller"
      fetchProductsAction={sellerProductsAction}
      productsOverride={sellerProducts}
      paginationOverride={sellerPagination}
      addProductAction={addSellerProduct}
      updateProductAction={updateSellerProduct}
      deleteProductAction={deleteSellerProduct}
      updateImageAction={updateSellerProductImage}
    />
  );
};

export default SellerProducts;
