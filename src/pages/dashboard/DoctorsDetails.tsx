import { Table, Button, Tooltip, Popconfirm, Select, Input } from 'antd';
import { useState } from 'react';
import { BsEye, BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import DoctorDetailsModal from '../../components/ui/DoctorDetailsModal';
import AddDoctorDetails from '../../components/ui/AddDoctorDetails';
import { useDeleteDoctorMutation, useGetDoctorQuery } from '../../redux/apiSlices/userSlice';
import toast from 'react-hot-toast';

const DoctorsDetails: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewShippingProfile, setViewShippingProfile] = useState<any>(null);

  const { data: DoctorsData, isFetching } = useGetDoctorQuery(undefined);
  const [deleteDoctor] = useDeleteDoctorMutation();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  const DoctorData = DoctorsData?.data || [];
  // console.log(DoctorData);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteDoctor(id).unwrap();
      if (response?.success) {
        toast.success('Doctor deleted successfully!');
      } else {
        toast.error('Failed to delete doctor.');
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
      title: 'Doctor Name ',
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
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact',
      key: 'contact',
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
              onConfirm={() => handleDelete(record._id)}
            >
              <Button type="text" icon={<BsTrash size={18} className="text-red-500" />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="doctors-details">
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-title">Doctors Details</h1>
          </div>
          <div className="mb-4 flex items-center justify-end gap-4">
            <Input
              type="text"
              prefix={<BsSearch className="mx-2" size={20} />}
              placeholder="Search"
              style={{ width: 320 }}
            />
            <Select
              placeholder="Doctor Type"
              style={{ width: 200 }}
              options={[
                { value: 'all', label: 'All Pharmacies' },
                { value: 'pharmacy1', label: 'Pharmacy 1' },
                { value: 'pharmacy2', label: 'Pharmacy 2' },
                { value: 'pharmacy3', label: 'Pharmacy 3' },
              ]}
            />

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
              Add Doctor
            </Button>
          </div>
        </div>

        <div>
          <Table rowKey="_id" columns={columns} dataSource={DoctorData} pagination={{ pageSize: 10 }} />
        </div>
      </div>
      <DoctorDetailsModal open={openViewModal} setOpen={setOpenViewModal} viewShippingProfile={viewShippingProfile} />
      <AddDoctorDetails open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default DoctorsDetails;
