import {Pagination} from "@mui/material"
import {useSearchParams , useLocation, useNavigate } from 'react-router-dom'

const Paginations = ({numberOfPage,totalProducts})=>{

    const [searchParams]=useSearchParams();
    const pathname=useLocation().pathname;
    const params =new URLSearchParams(searchParams);
    const navigate=useNavigate();
    const paramValue=searchParams.get("page")?Number(searchParams.get("page")):1;

    const onChangeHandeler=(event,value)=>{
        params.set("page",value.toString())
        navigate(`${pathname}?${params}`)

    }
    return (
       <Pagination 
        count={numberOfPage}
        page={paramValue}
        defaultPage={1} 
        siblingCount={1} 
        boundaryCount={1}
        shape="rounded"
        onChange={onChangeHandeler}
        />
    )
}
export default Paginations