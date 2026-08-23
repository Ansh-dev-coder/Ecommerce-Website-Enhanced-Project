const initialState={
    adminOrder : null,
    pagination : {},
    personalOrders: null,
    personalPagination: {},
    personalOrdersLoaded: false,
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

        default:
            return state
    }
}
