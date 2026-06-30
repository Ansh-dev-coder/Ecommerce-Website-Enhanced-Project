const initialState={
    user : null,
    address : []
}



export const AuthReducer=(state=initialState,action)=>{

    switch(action.type){
        case "LOGIN_USER":
            return {...state,user : action.payload}
               
        case "USER_ADDRESS" :
            return {...state,address : action.payload}

        default :
            return state
    }

}