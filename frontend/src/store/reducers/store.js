import {configureStore} from "@reduxjs/toolkit"
import { ProductReducer } from "./ProductReducer"
import { ErrorReducer } from "./ErrorReducer"
import { CartReducer } from "./CartReducer"
import { AuthReducer } from "./AuthReducer"
import { paymentMethodReducer } from "./PaymentMethodReducer"
import {AdminReducer} from "./AdminReducer"


const user =localStorage.getItem("auth") 
? JSON.parse(localStorage.getItem("auth")): null


const cartItems =localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems")):[]

const selectedUserCheckoutAddress=localStorage.getItem("CHECKOUT_ADDRESS")
? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
:[]

const intialState={

    auth : {user : user,selectedUserCheckoutAddress},
    carts:{cart:cartItems}
}


export const store = configureStore({
    reducer : {
        products : ProductReducer,
        error: ErrorReducer,
        carts : CartReducer,
        auth : AuthReducer,
        payment : paymentMethodReducer,
        admin : AdminReducer,

    },
    preloadedState: intialState,
})
export default store