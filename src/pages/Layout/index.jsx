import { CaretRightOutlined,AppstoreAddOutlined, MoneyCollectOutlined, UnorderedListOutlined, UserOutlined, MenuUnfoldOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState,useEffect } from 'react';
import { useNavigate,Outlet,NavLink } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
//import menuList from '../../config/menuConfig'
import HeaderContent from '../../components/HeaderContent'
import './index.css'
const { Header, Content, Footer, Sider } = Layout;

let keyValue = '';

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const menuItems = [
  getItem('订单', '1', <NavLink to="order"> <UnorderedListOutlined /> </NavLink> ),
  getItem('菜单', 'sub1',  <MenuUnfoldOutlined />,[
    getItem('列表', '2', <NavLink to="menu_list"><CaretRightOutlined /></NavLink>),
    getItem('分类', '3', <NavLink to="menu_category"><CaretRightOutlined /></NavLink >),
    getItem('库存警报', '4', <NavLink to="menu_warning"><CaretRightOutlined /></NavLink >),
  ]),
  getItem('库存', 'sub2', <AppstoreAddOutlined />, [
    getItem('列表', '5', <NavLink to="storage_list"><CaretRightOutlined /></NavLink >),
    getItem('分类', '6', <NavLink to="storage_category"><CaretRightOutlined /></NavLink >),
    getItem('库存警报', '7', <NavLink to="storage_warning"><CaretRightOutlined /></NavLink >),
  ]),
  getItem('人员', 'sub3', <TeamOutlined />, [
    getItem('列表', '8', <NavLink to="employees_list"><CaretRightOutlined /></NavLink >),
    getItem('排班', '9', <NavLink to="employees_rooster"><CaretRightOutlined /></NavLink >),
  ]),
  getItem('用户', '10', <NavLink to="users"><UserOutlined /></NavLink >),
  getItem('财务', '11', <NavLink to="finance"><MoneyCollectOutlined /></NavLink >),
];

export default function LayoutPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    const user = storageUtils.getUser()
    //alert(user)
    if (typeof user === 'object') {
      navigate('/', { replace: true })
    }
  },[])
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (key)=>{
    keyValue=key
  }
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='title'>Miyabi后台管理</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} onClick={(e) => handleMenuClick(e.key)} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <HeaderContent/>
        </Header>
        <Content style={{margin: '0 16px',}}>
          <Breadcrumb style={{margin: '16px 0',}}>
            <Breadcrumb.Item key="sub1">User</Breadcrumb.Item>
            <Breadcrumb.Item key="4">Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
