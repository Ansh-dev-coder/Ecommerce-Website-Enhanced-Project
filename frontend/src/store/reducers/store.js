import {configureStore} from "@reduxjs/toolkit"
import { ProductReducer } from "./ProductReducer"
import { ErrorReducer } from "./ErrorReducer"
import { CartReducer } from "./CartReducer"
import { AuthReducer } from "./AuthReducer"
import { paymentMethodReducer } from "./PaymentMethodReducer"
import {AdminReducer} from "./AdminReducer"
import { orderReducer } from "./OrderReducer"


const user =localStorage.getItem("auth") 
? JSON.parse(localStorage.getItem("auth")): null


const selectedUserCheckoutAddress=localStorage.getItem("CHECKOUT_ADDRESS")
? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
:[]

const intialState={

    auth : {user : user,selectedUserCheckoutAddress},
    carts:{cart:[]}
}


export const store = configureStore({
    reducer : {
        products : ProductReducer,
        error: ErrorReducer,
        carts : CartReducer,
        auth : AuthReducer,
        payment : paymentMethodReducer,
        admin : AdminReducer,
        order :  orderReducer

    },
    preloadedState: intialState,
})
export default store
