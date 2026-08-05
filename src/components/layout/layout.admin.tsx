import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  UserOutlined,
  BookOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Space, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { logoutApi } from '@/services/axios';
import { useCurrentApp } from '../context/app.context';

const { Header, Sider, Content } = Layout;



type MenuItem = Required<MenuProps>['items'][number];



// Cấu hình các mục trong Menu (Dựa theo image_bddfbf.png)
const menuItems: MenuItem[] = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: 'dashboard',
    icon: <AppstoreOutlined />
  },
  {
    label: <span>Manage Users</span>,
    key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">CRUD</Link>,
        key: 'crud',
        icon: <TeamOutlined />
      },
    ]
  }

];

const LayoutAdmin = () => {
  const { user, setUser, setIsAuthenticated, isAuthenticated } = useCurrentApp();
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Menu dropdown cho phần User ở Header
  const userMenuProps: MenuProps = {
    items: [
      { key: 'account', label: <label style={{ cursor: "pointer" }} onClick={() => alert("me")}>Quản lý tài khoản</label> },
      { key: 'home', label: <Link to="/">Trang chủ</Link> },

      { key: 'logout', label: <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>Đăng xuất</label>, danger: true },

    ],
  };

  const handleLogout = async () => {
    const res = await logoutApi();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
    }
  }
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
  if (isAuthenticated === false) {
    return (
      <Outlet />
    )
  }
  const isAdminRoute = location.pathname.includes("admin");
  if (isAdminRoute && isAuthenticated) {
    const role = user?.role;
    if (role === "USER") {
      return (
        <>
          <Outlet />
        </>
      )
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ borderRight: '1px solid #f0f0f0' }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          {collapsed ? 'A' : 'Admin'}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>

      {/* MAIN LAYOUT */}
      <Layout>
        {/* HEADER */}
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <Dropdown menu={userMenuProps} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer', color: 'inherit' }}>
              <Space>
                <Avatar src={urlAvatar} />
                <span style={{ fontWeight: 500 }}>{user?.fullName}</span>
              </Space>
            </a>
          </Dropdown>
        </Header>

        {/* CONTENT */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;