import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux";
const useOrderFilter =(fetchOrders)=>{
    const [searchParams]=useSearchParams()
    const dispatch=useDispatch();
    useEffect(()=>{

        const params=new URLSearchParams()

        const currentPage=searchParams.get("page") ? Number(searchParams.get("page")) : 1;

        params.set("pageNumber",currentPage-1)


        const queryString=params.toString()
         dispatch(fetchOrders(queryString))


    },[dispatch,fetchOrders,searchParams])

   
}


export default useOrderFilter
