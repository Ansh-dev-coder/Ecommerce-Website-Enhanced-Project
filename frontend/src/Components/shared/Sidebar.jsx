import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa';
import { adminNavigation } from '../../utils/Index';
import { Link } from 'react-router-dom';

const Sidebar = ({isProfileLayout=false}) => {


    const pathName=useLocation().pathName;
    const {user} =useSelector((state)=>state.auth)
    const sideBarLayout=adminNavigation

  return (
    <div>
        <div>
            <FaTachometerAlt/>
            <h1>
                Admin Panel
            </h1>
        </div>
        <nav>
          <ul role='list' className=''>
            <li>
                <ul role='list' className=''>
                    {sideBarLayout.map((item)=>(
                        <li key={item.name}>
                            <Link to={item.href} className='' >
                               
                            </Link>
                        </li>
                    ))}

                </ul>
            </li>

          </ul>
             
        </nav>
    </div>
  )
}

export default Sidebar