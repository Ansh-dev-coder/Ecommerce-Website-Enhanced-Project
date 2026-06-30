const intialState={
    cart :[],
    totalPrice:0,
    cartId:null
}
export const CartReducer=(state=intialState,action)=>{


    switch(action.type){
        case "ADD_CART":
            const productToADD=action.payload;
            const  existProduct=state.cart.find((item)=>item.productId===productToADD.productId);
            if(existProduct){
                const updatedCart=state.cart.map((item)=>{
                    if(item.productId===productToADD.productId){
                        return productToADD
                }else{
                    return item 
                }
            })

                return {
                    ...state,
                    cart:updatedCart,
                }
            }else{
                const newCart=[...state.cart,productToADD]
                return {
                    ...state,
                    cart:newCart,
                }
            }
        case "REMOVE_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.productId !== action.payload),
            }
            default:
                break;
               
        }


    return state ;



}