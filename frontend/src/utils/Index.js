import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa"

export const dashboardRoles = {
  ADMIN: "ROLE_ADMIN",
  SELLER: "ROLE_SELLER",
}

export const bannerList=[
    {
    id: 1,
    image: "https://embarkx.com/sample/placeholder.png",
    title: "Home Comfort",
    subtitle: "Living Room",
    description: "Upgrade your space with cozy and stylish sofas",
  },
  {
    id: 2,
    image: "https://embarkx.com/sample/placeholder.png",
    title: "Entertainment Hub",
    subtitle: "Smart TV",
    description: "Experience the latest in home entertainment",
  },
  {
    id: 3,
    image: "https://embarkx.com/sample/placeholder.png",
    title: "Playful Picks",
    subtitle: "Kids' Clothing",
    description: "Bright and fun styles for kids, up to 20% off",
}
]
export const adminNavigation=[
  {name : "Dashboard",
    href : "/admin" ,
     icon :FaHome , 
     current : true,
     allowedRoles: [dashboardRoles.ADMIN, dashboardRoles.SELLER],
    },
     {
      name : "Orders",
      href : "/admin/order",
      icon : FaShoppingCart,
      allowedRoles: [dashboardRoles.ADMIN, dashboardRoles.SELLER],
     } ,
     {
      name :"Product",
      href : "/admin/products",
      icon : FaBoxOpen,
      allowedRoles: [dashboardRoles.ADMIN, dashboardRoles.SELLER],
     },
     {
      name : "Categories",
      href : "/admin/categories",
      icon : FaThList,
      allowedRoles: [dashboardRoles.ADMIN],
     },
     {
      name : "Sellers",
      href: "/admin/sellers",
      icon : FaStore,
      allowedRoles: [dashboardRoles.ADMIN],
     }
]

export const getDashboardNavigation = (roles) => {
  const assignedRoles = Array.isArray(roles) ? roles : []

  return adminNavigation.filter((item) =>
    item.allowedRoles.some((role) => assignedRoles.includes(role))
  )
}
