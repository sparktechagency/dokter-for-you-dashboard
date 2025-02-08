import { Table, Button, Tooltip, Popconfirm, Select } from 'antd';
import { useState } from 'react';
import { BsEye, BsPlusLg, BsTrash } from 'react-icons/bs';
import AdminDetailsModal from '../../components/ui/AdminDetailsModal';
import AddAdminDetails from '../../components/ui/AddAdminDetails';
import { useDeleteAdminMutation, useGetAllAdminQuery } from '../../redux/apiSlices/userSlice';
import toast from 'react-hot-toast';

const AdminDetails: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewShippingProfile, setViewShippingProfile] = useState<any>(null);

  const { data: adminData, isFetching } = useGetAllAdminQuery(undefined);
  const [deleteAdmin] = useDeleteAdminMutation();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  const adminDetails = adminData?.data || [];
  // console.log(adminDetails);

  const handleAdminDelete = async (id: string) => {
    try {
      const response = await deleteAdmin(id).unwrap();
      if (response?.success) {
        toast.success('Admin deleted successfully!');
      } else {
        toast.error('Failed to delete admin.');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'User Name ',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_: any, record: any) => `${record?.firstName} ${record?.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Admin Type',
      dataIndex: 'role',
      key: 'role',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Tooltip title="View">
            <Button
              onClick={() => {
                setViewShippingProfile(record);
                setOpenViewModal(true);
              }}
              type="text"
              icon={<BsEye size={20} className="text-blue-600" />}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Shipping Setting"
              description="Are you sure to delete this shipping setting?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleAdminDelete(record._id)}
            >
              <Button type="text" icon={<BsTrash size={18} className="text-red-500" />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-details">
      <div className="doctors-details">
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-title">Admin Details</h1>
            </div>
            <div className="mb-4 flex items-center justify-end gap-4">
              <Select
                placeholder="Action"
                style={{ width: 200 }}
                options={[
                  { value: 'all', label: 'All Pharmacies' },
                  { value: 'pharmacy1', label: 'Pharmacy 1' },
                  { value: 'pharmacy2', label: 'Pharmacy 2' },
                  { value: 'pharmacy3', label: 'Pharmacy 3' },
                ]}
              />

              <Button
                icon={<BsPlusLg size={18} color="#fffff" />}
                style={{
                  height: 42,
                }}
                type="primary"
                onClick={() => setOpenModal(true)}
              >
                Add Admin
              </Button>
            </div>
          </div>

          <div>
            <Table columns={columns} rowKey="_id" dataSource={adminDetails} pagination={{ pageSize: 5 }} />
          </div>
        </div>
        <AdminDetailsModal open={openViewModal} setOpen={setOpenViewModal} viewShippingProfile={viewShippingProfile} />
        <AddAdminDetails open={openModal} setOpen={setOpenModal} />
      </div>
    </div>
  );
};

export default AdminDetails;
