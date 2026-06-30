import { useEffect } from "react"
import ProductCard from "../shared/ProductCard"
import {FaExclamationTriangle} from 'react-icons/fa'

import {useSelector, useDispatch} from 'react-redux'
import { fetchCategories } from "../../store/actions"
import Filter from "./Filter"
import useProductFilter from "../../hooks/UseProductFilter"
import Loader from "../shared/Loader"
import Paginations from "../shared/Paginations"


const Products= ()=>{

    const {isLoading , errorMessage}=useSelector(
        (state)=>state.error
    )

    // const {isLoading , errorMessage}=useSelector(
    //     (state)=>state.errors)
    // const isLoading=false

    // const errorMessage=''

    const {products,categories,pagination} =useSelector((state)=>state.products)
    const dispatch=useDispatch()
    useProductFilter()

    useEffect(()=>{
        dispatch(fetchCategories())
    },[dispatch])
    
    return(
        <div  className="lg:px-14 sm:px-8 px-4 py-14 2x1:w=[90%]" >

            <Filter categories={categories ? categories : []} />
            {
                isLoading?(
                    <Loader text={"Products Loading"}/>
                    
                ) : errorMessage ? ( 
                    <div className="flex justify-center items-center h-[200px]"> 
                            <FaExclamationTriangle  className="text-slate-800 text-3xl mr-2"/>
                            <span className="text-slate-800 text-lg font-medium">
                                {errorMessage}
                            </span>
                    </div>
                   
                ) : (
                    <div className="min-h-[700px]">
                        <div className="pb-6 pt-14 grid 2xl:-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {products && 
                             products.map((item,i)=><ProductCard key={i} {...item}/>
                             )}
                        </div>
                        <div className="flex justify-center pt-10">
                            <Paginations 
                             numberOfPage={pagination?.totalPages}
                             totalProducts={pagination?.totalElements}
                            />
                        </div>
                        
                    </div>
                )
            }

        </div>
    )

}
export default Products