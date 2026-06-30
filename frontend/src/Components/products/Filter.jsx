
import { FormControl, InputLabel,Select, MenuItem, Tooltip, Button  } from "@mui/material"
import { useEffect, useState } from "react"
import {FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch} from 'react-icons/fi'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'

const Filter =({categories})=>{

 

    const [searchParams]= useSearchParams()
    const params=new URLSearchParams(searchParams)
    const pathName= useLocation().pathname    
    const navigate= useNavigate()

    const [category, setCategory]=useState("all")
    const [sortOrder,setSortOrder]=useState("asc")
    const [searchTerm,setSearchTerm]=useState("")


    useEffect(()=>{
        const currentCategory=searchParams.get("category") || "all";
        const currentSortOrder=searchParams.get("sortby") || "asc";
        const currentSearchTerm=searchParams.get("keyword") || "";
        setCategory(currentCategory)
        setSortOrder(currentSortOrder)
        setSearchTerm(currentSearchTerm)

    },[searchParams])

    useEffect(()=>{
        const handler=setTimeout(()=>{
            if(searchTerm){
                searchParams.set("keyword",searchTerm)
            }else{
                searchParams.delete("keyword");
            }
            navigate(`${pathName}?${params.toString()}`)
        },700)
        return()=>{
            clearTimeout(handler)
        }
    },[searchParams,searchTerm,navigate,pathName])

    const handleCategoryChange=(event)=>{
        const selectedCategory=event.target.value

        if(selectedCategory==="all"){
            params.delete("category")
        }else{
            params.set("category",selectedCategory)
        }
        navigate(`${pathName}?${params}`)
        setCategory(event.target.value)

    }

    const toggleSortOrder =()=>{
        setSortOrder((prevOrder)=>{
            const newOrder= (prevOrder==="asc")? "desc" : "asc"
            params.set("sortby",newOrder)
             navigate(`${pathName}?${params}`)
             return newOrder
        })
    }

    const handleclearFilter=()=>{
        navigate({pathname : window.location.pathname})
    }
    return(
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/*SEARCH BAR */}
            <div className="relative flex items-center 2x1:w-[450px] sm:w[420px] ">
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}  type="text" placeholder="Search Products" 
                className="border border-gray-400 text-black-100 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2] "/>
                <FiSearch size={20} className="absolute left-3 text-slate-800"/>
            </div>

            {/*Category UI */}

            <div className="flex sm:flex-row flex-col gap-4 items-center ">
                <FormControl className="text-slate-800 border-slate-700"
                variant="outlined" size="small">
                    <InputLabel labelId="category-select-label" >Category</InputLabel>
                    <Select 
                    labelid="category-select-label"  
                    value={category} 
                    onChange={handleCategoryChange}
                     label="Category"
                     className="min-w-[120px] text-slate-800 border-slate-700">

                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item)=>(
                            <MenuItem  key={item.categoryId} value={item.categoryName}>{item.categoryName}</MenuItem>
                        ))}
                    </Select>

                </FormControl>

                {/**/}
                <Tooltip title="Sorted by Price : asc">
                        <Button onClick={toggleSortOrder} variant="contained" color="primary" className="flex items-center gap-2 h-10" >
                            Sort By
                            {sortOrder==="asc"?
                            (<FiArrowUp  size={20}/>):(<FiArrowDown size={20}/>)}
                            </Button>
                </Tooltip>
                <button  onClick={handleclearFilter} className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none">
                    <FiRefreshCw  size={16} className="font-semibold" />
                    <span className="font-semibold ">Clear filter</span>
                </button>

            </div>
        </div>
    )

}
export default Filter
