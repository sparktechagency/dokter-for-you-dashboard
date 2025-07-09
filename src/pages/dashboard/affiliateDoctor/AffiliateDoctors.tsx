import React, { useState } from 'react';
import { Button, Table, Modal, Form, Input, Upload, message, Switch, ConfigProvider, Spin } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import {
  useAddAffiliatedDoctorMutation,
  useDeleteAffiliatedDoctorMutation,
  useGetAffiliatedDoctorQuery,
  useUpdateAffiliatedDoctorMutation,
  useUpdateStatusMutation,
} from '../../../redux/apiSlices/doctorSlice';
import moment from 'moment';
import toast from 'react-hot-toast';

const AffiliateDoctors: React.FC = () => {
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<any | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const { data: affiliatedDoctors, isLoading } = useGetAffiliatedDoctorQuery(undefined);

  const [addAffiliatedDoctor] = useAddAffiliatedDoctorMutation();
  const [updateAffiliatedDoctor] = useUpdateAffiliatedDoctorMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [deleteAffiliatedDoctor] = useDeleteAffiliatedDoctorMutation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );

  const affiliatedDoctorsData = affiliatedDoctors?.data;
  console.log(affiliatedDoctorsData);

  const showAddModal = () => {
    setCurrentDoctor(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const showEditModal = (doctor: any) => {
    setCurrentDoctor(doctor);
    form.setFieldsValue({
      name: doctor.name,
      specialization: doctor.specialization,
      image: doctor.image,
    });

    // Only set fileList if there's an existing image
    setFileList(
      doctor.image
        ? [
          {
            uid: '-1',
            name: 'doctor-image.png',
            status: 'done',
            url: doctor.image.startsWith('http') ? doctor.image : `${import.meta.env.VITE_BASE_URL}${doctor.image}`,
          },
        ]
        : [],
    );

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('specialization', values.specialization);

      // Only append image if it's a new file (for both add and edit)
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      let response;
      if (currentDoctor) {
        // Edit existing doctor
        response = await updateAffiliatedDoctor({
          id: currentDoctor._id,
          data: formData,
        }).unwrap();
      } else {
        // Add new doctor
        response = await addAffiliatedDoctor({ data: formData }).unwrap();
      }

      if (response?.success) {
        toast.success(
          response?.message || (currentDoctor ? 'Doctor updated successfully' : 'Doctor added successfully'),
        );
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
      } else {
        toast.error(response?.message || (currentDoctor ? 'Failed to update doctor' : 'Failed to add doctor'));
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(
        error?.data?.message ||
        error.message ||
        (currentDoctor ? 'An error occurred while updating doctor' : 'An error occurred while adding doctor'),
      );
    }
  };
  const toggleStatus = async (id: string, value: boolean) => {
    const data = {
      active: value,
    };

    try {
      const response = await updateStatus({ id, data }).unwrap();
      if (response?.success) {
        toast.success(response?.message || 'Doctor status updated successfully');
      } else {
        toast.error(response?.message || 'Failed to update doctor status');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'An error occurred while updating status');
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Do you want to delete this doctor?',
      content: 'This action is irreversible!',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await deleteAffiliatedDoctor(id).unwrap();
          if (response?.success) {
            toast.success(response?.message || 'Doctor deleted successfully');
          } else {
            toast.error(response?.message || 'Failed to delete doctor');
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
    setFileList(fileList);
  };

  const columns = [
    {
      title: 'Serial',
      dataIndex: 'serial',
      key: 'serial',
      render: (_: any, index: number) => index + 1,
    },
    {
      title: 'Doctor',
      dataIndex: 'image',
      key: 'image',
      render: (image: string, record: any) => (
        <div className="flex items-center gap-3">
          <img
            src={image?.startsWith('http') ? image : `${import.meta.env.VITE_BASE_URL}${image}`}
            alt={record.name}
            className="w-14 h-14 object-cover rounded-s-lg"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Doctor Since',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => <span>{moment(createdAt).format('DD-MM-YYYY')}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (status: boolean, record: any) => (
        <div className="flex items-center gap-3">
          <ConfigProvider
            theme={{
              components: {
                Switch: {
                  colorPrimary: '#08a05b',
                  colorPrimaryHover: '#40a9ff',
                },
              },
            }}
          >
            <Switch checked={status} onChange={() => toggleStatus(record._id, !status)} size="small" />
          </ConfigProvider>
          <span className="text-sm">{status ? 'Active' : 'Inactive'}</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => showEditModal(record)}>
            <FaEdit className="h-6 w-6" />
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record?._id)}>
            <FaTrash className="h-6 w-6" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Affiliate Doctors</h1>
        <Button type="primary" icon={<PlusOutlined />} size="middle" onClick={showAddModal}>
          Add Doctor
        </Button>
      </div>

      <Table columns={columns} dataSource={affiliatedDoctorsData} rowKey="_id" pagination={{ pageSize: 10 }} />

      <Modal
        title={currentDoctor ? 'Edit Doctor' : 'Add New Doctor'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={currentDoctor ? 'Update' : 'Add'}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Doctor Name" rules={[{ required: true, message: 'Please input doctor name!' }]}>
            <Input placeholder="Enter doctor name" />
          </Form.Item>

          <Form.Item
            name="specialization"
            label="Title/Specialization"
            rules={[{ required: true, message: 'Please input doctor title!' }]}
          >
            <Input placeholder="Enter doctor title/specialization" />
          </Form.Item>

          <Form.Item label="Profile Image">
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AffiliateDoctors;
