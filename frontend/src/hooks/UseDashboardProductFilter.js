import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardProductsAction } from "../store/actions";

const useDashboardProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();
    const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    params.set("pageNumber", String(currentPage - 1));
    params.set("size", "10");

    const sortOrder = searchParams.get("sortby") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;

    params.set("sortBy", "price");
    params.set("sortOrder", sortOrder);

    if (categoryParams) {
      params.set("category", categoryParams);
    }

    if (keyword) {
      params.set("keyword", keyword);
    }

    const queryString = params.toString();
    dispatch(dashboardProductsAction(queryString));
  }, [dispatch, searchParams]);
};

export default useDashboardProductFilter;