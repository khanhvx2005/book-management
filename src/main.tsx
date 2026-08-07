import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './layout.tsx'
import './styles/global.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AboutPage from 'pages/client/about.tsx';
import BookPage from 'pages/client/book.tsx';
import LoginPage from '@/pages/client/auth/login/login.tsx';
import RegisterPage from '@/pages/client/auth/register/register.tsx';
import HomePage from 'pages/client/home.tsx';
import { App, ConfigProvider } from 'antd';
import { AppProvider } from './components/context/app.context.tsx';
import ProtectedRoute from './components/auth/index.tsx';
import DashBoardPage from './pages/admin/dashboard.tsx';
import ManageUserPage from './pages/admin/manage.user.tsx';
import ManageBookPage from './pages/admin/manage.book.tsx';
import ManageOrderPage from './pages/admin/manage.order.tsx';
import LayoutAdmin from './components/layout/layout.admin.tsx';
import enUS from 'antd/locale/en_US';
import { enUSIntl, ProConfigProvider } from '@ant-design/pro-components';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/book",
        element: <BookPage />
      },
      {
        path: "/checkout",
        element: (<ProtectedRoute><div>Checkout Page</div></ProtectedRoute>)
      },
      {
        path: "/admin",
        element: (<ProtectedRoute><div>Admin Page</div></ProtectedRoute>)
      }
    ]
  },
  {
    path: "admin",
    element: <LayoutAdmin />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element:
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
      },
      {
        path: "user",
        element:
          <ProtectedRoute>
            <ManageUserPage />
          </ProtectedRoute>
        ,
      },
      {
        path: "book",
        element:
          <ProtectedRoute>
            <ManageBookPage />
          </ProtectedRoute>
        ,
      },
      {
        path: "order",
        element:
          <ProtectedRoute>
            <ManageOrderPage />
          </ProtectedRoute>
        ,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
]);
createRoot(document.getElementById('root')!).render(

  <App>
    <AppProvider>
      <ConfigProvider locale={enUS}>
        <ProConfigProvider intl={enUSIntl}>
          <RouterProvider router={router} />
        </ProConfigProvider>
      </ConfigProvider>
    </AppProvider>
  </App>
)
