import React from 'react';
import { Input, Badge, Avatar, Space, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ApiOutlined // Dùng icon gần giống logo React trong ảnh
} from '@ant-design/icons';
import './AppHeader.scss';

const AppHeader: React.FC = () => {
  // Menu cho dropdown tài khoản
  const userMenu: MenuProps = {
    items: [
      { key: 'profile', label: 'Quản lý tài khoản' },
      { key: 'home', label: 'Trang chủ' },
      { key: 'logout', label: 'Đăng xuất', danger: true },
    ],
  };

  return (
    <div className="app-header-container">
      {/* 1. Phần Logo */}
      <div className="header-logo">
        <ApiOutlined className="logo-icon" />
        <span className="logo-text">Hỏi Dân IT</span>
      </div>

      {/* 2. Phần Tìm kiếm */}
      <div className="header-search">
        <Input
          size="large"
          placeholder="Bạn tìm gì hôm nay"
          prefix={<SearchOutlined className="search-icon" />}
          className="search-input"
        />
      </div>

      {/* 3. Phần Actions (Giỏ hàng & User) */}
      <div className="header-actions">
        <Space size="large" align="center">
          {/* Giỏ hàng có Badge số lượng */}
          <Badge count={10} overflowCount={99} className="cart-badge">
            <ShoppingCartOutlined className="cart-icon" />
          </Badge>

          {/* User Profile Dropdown */}
          <Dropdown menu={userMenu} trigger={['click']} placement="bottomRight">
            <div className="user-profile">
              {/* Có thể thay src bằng hình ảnh avatar thật */}
              <Avatar
                icon={<UserOutlined />}
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                className="user-avatar"
              />
              <span className="user-name">I'm Admin</span>
            </div>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default AppHeader;