const initialState={
    user : null,
    sellers: null,
    sellerPagination: {},
    address : [],
    clientSecret : null,
    selectedUserCheckoutAddress : null,
}



export const AuthReducer=(state=initialState,action)=>{

    switch(action.type){
        case "LOGIN_USER":
            return {...state,user : action.payload}

        case "FETCH_SELLERS":
            return {
                ...state,
                sellers: action.payload,
                sellerPagination: {
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            }
               
        case "USER_ADDRESS" :
            return {...state,address : action.payload}

        case "SELECT_CHECKOUT_ADDRESS" :
            return {...state,selectedUserCheckoutAddress : action.payload}
        
        case "REMOVE_CHECKOUT_ADDRESS" :
            return {...state,selectedUserCheckoutAddress : null}
        case "CLIENT_SECRET":
            return{...state,clientSecret : action.payload}
        case "REMOVE_CLIENT_SECRET_ADDRESS" : 
            return  {...state,clientSecret : null,selectUserCheckoutAddress: null }
        default :
            return state
    }

}
