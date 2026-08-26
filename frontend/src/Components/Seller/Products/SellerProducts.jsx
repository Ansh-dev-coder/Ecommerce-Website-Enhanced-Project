import React from "react";
import { useSelector } from "react-redux";
import AdminProducts from "../../Admin/Products/AdminProducts";
import { sellerProductsAction } from "../../../store/actions";

const SellerProducts = () => {
  const { sellerProducts, sellerPagination } = useSelector((state) => state.products);

  return (
    <AdminProducts
      panelType="seller"
      fetchProductsAction={sellerProductsAction}
      productsOverride={sellerProducts}
      paginationOverride={sellerPagination}
      canAddProduct={false}
      canEditProduct={false}
      canDeleteProduct={false}
      canUpdateImage={false}
    />
  );
};

export default SellerProducts;
