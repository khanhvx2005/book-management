import { FORMATE_DATE } from "@/services/helper";
import { Badge, Descriptions, Drawer } from "antd";
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
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Id',
      children: userDetail?._id,
    },
    {
      key: '2',
      label: 'Tên hiển thị',
      children: userDetail?.fullName,
    },
    {
      key: '3',
      label: 'Eamil',
      children: userDetail?.email,
    },
    {
      key: '4',
      label: 'Số điện thoại',
      children: userDetail?.phone,
    },

    {
      key: '5',
      label: 'Role',
      children: <Badge status="processing" text={userDetail?.role} />,
      span: 3,
    },
    {
      key: '6',
      label: 'CreatedAt',
      children: <>{moment(userDetail?.createdAt).format(FORMATE_DATE)}</>,
    },
    {
      key: '7',
      label: 'UpdatedAt',
      children: <>{moment(userDetail?.updatedAt).format(FORMATE_DATE)}</>,
    },

  ];
  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setIsOpenDrawer(false)}
        open={isOpenDrawer}
        width={"60vw"}
      >
        <Descriptions title="User Info" bordered items={items} />
      </Drawer></>
  )
}
export default UserDetail;