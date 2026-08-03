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
import { App } from 'antd';

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
      }, {
        path: "/book",
        element: <BookPage />
      }
    ]
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
  <StrictMode>
    {/* <App /> */}
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>,
)
