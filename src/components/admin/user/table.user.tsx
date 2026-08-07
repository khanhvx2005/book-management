import { deleteUserApi, getUsersApi } from '@/services/axios';
import { dateRangeValidate } from '@/services/helper';
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

import UserDetail from './user.detail';
import ModalUser from './create.user';
import ImportUser from './data/import.user';
import { CSVLink } from "react-csv";
import UpdateUser from './update.user';
import type { PopconfirmProps } from 'antd';

type TSearch = {
  fullName: string,
  email: string,
  createdAt: string,
  createdAtRange: string
}



const cancel: PopconfirmProps['onCancel'] = (e) => {
};
const TableUser = () => {

  const actionRef = useRef<ActionType>();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<IUserTable | null>(null);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0
  })
  const [isModalOpenCreate, setIsModalOpenCreate] = useState<boolean>(false);
  const [isModalOpenImport, setIsModalOpenImport] = useState(false);
  const [currentDataTable, setCurrentDataTable] = useState<IUserTable[]>([]);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState<boolean>(false);
  const [dataModalUpdate, setDataModalUpdate] = useState<IUserTable | null>(null);
  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);
  const { message, notification } = App.useApp();
  const columns: ProColumns<IUserTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: '_id',
      search: false,

      render(dom, entity, index, action, schema) {
        return (
          <a href="#" onClick={() => {
            setUserDetail(entity)
            setIsOpenDrawer(true)
          }}>{entity._id}</a>
        )
      },
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      copyable: true
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      valueType: "date",
      sorter: true,
      hideInSearch: true
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAtRange',
      valueType: "dateRange",
      hideInTable: true
    },
    {
      title: 'Action',
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <>
            <EditOutlined
              style={{ color: "orange", cursor: "pointer", marginRight: "15px" }}
              onClick={() => {
                setIsModalOpenUpdate(true)
                setDataModalUpdate(entity)
              }}

            />
            <Popconfirm
              placement="left"
              title="Xóa người dùng"
              description="Bạn có chắc chắn muốn xóa người dùng?"
              onConfirm={() => handleConfirm(entity._id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                loading: isDeleteUser
              }}
            >
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>

          </>
        )
      },

    }

  ];
  const refreshTable = () => {
    actionRef.current.reload();
  }
  const handleConfirm = async (id: string) => {
    setIsDeleteUser(true);
    const res = await deleteUserApi(id);
    if (res.data) {
      message.success('Xóa người dùng thành công!');
      refreshTable();
    } else {
      notification.error({
        message: "Có lỗi xảy ra!",
        description: res.message
      })
    }
    setIsDeleteUser(false);
  }
  // request trong Protable không chạy lại mỗi khi component Table re-render // Hoạt động giống hàm useEffect(() , [gia-tri])
  return (
    <>
      <ProTable<IUserTable, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {


          let query = '';
          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;
            if (params.fullName) {
              query += `&fullName=/${params.fullName}/i`;
            }
            if (params.email) {
              query += `&email=/${params.email}/i`;

            }
            const createdAtRange = dateRangeValidate(params.createdAtRange);

            if (createdAtRange) {

              query += `&createdAt>=${createdAtRange[0]}&createdAt<=${createdAtRange[1]}`;

            }

            if (sort && sort.createdAt) {
              query += `&sort=${sort.createdAt === "ascend" ? "createdAt" : "-createdAt"}`;
            } else {
              query += `&sort=-createdAt`;
            }

          }

          // console.log("check params >>", params)
          const res = await getUsersApi(query);
          if (res.data) {
            setMeta(res.data.meta)
            setCurrentDataTable(res.data.result);
          }
          return {
            // data: data.data,
            data: res.data?.result,
            page: 1,
            success: true,
            total: res.data?.meta.total
          }

        }}
        rowKey="_id"
        pagination={{
          showSizeChanger: true,
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên {total} rows</div>) },
        }}
        headerTitle="Table user"
        toolBarRender={() => [
          <>
            <CSVLink filename={'user-table.csv'} data={currentDataTable}><Button type='primary' icon={<ExportOutlined />}>Export</Button></CSVLink>



            <Button onClick={() => setIsModalOpenImport(true)} type='primary' icon={<UploadOutlined />}>Import</Button>

            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsModalOpenCreate(true)
              }}
              type="primary"
            >
              Add new
            </Button>
          </>

        ]}
      />
      <UserDetail
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
      />
      <ModalUser
        isModalOpenCreate={isModalOpenCreate}
        setIsModalOpenCreate={setIsModalOpenCreate}
        refreshTable={refreshTable}
      />
      <ImportUser
        isModalOpenImport={isModalOpenImport}
        setIsModalOpenImport={setIsModalOpenImport}
        refreshTable={refreshTable}
      />
      <UpdateUser
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        dataModalUpdate={dataModalUpdate}
        setDataModalUpdate={setDataModalUpdate}
        refreshTable={refreshTable}
      />
    </>
  );
};

export default TableUser;