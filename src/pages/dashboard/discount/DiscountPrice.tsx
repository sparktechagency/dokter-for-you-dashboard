import { Table, Button, Tooltip, Popconfirm, Input, Form, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import Modal from '../../../components/shared/Modal';
import dayjs from 'dayjs';
import {
  useCreateDiscountMutation,
  useDeleteDiscountMutation,
  useGetDiscountQuery,
  useUpdateDiscountMutation,
} from '../../../redux/apiSlices/shippingAndDiscountSlice';
import toast from 'react-hot-toast';

const { RangePicker } = DatePicker;

const DiscountPrice = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [discountData, setDiscountData] = useState<any>(null);

  const { data: discountDetails, isFetching } = useGetDiscountQuery(undefined);
  const [createDiscount] = useCreateDiscountMutation();
  const [updateDiscount] = useUpdateDiscountMutation();
  const [deleteDiscount] = useDeleteDiscountMutation();

  useEffect(() => {
    if (discountData) {
      form.setFieldsValue({
        name: discountData.name,
        country: discountData.country,
        dateRange: [dayjs(discountData.startDate), dayjs(discountData.endDate)],
        amount: discountData.amount,
      });
    } else {
      form.resetFields();
    }
  }, [discountData, form]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  const discountDataList = discountDetails?.data || [];
  // console.log(discountDataList);

  const handleModalClose = () => {
    setOpenModal(false);
    setDiscountData(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Discount Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Discount Country',
      dataIndex: 'country',
      key: 'country',
      render: (code: string) => <span className="font-mono">{code}</span>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Amount (%)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount}%`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setDiscountData(record);
                setOpenModal(true);
              }}
              type="text"
              icon={<CiEdit size={20} className="text-blue-600" />}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Discount"
              description="Are you sure to delete this discount?"
              okText="Yes"
              onConfirm={() => handleDelete(record._id)}
              cancelText="No"
            >
              <Button type="text" icon={<BsTrash size={18} className="text-red-500" />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteDiscount(id).unwrap();
      if (response?.success) {
        toast.success('Discount deleted successfully!');
      } else {
        toast.error('Failed to delete discount!');
      }
    } catch (error) {
      toast.error('Failed to delete discount!');
    }
  };

  const onFinish = async (values: any) => {
    const { dateRange, amount, ...rest } = values;

    const formattedValues = {
      ...rest,
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      amount: Number(amount),
    };

    try {
      if (discountData) {
        const response = await updateDiscount({ data: formattedValues, id: discountData._id }).unwrap();
        if (response?.success) {
          toast.success('Discount updated successfully!');
          handleModalClose();
        } else {
          toast.error('Failed to update discount!');
        }
      } else {
        const response = await createDiscount(formattedValues).unwrap();
        if (response?.success) {
          toast.success('Discount added successfully!');
          handleModalClose();
        } else {
          toast.error('Failed to add discount!');
        }
      }
    } catch (error) {
      toast.error('Failed to add discount!');
    } finally {
      handleModalClose();
    }
  };

  const discountForm = (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
      <Form.Item label="Discount Name" name="name" rules={[{ required: true, message: 'Please enter discount name' }]}>
        <Input placeholder="Enter Discount Name" />
      </Form.Item>

      <Form.Item
        label="Discount Country"
        name="country"
        rules={[{ required: true, message: 'Please enter discount code' }]}
      >
        <Input placeholder="Enter Discount Code" className="font-mono" />
      </Form.Item>

      <Form.Item label="Date Range" name="dateRange" rules={[{ required: true, message: 'Please select date range' }]}>
        <RangePicker style={{ width: '100%' }} format="DD MMM YYYY" />
      </Form.Item>

      <Form.Item
        label="Discount Amount (%)"
        name="amount"
        rules={[{ required: true, message: 'Please enter discount amount' }]}
      >
        <Input type="number" min={0} max={100} placeholder="Enter Discount Amount" />
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

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-title">Discount Management</h1>
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <Popconfirm
            title="Are you sure to delete the selected items?"
            onConfirm={() => // console.log('Deleted selected')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" shape="circle" icon={<BsTrash color="red" size={20} />} />
          </Popconfirm>

          <Input
            type="text"
            prefix={<BsSearch className="mx-2" size={20} />}
            placeholder="Search"
            style={{ width: 200 }}
          />

          <Button
            icon={<BsPlusLg size={18} />}
            style={{
              height: 42,
            }}
            type="primary"
            onClick={() => {
              form.resetFields();
              setDiscountData(null);
              setOpenModal(true);
            }}
          >
            Add Discount
          </Button>
        </div>
      </div>

      <div>
        <Table rowKey="_id" columns={columns} dataSource={discountDataList} pagination={{ pageSize: 10 }} />
      </div>

      <Modal
        title={discountData ? 'Update Discount' : 'Add Discount'}
        open={openModal}
        setOpen={handleModalClose}
        body={discountForm}
        width={600}
      />
    </div>
  );
};

export default DiscountPrice;
