import Layout from "../pages/Layout"
import Login from "../pages/Login"
import Order from "../pages/Order"
import Menus from "../pages/Menus"
import MenuCategory from "../pages/MenuCategory"
import MenuList from "../pages/MenuList"
import MenuWarning from "../pages/MenuWarning"
import Storage from "../pages/Storage"
import StorageCategory from "../pages/StorageCategory"
import StorageList from "../pages/StorageList"
import StorageWarning from "../pages/StorageWarning"
import Employees from "../pages/Employees"
import EmployeesList from "../pages/EmployeesList"
import EmployeesRooster from "../pages/EmployeesRooster"
import Users from "../pages/Users"
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
                path: 'order',
                element: <Order />,
            },
            {
                path: 'menu_list',
                element: <MenuList />
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
                path: 'users',
                element: <Users/>
            },
            {
                path: 'finance',
                element: <Finance />
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to='/login'/>
    }
]
