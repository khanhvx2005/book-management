import type { FormProps } from 'antd';
import { App, Button, Form, Input } from 'antd';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router";
import './login.scss'
import { loginUserApi } from '@/services/axios';
import { useCurrentApp } from '@/components/context/app.context';
const LoginPage = () => {
  const { message, notification } = App.useApp();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean>(false);
  const { setUser, setIsAuthenticated } = useCurrentApp();
  type FieldType = {
    email: string;
    password: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoadings(true)
    const { email, password } = values;
    const res = await loginUserApi(email, password);
    if (res.data) {
      setIsAuthenticated(true);
      message.success("Đăng nhập thành công!")
      localStorage.setItem("access_token", res.data.access_token)
      navigate("/")
    } else {
      notification.error({
        title: "Error Login",
        description: res.message && Array.isArray(res.message) ? res.message[0] : res.message
      })
    }
    setLoadings(false)
  };


  return (
    <>
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__wrap">
            <div className='login-page__head'>
              <h2 className="login-page__title">Đăng Nhập</h2>
              <Divider />
            </div>
            <Form
              name="form-login"
              onFinish={onFinish}
              layout={"vertical"}

            >
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  {
                    type: "email",
                    message: "Vui lòng nhập đúng định dạng email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}

              >
                <Input.Password />

              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={loadings}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <Divider>Or</Divider>
            <p className='login-page__footer'>Chưa có tài khoản ? <Link to="/register">Đăng ký</Link></p>

          </div>
        </div>
      </div>
    </>
  )
}
export default LoginPage;