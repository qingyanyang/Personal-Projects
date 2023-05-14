import { CaretRightOutlined, AppstoreAddOutlined, MoneyCollectOutlined, UnorderedListOutlined, UserOutlined, MenuUnfoldOutlined, TeamOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const menuList = [
    {
        label:"订单",
        key: "/order",
        icon: <NavLink to="order"><UnorderedListOutlined /></NavLink>
    },
    {
        label: "菜单",
        key: "/menu",
        icon: <MenuUnfoldOutlined />,
        children: [
            {
                label: "列表",
                key: "/menu_list",
                icon: <NavLink to="menu_list"><CaretRightOutlined /></NavLink>
            },
            {
                label: "分类",
                key: "/menu_category",
                icon: <NavLink to="menu_category"><CaretRightOutlined /></NavLink >
            }
        ]
    },
    {
        label: "库存",
        key: "/storage",
        icon: <AppstoreAddOutlined />,
        children: [
            {
                label: "列表",
                key: "/storage_list",
                icon: <NavLink to="storage_list"><CaretRightOutlined /></NavLink >
            },
            {
                label: "分类",
                key: "/storage_category",
                icon: <NavLink to="storage_category"><CaretRightOutlined /></NavLink >
            }
        ]
    },
    {
        label: "人员",
        key: "/employees",
        icon: <TeamOutlined />,
        children: [
            {
                label: "列表",
                key: "/employees_list",
                icon: <NavLink to="employees_list"><CaretRightOutlined /></NavLink >
            },
            {
                label: "打卡记录",
                key: "/employees_time_records",
                icon: <NavLink to="employees_time_records"><CaretRightOutlined /></NavLink >
            },
            {
                label: "角色管理",
                key: "/employees_role",
                icon: <NavLink to="employees_role"><CaretRightOutlined /></NavLink >,
            },
        ]
    },
    {
        label: "财务",
        key: "/finance",
        icon: <NavLink to="finance"><MoneyCollectOutlined /></NavLink >,
    }
]
export default menuList
