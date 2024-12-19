import { ConfigProvider, Tabs } from 'antd';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';


const AdminProfile = () => {

  const items = [
    {
      key: "1",
      label: "Edit Profile",
      children: <UserProfile />,
    },
    {
      key: "2",
      label: "Change Password ",
      children: <ChangePassword />,
    },
  ];

  return (
    <div> 
        <h1 className="text-2xl font-semibold text-title mb-4">Profile</h1>
      <div

        className=" bg-white p-5 px-10 rounded-xl "
      >
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemActiveColor: "#007BA5",
                itemSelectedColor: "#007BA5",
                inkBarColor: "#007BA5",
                itemHoverColor: "#007BA5"
              },
            },
          }}
        >

          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      </div>

    </div>
  );
};

export default AdminProfile;