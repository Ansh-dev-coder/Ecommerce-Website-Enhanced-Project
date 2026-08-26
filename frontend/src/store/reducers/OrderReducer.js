const initialState={
    adminOrder : null,
    pagination : {},
    personalOrders: null,
    personalPagination: {},
    personalOrdersLoaded: false,
    sellerOrders: null,
    sellerPagination: {},
    sellerOrdersLoaded: false,
}
export const orderReducer=(state = initialState,action) =>{

    switch(action.type){
        case "GET_ADMIN_ORDERS" :
            return {
                ...state,
                adminOrder : action.payload,
                pagination : {
                    ...state.pagination,
                    pageNumber : action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements : action.totalElements,
                    totalPages: action.totalPages,
                    lastPage : action.lastPage
                }
            }

        case "UPDATE_ADMIN_ORDER_STATUS":
            return {
                ...state,
                adminOrder: state.adminOrder?.map((order) =>
                    order.orderId === action.payload.orderId
                        ? { ...order, orderStatus: action.payload.status }
                        : order
                ) || []
            }

        case "GET_PERSONAL_ORDERS":
            return {
                ...state,
                personalOrders: action.payload,
                personalPagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
                personalOrdersLoaded: true,
            }

        case "GET_SELLER_ORDERS":
            return {
                ...state,
                sellerOrders: action.payload,
                sellerPagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
                sellerOrdersLoaded: true,
            }

        case "UPDATE_SELLER_ORDER_STATUS":
            return {
                ...state,
                sellerOrders: state.sellerOrders?.map((order) =>
                    order.orderId === action.payload.orderId
                        ? { ...order, orderStatus: action.payload.status }
                        : order
                ) || []
            }

        case "SELLER_ORDERS_ERROR":
            return {
                ...state,
                sellerOrders: [],
                sellerPagination: {},
                sellerOrdersLoaded: true,
            }

        case "PERSONAL_ORDERS_ERROR":
            return {
                ...state,
                personalOrders: [],
                personalPagination: {},
                personalOrdersLoaded: true,
            }

        case "CLEAR_PERSONAL_ORDERS":
            return {
                ...state,
                personalOrders: null,
                personalPagination: {},
                personalOrdersLoaded: false,
            }

        case "CLEAR_SELLER_ORDERS":
            return {
                ...state,
                sellerOrders: null,
                sellerPagination: {},
                sellerOrdersLoaded: false,
            }

        default:
            return state
    }
}
