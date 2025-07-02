import { Table, Button, Tooltip, Popconfirm, Select, Input, Form, Tag, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { BsEye, BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import Modal from '../../../components/shared/Modal';
import { BiEuro } from 'react-icons/bi';
import toast from 'react-hot-toast';
import {
  useCreateShippingDetailsMutation,
  useDeleteShippingDetailsMutation,
  useGetShippingDetailsQuery,
  useUpdateShippingDetailsMutation,
} from '../../../redux/apiSlices/shippingAndDiscountSlice';
import { useGetPharmacyQuery } from '../../../redux/apiSlices/userSlice';

interface Country {
  label: string;
  value: string;
}

interface ShippingDetail {
  _id: string;
  country: string[];
  cost: number;
}

interface Pharmacy {
  _id: string;
  pharmecyName: string;
}

const countries: Country[] = [
  { label: 'Belgium', value: 'Belgium' },
  { label: 'Denmark', value: 'Denmark' },
  { label: 'Germany', value: 'Germany' },
  { label: 'France', value: 'France' },
  { label: 'Luxembourg', value: 'Luxembourg' },
  { label: 'Netherlands', value: 'Netherlands' },
  { label: 'Austria', value: 'Austria' },
  { label: 'Poland', value: 'Poland' },
  { label: 'Portugal', value: 'Portugal' },
  { label: 'Romania', value: 'Romania' },
  { label: 'Switzerland', value: 'Switzerland' },
  { label: 'Finland', value: 'Finland' },
  { label: 'Sweden', value: 'Sweden' },
  { label: 'Lithuania', value: 'Lithuania' },
  { label: 'Spain', value: 'Spain' },
];

const ShippingSetting = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewShippingProfile, setViewShippingProfile] = useState<ShippingDetail | null>(null);
  const [shippingProfile, setShippingProfile] = useState<ShippingDetail | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: shippingDetails,
    isFetching: isFetchingShippingDetails,
    error: shippingError,
    refetch: refetchShippingDetails,
  } = useGetShippingDetailsQuery(undefined);

  const { data: pharmacy, error: pharmacyError } = useGetPharmacyQuery(undefined);

  const [createShippingDetails, { error: createError }] = useCreateShippingDetailsMutation();
  const [updateShippingDetails, { error: updateError }] = useUpdateShippingDetailsMutation();
  const [deleteShippingDetails, { error: deleteError }] = useDeleteShippingDetailsMutation();

  useEffect(() => {
    if (shippingError) {
      toast.error('Failed to load shipping details. Please try again later.');
      console.error('Shipping details error:', shippingError);
    }
    if (pharmacyError) {
      toast.error('Failed to load pharmacy data. Please try again later.');
      console.error('Pharmacy error:', pharmacyError);
    }
    if (createError) {
      toast.error('Failed to create shipping details. Please try again.');
      console.error('Create error:', createError);
    }
    if (updateError) {
      toast.error('Failed to update shipping details. Please try again.');
      console.error('Update error:', updateError);
    }
    if (deleteError) {
      toast.error('Failed to delete shipping details. Please try again.');
      console.error('Delete error:', deleteError);
    }
  }, [shippingError, pharmacyError, createError, updateError, deleteError]);

  useEffect(() => {
    if (shippingProfile) {
      form.setFieldsValue({
        country: shippingProfile.country,
        cost: shippingProfile.cost,
      });
    } else {
      form.resetFields();
    }
  }, [shippingProfile, form]);

  if (isFetchingShippingDetails) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const shippingData: ShippingDetail[] = shippingDetails?.data || [];
  const pharmacyList: Pharmacy[] = pharmacy?.data || [];

  const filteredShippingData = shippingData.filter((item: ShippingDetail) => {
    const matchesSearch = item?.country?.some((country) => country.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPharmacy = selectedPharmacy ? true : true;
    return matchesSearch && matchesPharmacy;
  });

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await deleteShippingDetails(id).unwrap();
      if (response?.success) {
        toast.success('Shipping details deleted successfully!');
        // refetchShippingDetails();
      } else {
        toast.error(response?.message || 'Failed to delete shipping details!');
      }
    } catch (error) {
      toast.error('An error occurred while deleting shipping details.');
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
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
      title: 'Selected Countries',
      dataIndex: 'country',
      key: 'country',
      render: (countries: string[]) => (
        <div className="flex flex-wrap gap-1">
          {countries?.map((country) => (
            <Tag key={country}>{country}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Shipping Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => `€ ${cost.toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ShippingDetail) => (
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
                setIsEditMode(true);
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
              okButtonProps={{ loading: isDeleting }}
            >
              <Button type="text" icon={<BsTrash size={18} className="text-red-500" />} loading={isDeleting} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    values.shippingCost = Number(values.shippingCost);
    setIsSubmitting(true);

    try {
      if (isEditMode && shippingProfile) {
        const response = await updateShippingDetails({
          data: values,
          id: shippingProfile._id,
        }).unwrap();

        if (response?.success) {
          toast.success('Shipping details updated successfully!');
          setOpenModal(false);
          setShippingProfile(null);
        } else {
          toast.error(response?.message || 'Failed to update shipping details!');
        }
      } else {
        const response = await createShippingDetails(values).unwrap();
        if (response?.success) {
          toast.success('Shipping details created successfully!');
          setOpenModal(false);
          setShippingProfile(null);
        } else {
          toast.error(response?.message || 'Failed to create shipping details!');
        }
      }
    } catch (error: any) {
      const errorMessage = error.data?.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shippingProfileForm = (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
      <Form.Item
        label="Countries"
        name="country"
        rules={[{ required: true, message: 'Please select at least one country' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select Countries"
          options={countries}
          showSearch
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        />
      </Form.Item>

      <Form.Item
        label="Shipping Cost"
        name="cost"
        rules={[
          { required: true, message: 'Please enter shipping cost' },
          {
            validator: (_, value) =>
              value >= 0 ? Promise.resolve() : Promise.reject('Shipping cost cannot be negative'),
          },
        ]}
      >
        <Input type="number" step="0.01" min="0" prefix={<BiEuro />} placeholder="Enter Shipping Cost" />
      </Form.Item>

      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large" loading={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Save Changes'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  const viewShippingProfileModal = (
    <div>
      <div className="text-lg text-gray space-y-8">
        <div>
          <p>Selected Countries:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {viewShippingProfile?.country?.map((country: string) => (
              <Tag key={country}>{country}</Tag>
            ))}
          </div>
        </div>
        <p className="flex gap-4">
          Shipping Price:
          <span className="flex items-center space-x-1">
            <BiEuro size={20} className="text-green-500" />
            <span className="text-secondary">{viewShippingProfile?.cost?.toFixed(2)}</span>
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
            options={pharmacyList.map((pharmacy: Pharmacy) => ({
              value: pharmacy._id,
              label: pharmacy.pharmecyName,
            }))}
          />

          <Button
            icon={<BsPlusLg size={18} />}
            style={{ height: 42 }}
            type="primary"
            onClick={() => {
              setIsEditMode(false);
              setShippingProfile(null);
              setOpenModal(true);
            }}
          >
            Add
          </Button>
        </div>
      </div>

      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredShippingData}
          pagination={{ pageSize: 5 }}
          loading={isFetchingShippingDetails}
        />
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
