import { getUsersApi } from '@/services/axios';
import { dateRangeValidate } from '@/services/helper';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

import UserDetail from './user.detail';

type TSearch = {
  fullName: string,
  email: string,
  createdAt: string,
  createdAtRange: string
}


const TableUser = () => {

  const actionRef = useRef<ActionType>();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [userDetail, setUserDetail] = useState<IUserTable | null>(null);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0
  })

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
            <EditOutlined style={{ color: "orange", cursor: "pointer", marginRight: "15px" }} />
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </>
        )
      },

    }

  ];


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
            }

          }

          // console.log("check params >>", params)
          const res = await getUsersApi(query);
          if (res.data) {
            setMeta(res.data.meta)
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
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            Add new
          </Button>

        ]}
      />
      <UserDetail
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
      />

    </>
  );
};

export default TableUser;