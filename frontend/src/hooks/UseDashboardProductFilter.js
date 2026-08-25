import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardProductsAction } from "../store/actions";

const useDashboardProductFilter = (page = 0, size, enabled = true) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchParamString = searchParams.toString();

  useEffect(() => {
    if (!enabled) {
      return
    }

    const params = new URLSearchParams();

    params.set("pageNumber", String(page));

    if (size !== undefined) {
      params.set("pageSize", String(size));
    }

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
  }, [dispatch, page, size, searchParamString, enabled, searchParams]);
};

export default useDashboardProductFilter;
