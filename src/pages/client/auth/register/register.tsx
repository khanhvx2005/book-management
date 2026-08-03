import type { FormProps } from 'antd';
import { App, Button, Form, Input } from 'antd';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import './register.scss'
import { useState } from 'react';
import { registerUserApi } from '@/services/axios';
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean>(false);

  type FieldType = {
    fullName?: string;
    email?: string;
    password?: string;
    phone?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoadings(true)
    const { fullName, email, password, phone } = values;
    const res = await registerUserApi(fullName!, email!, password!, phone!)

    if (res.data) {
      message.success("Đăng ký tài khoản thành công!")
      navigate('/login')
    } else {
      message.error(res.message)

    }
    setLoadings(false)
  };

  // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };
  return (
    <>
      <div className="register-page">
        <div className="register-page__container">
          <div className="register-page__wrap">
            <div className='register-page__head'>
              <h2 className="register-page__title">Đăng Ký Tài Khoản</h2>
              <Divider />
            </div>
            <Form
              name="form-register"
              onFinish={onFinish}
              layout={"vertical"}

            >
              <Form.Item<FieldType>
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input />
              </Form.Item>

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

              <Form.Item<FieldType>
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}

              >
                <Input />

              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={loadings}>
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <Divider>Or</Divider>
            <p className='register-page__footer'>Đã có tài khoản ? <Link to="/login">Đăng nhập</Link></p>

          </div>
        </div>
      </div>
    </>
  )
}
export default RegisterPage;