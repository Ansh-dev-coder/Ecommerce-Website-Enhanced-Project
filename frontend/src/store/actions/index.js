import { MdApi } from "react-icons/md"
import api from "../../api/api"
import { useState } from "react"


export const fetchProducts=(queryString)=>async (dispatch)=>{
    try{

        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get(`/public/products?${queryString}`)
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        })

        dispatch({type:"IS_SUCCESS"})
    }catch(error){
        console.log(error)
        dispatch({
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "failed to fetch products",
        })
    }
}

export const fetchCategories=()=>async(dispatch)=>{

    try{
        dispatch({type:"CATEGORY_LOADER"})
        const {data} =await api.get(`/public/categories`)
        dispatch({
            type : "FETCH_CATEGORIES"   ,
            payload: data.content,
            pageNumber:data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages : data.totalPages,
            lastPage : data.lastPage
        })
        dispatch({type : "IS_SUCCESS"})
    }catch(error){
            console.log(error)
            dispatch({
                type:"IS_ERROR",
                payload: error?.response?.data?.message || "Failed to fetch categories",
            })
    }

}


export const addtoCart =(data ,qty=1 ,toast)=>
    (dispatch,getState)=>{

        const {products}=getState().products
        const getProduct=products.find((item)=>item.id===data.id)
        const isQuantityExist=getProduct.quantity>=qty
        if(isQuantityExist){dispatch({type:"ADD_CART",payload:{...data,quantity:qty}})
         toast.success(`${data.productName} added to cart successfully`)
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
            
        }else{

            toast.error("Out of stock")
        }


}

export const increaseCartQuantity =
(data , toast , currentQuantity,setCurrentQuantity)=>
    (dispatch,getState)=>{
  const products = getState().products?.products || [];
  const getProduct = products.find(
    (item) => item.id === data.productId
  )

  const newQuantity = currentQuantity + 1
  const isQuantityExist = getProduct ? getProduct.quantity >= newQuantity : true
  if(isQuantityExist){

    setCurrentQuantity(newQuantity)

    dispatch({
        type: "ADD_CART",
        payload : {...data , quantity: newQuantity}
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
  }else{
    toast.error("Quantity reached to limit")
  }


}

export const decreaseCartQuantity =
(data , toast , currentQuantity,setCurrentQuantity)=>
    (dispatch,getState)=>{
  const newQuantity = Math.max(1, currentQuantity - 1)

  setCurrentQuantity(newQuantity)

  dispatch({
        type: "ADD_CART",
        payload : {...data , quantity: newQuantity}
    })

  localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
}

export const removeCartItem =
(productId, toast, productName) =>
    (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: productId,
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))

  if (toast) {
    toast.success(`${productName || "Item"} removed from cart`)
  }
}

export const authenticateSigninUser=(sendData,toast,reset,navigate,setLoader)=> async(dispatch)=>{
try{
    setLoader(true)
    const {data}=await api.post("/auth/signin",sendData)
    dispatch({type : "LOGIN_USER",payload : data})
    localStorage.setItem("auth",JSON.stringify(data))
    reset()
    toast.success("Login Success")
    navigate("/")

}catch(error){
toast.error(error.response.data.message || "Internal Server Error")

}
finally{
    setLoader(false)
}
}
export const authenticateSignupUser=(sendData,toast,reset,navigate,setLoader)=> async(dispatch)=>{
try{
    setLoader(true)
    const {data}=await api.post("/auth/signup",sendData)
    reset()
    toast.success(data?.message||"User Registered SuccessFully")
    navigate("/login")

}catch(error){
toast.error(error?.response?.data?.message || "Internal Server Error")

}
finally{
    setLoader(false)
}
}

export const addUpdateUserAddress=(sendData,toast,addressId,setOpenAddressModal,)=> async(dispatch,getState)=>{
const { user}=getState().auth
dispatch({type : "BUTTON_LOADER"})
try{

   

    if(addressId){
        const {data}=await api.put(`addresses/${addressId}`,sendData)
            
    }else{
         
         const {data}=await api.post("/addresses",sendData)
    }
    dispatch(getUserAddress())
    toast.success("Address saved successfully")
    dispatch({type:"IS_SUCCESS"})
}catch (error) {
    toast.error(error?.response?.data?.message || "Internal Server Error"
    )
    dispatch ({type : "IS_ERROR" , payload : null})

}finally {
    setOpenAddressModal(false);
}
}

export const getUserAddress = ()=>async(dispatch,getState)=>{
    try{

        dispatch({type: "IS_FETCHING"})
        const {data}=await api.get(`/user/address`)
        dispatch({type: "USER_ADDRESS",payload : data})
        dispatch({type :  "IS_SUCCESS"})
    }catch(error){
        dispatch({type : "IS_ERROR",
            payload : error?.response?.data?.message || "Failed to Fetch User Addresses"
        })
    }
}
export const deleteUserAddress = 
(toast,addressId,setOpenDeleteModal)=>async(dispatch,getState)=>{
    try{

        dispatch({type: "IS_FETCHING"})
        await api.delete(`/addresses/${addressId}`)
        dispatch({type :  "IS_SUCCESS"})
        dispatch(getUserAddress())
        dispatch(clearCheckoutAddress())
        toast.success("Address Deleted successfully")
        
    }catch(error){
        dispatch({type : "IS_ERROR",
            payload : error?.response?.data?.message || "Some Error Occured"
        })
    }finally{
        setOpenDeleteModal(false)
    }
}
export const clearCheckoutAddress=()=>{
    return {
        type : "REMOVE_CHECKOUT_ADDRESS"
    }
}

export const selectUserCheckoutAddress=(address)=>{
    return{
        type: "SELECT_CHECKOUT_ADDRESS",
        payload : address,
    }
}

export const addPaymentMethod=(method)=>{
    return{
        type:"ADD_PAYMENT_METHOD",
        payload : method,
    }
}