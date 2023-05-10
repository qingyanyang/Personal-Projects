import Layout from "../pages/Layout"
import Login from "../pages/Login"
import Order from "../pages/Order"
import OrderListHome from "../pages/Order/OrderListHome"
import OrderListRank from "../pages/Order/OrderListRank"
import Menus from "../pages/Menus"
import MenuList from "../pages/MenuList"
import MenuListHome from '../pages/MenuList/MenuListHome'
import MenuListDetail from "../pages/MenuList/MenuListDetail"
import MenuListAddUpdate from "../pages/MenuList/MenuListAddUpdate"
import MenuCategory from "../pages/MenuCategory"
import MenuWarning from "../pages/MenuWarning"
import Storage from "../pages/Storage"
import StorageCategory from "../pages/StorageCategory"
import StorageList from "../pages/StorageList"
import StorageWarning from "../pages/StorageWarning"
import Employees from "../pages/Employees"
import EmployeesList from "../pages/EmployeesList"
import EmployeesRooster from "../pages/EmployeesRooster"
import EmployeesRole from "../pages/EmployeesRole"
import Finance from "../pages/Finance"
import { Navigate } from "react-router-dom"

export default[
    {
        path:'login',
        element: <Login/>
    },
    {
        path:'/layout',
        element: <Layout/>,
        children:[
            {
                index: true,
                element: <Navigate to="/layout/order" replace />,
            },
            {
                path: 'order',
                element: <Order />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/layout/order/home" replace />,
                    },
                    {
                        path: 'home',
                        element: <OrderListHome />
                    },
                    {
                        path: 'sale_rank',
                        element: <OrderListRank />
                    },
                    {
                        path: "*",
                        element: <Navigate to="/layout/order" replace />,
                    }
                ]
            },
            {
                path: 'menu_list',
                element: <MenuList />,
                children:[
                    {
                        index: true,
                        element: <Navigate to="/layout/menu_list/home" replace />,
                    },
                    {
                        path: 'home',
                        element: <MenuListHome />
                    },
                    {
                        path:'detail',
                        element: <MenuListDetail/>
                    },
                    {
                        path: 'add_update',
                        element: <MenuListAddUpdate />
                    },
                    {
                        path: "*",
                        element: <Navigate to="/layout/menu_list" replace />,
                    }
                ]
            },
            {
                path: 'menu_category',
                element: <MenuCategory />
            },
            {
                path: 'menu_warning',
                element: <MenuWarning />
            },
            {
                path: 'storage_list',
                element: <StorageList />
            },
            {
                path: 'storage_category',
                element: <StorageCategory />
            },
            {
                path: 'storage_warning',
                element: <StorageWarning />
            },
            {
                path: 'employees_list',
                element: <EmployeesList />
            },
            {
                path: 'employees_rooster',
                element: <EmployeesRooster />
            }, 
            {
                path: 'employees_role',
                element: <EmployeesRole />
            },
            {
                path: 'finance',
                element: <Finance />
            },
            {
                path: "*",
                element: <Navigate to="/layout" replace />,
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to='/login'/>
    }
]
