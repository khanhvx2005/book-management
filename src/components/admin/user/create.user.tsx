import { createUserApi } from "@/services/axios";
import { App, Button, Form, Input, Modal } from "antd";
import type { FormProps } from 'antd';

interface IProps {
  isModalOpen: boolean,
  setIsModalOpen: (v: boolean) => void;
  refreshTable: () => void;
}
type FieldType = {
  fullName: string;
  password: string;
  email: string;
  phone: string
};


const ModalUser = (props: IProps) => {
  const { isModalOpen, setIsModalOpen, refreshTable } = props;
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const res = await createUserApi(values.fullName, values.email, values.password, values.phone);
    if (res.data) {
      message.success('Tạo mới user thành công!');
      setIsModalOpen(false);
      form.resetFields(); // Reset dữ liệu
      refreshTable(); // Load lại danh sách 
    } else {
      notification.error({
        message: "Đã xảy ra lỗi!",
        description: res.message
      })
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Thêm mới user"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        okText={"Thêm mới"}
        maskClosable={false}
      >
        <Form
          layout={"vertical"}
          name="form-create-user"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
            ]}          >
            <Input autoComplete="nope" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}          >
            <Input />
          </Form.Item>




        </Form>
      </Modal>
    </>
  )
}
export default ModalUser;