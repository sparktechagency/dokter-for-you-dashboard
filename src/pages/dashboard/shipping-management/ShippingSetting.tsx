import { Table, Button, Tooltip, Popconfirm, Select, Input, Form } from 'antd';
import { useState, useEffect } from 'react';
import { BsEye, BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import Modal from '../../../components/shared/Modal';
import { BiEuro } from 'react-icons/bi';

import {
  useCreateShippingDetailsMutation,
  useDeleteShippingDetailsMutation,
  useGetShippingDetailsQuery,
  useUpdateShippingDetailsMutation,
} from '../../../redux/apiSlices/shippingAndDiscountSlice';
import toast from 'react-hot-toast';
import { useGetPharmacyQuery } from '../../../redux/apiSlices/userSlice';

const ShippingSetting = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewShippingProfile, setViewShippingProfile] = useState<any>(null);
  const [shippingProfile, setShippingProfile] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | undefined>(undefined);

  const { data: shippingDetails, isFetching } = useGetShippingDetailsQuery(undefined);
  const { data: pharmacy } = useGetPharmacyQuery(undefined);
  const [createShippingDetails] = useCreateShippingDetailsMutation();
  const [updateShippingDetails] = useUpdateShippingDetailsMutation();
  const [deleteShippingDetails] = useDeleteShippingDetailsMutation();

  useEffect(() => {
    if (shippingProfile) {
      form.setFieldsValue({
        pharmacyName: shippingProfile.pharmacyName,
        pharmacyAddress: shippingProfile.pharmacyAddress,
        selectedArea: shippingProfile.selectedArea,
        shippingPrice: shippingProfile.shippingPrice,
      });
    } else {
      form.resetFields();
    }
  }, [shippingProfile, form]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  const shippingData = shippingDetails?.data || [];
  const pharmacyList = pharmacy?.data || [];
  // console.log(shippingData);

  const filteredShippingData = shippingData.filter((item: any) => {
    const matchesSearch = item?.selectedArea.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPharmacy = selectedPharmacy ? item.pharmecy?._id === selectedPharmacy : true;
    return matchesSearch && matchesPharmacy;
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteShippingDetails(id).unwrap();
      if (response?.success) {
        toast.success('Shipping details deleted successfully!');
      } else {
        toast.error('Failed to delete shipping details!');
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
      title: 'Pharmacy Name',
      dataIndex: 'pharmecy',
      key: 'pharmacyName',
      render: (_: any, record: any) => record?.pharmecy?.pharmecyName,
    },
    {
      title: 'Pharmacy Address',
      dataIndex: 'pharmacyAddress',
      key: 'pharmacyAddress',
      render: (_: any, record: any) => record?.pharmecy?.location,
    },
    {
      title: 'Selected Area',
      dataIndex: 'selectedArea',
      key: 'selectedArea',
    },
    {
      title: 'Shipping Price',
      dataIndex: 'shippingPrice',
      key: 'shippingPrice',
      render: (price: number) => `€ ${price.toFixed(2)}`,
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
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setShippingProfile(record);
                setIsEditMode(true); // Enable edit mode
                setOpenModal(true);
              }}
              type="text"
              icon={<CiEdit size={20} className="text-blue-600" />}
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

  const onFinish = async (values: any) => {
    values.shippingPrice = Number(values.shippingPrice);

    try {
      if (isEditMode && shippingProfile) {
        const response = await updateShippingDetails({ data: values, id: shippingProfile._id }).unwrap();
        if (response?.success) {
          toast.success('Shipping details updated successfully!');
          setOpenModal(false);
          setShippingProfile(null);
        }
      } else {
        const response = await createShippingDetails(values).unwrap();
        if (response?.success) {
          toast.success('Shipping details created successfully!');
          setOpenModal(false);
          setShippingProfile(null);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const pharmacyNameInput = (
    <Select placeholder="Select Pharmacy Name">
      {pharmacyList?.map((pharmecy: any) => (
        <Select.Option key={pharmecy._id} value={pharmecy?._id}>
          {pharmecy?.pharmecyName}
        </Select.Option>
      ))}
    </Select>
  );
  const shippingProfileForm = (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
      <Form.Item
        label="Pharmacy Name"
        name="pharmecy"
        rules={[{ required: true, message: 'Please select or enter pharmacy name' }]}
      >
        {pharmacyNameInput}
      </Form.Item>
      <Form.Item
        label="Pharmacy Address"
        name="pharmacyAddress"
        rules={[{ required: true, message: 'Please enter pharmacy address' }]}
      >
        <Input placeholder="Enter Pharmacy Address" />
      </Form.Item>

      <Form.Item
        label="Selected Area"
        name="selectedArea"
        rules={[{ required: true, message: 'Please enter selected area' }]}
      >
        <Input placeholder="Enter Selected Area" />
      </Form.Item>

      <Form.Item
        label="Shipping Price"
        name="shippingPrice"
        rules={[{ required: true, message: 'Please enter shipping price' }]}
      >
        <Input type="number" step="0.01" min="0" prefix="$" placeholder="Enter Shipping Price" />
      </Form.Item>

      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large">
            Save Changes
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  // console.log(viewShippingProfile);
  const viewShippingProfileModal = (
    <div>
      <div className="text-lg text-gray space-y-8">
        <p>Pharmacy Name: {viewShippingProfile?.pharmecy?.pharmecyName}</p>
        <p>Pharmacy Address: {viewShippingProfile?.pharmecy?.location}</p>
        <hr className="my-4" />
        <p>
          Selected Area: <span className="text-red-500">{viewShippingProfile?.selectedArea}</span>
        </p>
        <p className="flex gap-4">
          Shipping Price:
          <span className="flex items-center space-x-1">
            <BiEuro size={20} className="text-green-500" />
            <span className="text-secondary">{viewShippingProfile?.shippingPrice}</span>
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-title">Shipping Management</h1>
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <Input
            type="text"
            prefix={<BsSearch className="mx-2" size={20} />}
            placeholder="Search"
            style={{ width: 200 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            placeholder="Pharmacy"
            style={{ width: 200 }}
            value={selectedPharmacy}
            onChange={(value) => setSelectedPharmacy(value)}
            options={pharmacyList.map((pharmacy: any) => ({
              value: pharmacy._id,
              label: pharmacy.pharmecyName,
            }))}
          />

          <Button
            icon={<BsPlusLg size={18} />}
            style={{ height: 42 }}
            type="primary"
            onClick={() => {
              setIsEditMode(false); // Disable edit mode
              setShippingProfile(null); // Reset form fields
              setOpenModal(true);
            }}
          >
            Add
          </Button>
        </div>
      </div>

      <div>
        <Table rowKey="_id" columns={columns} dataSource={filteredShippingData} pagination={{ pageSize: 5 }} />
      </div>

      <Modal
        title={shippingProfile ? 'Update Shipping Setting' : 'Add Shipping Setting'}
        open={openModal}
        setOpen={setOpenModal}
        body={shippingProfileForm}
        width={600}
      />
      <Modal
        title="View Shipping Setting"
        open={openViewModal}
        setOpen={setOpenViewModal}
        body={viewShippingProfileModal}
        width={600}
      />
    </div>
  );
};

export default ShippingSetting;
