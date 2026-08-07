import { InboxOutlined } from "@ant-design/icons";
import { Divider, Modal, notification, Space, Table, Tag } from "antd";
import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import type { TableProps } from 'antd';
import { useState } from "react";
import ExcelJS from "exceljs";
import { bulkCreateUserApi } from "@/services/axios";

interface IProps {
  isModalOpenImport: boolean,
  setIsModalOpenImport: (v: boolean) => void;
  refreshTable: () => void;
}

interface DataType {
  fullName: string;
  email: string;
  phone: string;
}

const ImportUser = (props: IProps) => {
  const { isModalOpenImport, setIsModalOpenImport, refreshTable } = props;
  const [dataImport, setDataImport] = useState<DataType[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const handleReadExcel = async (file: File) => {
    const workbook = new ExcelJS.Workbook();

    const buffer = await file.arrayBuffer();

    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) return;

    let result: DataType[] = [];

    worksheet.eachRow((row, rowNumber) => {
      // bỏ dòng header
      if (rowNumber === 1) return;

      result.push({
        fullName: String(row.getCell(1).value ?? ""),
        email: String(row.getCell(2).value ?? ""),
        phone: String(row.getCell(3).value ?? ""),
      });
    });
    result = result.map((item, index) => {
      return {
        ...item, id: index + 1
      }
    })
    setDataImport(result);
  };
  const { Dragger } = Upload;

  const upload: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    customRequest({ file, onSuccess }) {
      setTimeout(() => {
        if (onSuccess) onSuccess("ok");
      }, 1000)
    },
    onChange: async (info) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      const file = info.file.originFileObj;

      if (file) {
        await handleReadExcel(file);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên hiển thị',
      dataIndex: 'fullName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
  ];

  const handleImport = async () => {
    setIsSubmit(true);
    const dataSubmit = dataImport.map((item) => ({
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      password: import.meta.env.VITE_USER_CREATE_DEFAULT_PASSWORD
    }))
    const res = await bulkCreateUserApi(dataSubmit);
    if (res.data) {
      notification.success({
        message: "Bulk Create Users",
        description: `Success = ${res.data.countSuccess}. Error = ${res.data.countError} `
      })
    }
    setIsSubmit(false);
    setDataImport([]);
    setIsModalOpenImport(false);
    refreshTable();
  }
  return (
    <>
      <Modal
        title="Import user"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpenImport}
        onOk={() => handleImport()}
        onCancel={() => {
          setDataImport([])
          setIsModalOpenImport(false)
        }}
        okText={"Import"}

        okButtonProps={{
          disabled: dataImport.length > 0 ? false : true,
          loading: isSubmit
        }}
        maskClosable={false}

      >
        <Dragger {...upload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>


        </Dragger>
        <Divider />
        <p style={{ textAlign: "left" }}>Dữ liệu user</p>
        <Table<DataType> rowKey={"id"} columns={columns} dataSource={dataImport} />
      </Modal>
    </>
  )
}
export default ImportUser;