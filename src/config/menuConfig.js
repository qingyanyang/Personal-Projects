import { CaretRightOutlined, AppstoreAddOutlined, MoneyCollectOutlined, UnorderedListOutlined, UserOutlined, MenuUnfoldOutlined, TeamOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const menuList = [
    {
        label:"订单",
        key:"order",
        icon: <NavLink to="order"><UnorderedListOutlined /></NavLink>
    },
    {
        label: "菜单",
        key: "menu",
        icon: <MenuUnfoldOutlined />,
        children: [
            {
                label: "列表",
                key: "menu_list",
                icon: <NavLink to="menu_list"><CaretRightOutlined /></NavLink>
            },
            {
                label: "分类",
                key: "menu_category",
                icon: <NavLink to="menu_category"><CaretRightOutlined /></NavLink >
            },
            {
                label: "库存警报",
                key: "menu_warning",
                icon: <NavLink to="menu_warning"><CaretRightOutlined /></NavLink >
            }
        ]
    },
    {
        label: "库存",
        key: "storage",
        icon: <AppstoreAddOutlined />,
        children: [
            {
                label: "列表",
                key: "storage_list",
                icon: <NavLink to="storage_list"><CaretRightOutlined /></NavLink >
            },
            {
                label: "分类",
                key: "storage_category",
                icon: <NavLink to="storage_category"><CaretRightOutlined /></NavLink >
            },
            {
                label: "库存警报",
                key: "storage_warning",
                icon: <NavLink to="storage_warning"><CaretRightOutlined /></NavLink >
            }
        ]
    },
    {
        label: "人员",
        key: "employees",
        icon: <TeamOutlined />,
        children: [
            {
                label: "列表",
                key: "employees_list",
                icon: <NavLink to="employees_list"><CaretRightOutlined /></NavLink >
            },
            {
                label: "排班",
                key: "employees_rooster",
                icon: <NavLink to="employees_rooster"><CaretRightOutlined /></NavLink >
            }
        ]
    },
    {
        label: "用户",
        key: "users",
        icon: <NavLink to="users"><UserOutlined /></NavLink >,
    },
    {
        label: "财务",
        key: "finance",
        icon: <NavLink to="finance"><MoneyCollectOutlined /></NavLink >,
    }
]
export default menuList
