import { FORMATE_DATE } from "@/services/helper";
import { Avatar, Badge, Descriptions, Drawer } from "antd";
import type { DescriptionsProps } from "antd/lib";
import moment from "moment";
interface IProps {
  isOpenDrawer: boolean,
  setIsOpenDrawer: (v: boolean) => void;
  setUserDetail: (v: IUserTable | null) => void;
  userDetail: IUserTable | null;
}

const UserDetail = (props: IProps) => {
  const { isOpenDrawer, setIsOpenDrawer, userDetail, setUserDetail } = props;
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userDetail?.avatar}`

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Id',
      children: userDetail?._id,
      span: 2
    },
    {
      key: '2',
      label: 'Tên hiển thị',
      children: userDetail?.fullName,
      span: 1

    },
    {
      key: '3',
      label: 'Email',
      children: userDetail?.email,
      span: 2
    },
    {
      key: '4',
      label: 'Số điện thoại',
      children: userDetail?.phone,
      span: 1
    },

    {
      key: '5',
      label: 'Role',
      children: <Badge status="processing" text={userDetail?.role} />,
      span: 2,
    },
    {
      key: '6',
      label: 'Avatar',
      children: <Avatar src={urlAvatar} />,
      span: 1,
    },
    {
      key: '7',
      label: 'CreatedAt',
      children: <>{moment(userDetail?.createdAt).format(FORMATE_DATE)}</>,
      span: 2,
    },
    {
      key: '8',
      label: 'UpdatedAt',
      children: <>{moment(userDetail?.updatedAt).format(FORMATE_DATE)}</>,
    },

  ];
  return (
    <>
      <Drawer
        title="Chi tiết người dùng"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => {
          setUserDetail(null)
          setIsOpenDrawer(false)
        }}
        open={isOpenDrawer}
        width={"60vw"}
      >
        <Descriptions title="User Info" bordered items={items} />
      </Drawer></>
  )
}
export default UserDetail;