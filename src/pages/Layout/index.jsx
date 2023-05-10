import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState,useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import HeaderContent from '../../components/HeaderContent';
import './index.css';


const { Header, Content, Footer, Sider } = Layout;

export default function LayoutPage(props) {
  const navigate = useNavigate()
  const user = storageUtils.getUser()
  const { role } = user
  //function to
  const filterMenuList = (menuList, role)=> {
    const filteredMenuList = menuList.filter(menuItem => {
      // Check if the current menu item is in the role array
      const isMenuItemAllowed = role.includes(menuItem.key);

      // If the menu item has children, filter them based on the role array
      if (menuItem.children) {
        menuItem.children = menuItem.children.filter(child => role.includes(child.key));
      }

      return isMenuItemAllowed || (menuItem.children && menuItem.children.length > 0);
    });

    return filteredMenuList;
  }
  const menuItems = filterMenuList(menuList, role)
  console.log('menuItem ',menuItems)
  useEffect(()=>{
    console.log(user)
    if (!user || Object.keys(user).length===0) {
      navigate('/', { replace: true })
    }
  }, [storageUtils.getUser()])

  const location = useLocation();

  const getTitle=()=> {
    const { pathname } = location;
    //console.log('path:',pathname)
    let names = pathname.split('/')

    console.log(names)
    let titles = []
    menuList.forEach(item=>{

      if (item.key.substring(1) === names[2]){
        titles[0] = item.label
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key.substring(1) === names[2])
        if (cItem) {
          titles[0] = item.label
          titles[1] = cItem.label
        }
      }
    })
    console.log('title:',titles)
    return titles
  }
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='title'>Miyabi后台管理</div>
        <Menu theme="dark" defaultSelectedKeys={['order']} mode="inline" items={menuItems} />
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
          
          <Breadcrumb style={{ margin: '8px 0' }}>
            <Breadcrumb.Item key="sub1" >{getTitle()[0]}</Breadcrumb.Item>
            {getTitle()[1] ? <h1 style={{ marginLeft: '-14px', marginRight: '4px' }}>/</h1> : null}
            <Breadcrumb.Item key="4">{getTitle()[1]}</Breadcrumb.Item>    
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
