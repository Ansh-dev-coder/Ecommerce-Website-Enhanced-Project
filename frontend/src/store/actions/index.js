import { MdApi } from "react-icons/md"
import api from "../../api/api"
import { useState } from "react"
import toast from "react-hot-toast"


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
    localStorage.setItem("CHECKOUT_ADDRESS",JSON.stringify(address))
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

export const createUserCart=(sendCartItems)=>async(dispatch,getState)=>{
    try{
        dispatch({type : "IS_FETCHING"})
        await api.post("/cart/create",sendCartItems)
        await dispatch(getUserCart())

    }catch(error){
        dispatch({type : "IS_ERROR",
            payload : error?.response?.data?.message || "Failed to create cart Items",
              })
    }
}

export const getUserCart=()=>async(dispatch,getState)=>{
    try {
        dispatch({type : "IS_FETCHING"})
        const {data}=await api.get("/carts/users/cart")
        dispatch ({
            type : "GET_USER_CART_PRODUCTS",
            payload : data.products,
            totalPrice : data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
        dispatch({type : "IS_SUCCESS"})
    }catch(error){
        dispatch({type : "IS_ERROR",
            payload : error?.response?.data?.message || "Failed to Fetch cart items",
        })
    }
}

export const createStripePaymentSecret = (sendData)=>async(dispatch,getState)=>{
    try{

        dispatch({type : "IS_FETCHING"})
        const {data} = await api.post("/order/stripe-client-secret",sendData)
        dispatch({type : "CLIENT_SECRET",payload:data})
        localStorage.setItem("client-secret",JSON.stringify(data))
        dispatch({type : "IS_SUCCESS"})
    }catch(error){
        toast.error(error?.response?.data?.message || "Failed to create client")
    }

} 

export const stripePaymentConfirmation=(setErrorMessage , setLoading,toast,sendData)=> async(dispatch,getState)=>{

    try{
        const response = await api.post(`order/users/payments/Online`,sendData)
        if(response?.data){
            localStorage.removeItem("CHECKOUT_ADDRESS")
            localStorage.removeItem("cartItems")
            localStorage.removeItem("client-secret")
            dispatch({type:"REMOVE_CLIENT_SECRET_ADDRESS"})
            dispatch({type:"CLEAR_CART"})
            toast.success("Order Accepted")
        }else{
            setErrorMessage("Payment Failed. Please try again")
        }
    }catch(error){
    console.error("Stripe payment confirmation failed", error)
    setErrorMessage(error?.response?.data?.message || "Payment failed. Please Try again")
    }
}

export const analyticsAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get('/admin/app/analytics')
        dispatch({
            type: "FETCH_ANALYTICS",
            payload: data
        })
        dispatch({type : "IS_SUCCESS"})

    }catch(error){
        dispatch({
            type : "IS_ERROR",
            payload : error?.response?.data?.message || "Failed to fetch analytics data "
        })
    }
}
export const getOrdersForDashboards=(queryString)=>async (dispatch)=>{
    try{

        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get(`/admin/orders?${queryString}`)
        dispatch({
            type: "GET_ADMIN_ORDERS",
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
            payload: error?.response?.data?.message || "failed to fetch orders data",
        })
    }
}

export const updateOrderStatus = (orderId, status, notes, toast, setOpen, setLoader) => async (dispatch) => {
    try {
        setLoader?.(true)

        const { data } = await api.put(`/admin/orders/${orderId}/status`, {
           status: status,
                 })

        dispatch({
            type: "UPDATE_ADMIN_ORDER_STATUS",
            payload: {
                orderId,
                status,
                notes,
            },
        })

        dispatch(getOrdersForDashboards("page=0&size=10"))
        toast.success(data?.message || "Order status updated successfully")
        setOpen?.(false)
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to update order status")
    } finally {
        setLoader?.(false)
    }
}
export const dashboardProductsAction=(queryString)=>async (dispatch)=>{
    try{

        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get(`/admin/products?${queryString}`)
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
            payload: error?.response?.data?.message || "failed to fetch dashboard products",
        })
    }
}

export const addProduct = (productData, toast, setOpen) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" })
        
        const { data } = await api.post(`/admin/categories/${productData.categoryId}/product`, productData)

        dispatch({ type: "IS_SUCCESS" })
        toast.success('Product added successfully')
        
        // Refresh products list
        dispatch(dashboardProductsAction("pageNumber=0"))
        
        if (setOpen) {
            setOpen(false)
        }
    } catch (error) {
        console.error('Error adding product:', error)
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to add product",
        })
        toast.error(error?.response?.data?.message || 'Failed to add product')
    }
}

export const updateProduct = (productId, productData, toast, setOpen) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" })
        
        const { data } = await api.put(`/admin/products/${productId}`, productData)

        dispatch({ type: "IS_SUCCESS" })
        toast.success('Product updated successfully')
        
        // Refresh products list
        dispatch(dashboardProductsAction("pageNumber=0"))
        
        if (setOpen) {
            setOpen(false)
        }
    } catch (error) {
        console.error('Error updating product:', error)
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to update product",
        })
        toast.error(error?.response?.data?.message || 'Failed to update product')
    }
}

export const deleteProduct = (productId, toast, onSuccess, queryString = "pageNumber=0") => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" })

        const { data } = await api.delete(`/admin/products/${productId}`)

        dispatch({ type: "IS_SUCCESS" })
        toast.success(data?.message || "Product deleted successfully")
        dispatch(dashboardProductsAction(queryString))
        onSuccess?.()
    } catch (error) {
        console.error("Error deleting product:", error)
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to delete product",
        })
        toast.error(error?.response?.data?.message || "Failed to delete product")
    }
}

export const updateProductImage = (productId, imageFile, toast, setOpen, setLoader, queryString = "pageNumber=0") => async (dispatch) => {
    const formData = new FormData()
    formData.append("image", imageFile)

    try {
        setLoader?.(true)
        dispatch({ type: "IS_FETCHING" })

        const { data } = await api.put(`/products/${productId}/image`, formData)

        dispatch({ type: "IS_SUCCESS" })
        toast.success(data?.message || "Product image updated successfully")
        dispatch(dashboardProductsAction(queryString))
        setOpen?.(false)
    } catch (error) {
        console.error("Error updating product image:", error)
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to update product image",
        })
        toast.error(error?.response?.data?.message || "Failed to update product image")
    } finally {
        setLoader?.(false)
    }
}
