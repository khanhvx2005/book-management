import { getUsersApi } from '@/services/axios';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useRef, useState } from 'react';

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
        <a href="#">{entity._id}</a>
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

const TableUser = () => {
  const actionRef = useRef<ActionType>();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0
  })

  // request trong Protable không chạy lại mỗi khi component Table re-render // Hoạt động giống hàm useEffect(() , [gia-tri])
  return (
    <>
      <ProTable<IUserTable>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {

          const res = await getUsersApi(params?.current ?? 1, params?.pageSize ?? 5);
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


    </>
  );
};

export default TableUser;