import { updateUserApi } from "@/services/axios";
import { App, Button, Form, Input, Modal } from "antd";
import type { FormProps } from 'antd';
import { useEffect } from "react";

interface IProps {
  setIsModalOpenUpdate: (v: boolean) => void;
  isModalOpenUpdate: boolean;
  dataModalUpdate: IUserTable | null;
  setDataModalUpdate: (v: IUserTable | null) => void;
  refreshTable: () => void;
}
type FieldType = {
  id: string,
  email: string;
  fullName: string;
  phone: string;
};




const UpdateUser = (props: IProps) => {
  const { message, notification } = App.useApp();

  const { isModalOpenUpdate, setIsModalOpenUpdate, dataModalUpdate, setDataModalUpdate, refreshTable } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (dataModalUpdate) {
      form.setFieldsValue({
        id: dataModalUpdate?._id,
        fullName: dataModalUpdate?.fullName,
        email: dataModalUpdate?.email,
        phone: dataModalUpdate?.phone
      });
    }

  }, [dataModalUpdate])

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { id, fullName, phone } = values;
    const dataForm = form.getFieldsValue();
    const res = await updateUserApi(id, fullName, phone);
    if (res.data) {
      message.success("Cập nhập user thành công!");
      setIsModalOpenUpdate(false);
      refreshTable();
      form.resetFields();
      setDataModalUpdate(null);
    } else {
      notification.error({
        message: "Có lỗi xảy ra !",
        description: res.message
      })
    }
  };


  return (
    <>
      <Modal
        title="Cập nhập người dùng"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpenUpdate}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalOpenUpdate(false)
          setDataModalUpdate(null)
          form.resetFields()

        }}
        okText={"Cập nhập"}
        maskClosable={false}
      >
        <Form
          layout="vertical"
          name="form-update-user"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >

          <Form.Item<FieldType>
            hidden
            label="id"
            name="id"
            rules={[
              { required: true, message: 'Vui lòng nhập id' },

            ]}
          >
            <Input disabled value={"abc@gmail.com"} />
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
            <Input disabled value={"abc@gmail.com"} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input />
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
export default UpdateUser;