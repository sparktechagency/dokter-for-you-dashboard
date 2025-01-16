import React, { useState } from 'react';
import { DatePicker, Input, Select, Table, Button, Tooltip, Modal, Form } from 'antd';
import { BsSearch, BsEye } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useGetMedicationTradeQuery } from '../../redux/apiSlices/consultationSlice';
import moment from 'moment';
import { useUpdateConsultationMutation } from '../../redux/apiSlices/patientServiceSlice';
import toast from 'react-hot-toast';

const columns = (onEdit: (record: any) => void) => [
  {
    title: 'S.No',
    dataIndex: 'sNo',
    key: 'sNo',
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Tracking No',
    dataIndex: 'trackingNo',
    key: 'trackingNo',
    render: (_: any, record: any) => <span>{record?.trackingNo ? record?.trackingNo : '.......'}</span>,
  },
  {
    title: 'User Name',
    dataIndex: 'userId',
    key: 'userId',
    render: (_: any, record: any) => (
      <span>
        {record?.userId?.firstName} {record?.userId?.lastName}
      </span>
    ),
  },
  {
    title: 'Date & Time',
    dataIndex: 'orderDate',
    key: 'orderDate',
    render: (orderDate: string) => <span>{moment(orderDate).format('YYYY-MM-DD HH:mm')}</span>,
  },
  {
    title: 'Price',
    dataIndex: 'suggestedMedicine',
    key: 'suggestedMedicine',
    render: (_: any, record: any) => (
      <span>
        {record?.suggestedMedicine
          ?.map((item: any) => item?._id?.sellingPrice)
          ?.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)}
      </span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <div>
        <button
          className={`${
            status === 'processing' ? 'bg-[#cfa423]' : 'bg-[#1854F9]'
          } text-white text-[14px] py-1.5 w-[70%] px-2 rounded-md`}
        >
          {status}
        </button>
      </div>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => (
      <div className="flex items-center space-x-2">
        <Tooltip title="Details">
          <Button
            href={`/medication-trade/details/${record?._id}`}
            type="text"
            shape="circle"
            icon={<BsEye size={20} />}
          />
        </Tooltip>
        <Tooltip title="Edit">
          <Button type="text" shape="circle" icon={<FaEdit size={20} />} onClick={() => onEdit(record)} />
        </Tooltip>
      </div>
    ),
  },
];

const PharmacyMedicationTrade = () => {
  const { data: getPharmacyMedicationTrade, isFetching, refetch } = useGetMedicationTradeQuery(undefined);
  const [updateMedicationTrade] = useUpdateConsultationMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [form] = Form.useForm();

  // New state for search and date filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    form.setFieldsValue({ trackingNo: record.trackingNo });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      try {
        const response = await updateMedicationTrade({
          id: selectedRecord._id,
          data: { trackingNo: values.trackingNo },
        }).unwrap();
        if (response?.success) {
          toast.success('Tracking Number updated successfully!');
          refetch();
          setIsModalVisible(false);
        } else {
          toast.error('Failed to update tracking number.');
        }
      } catch (error) {
        toast.error('Failed to update tracking number.');
      }
    });
  };

  if (isFetching) return <div>Loading...</div>;

  const pharmacyMedicationTrade = getPharmacyMedicationTrade?.data;

  // Filter data based on search term and selected date
  const filteredData = pharmacyMedicationTrade.filter((item: any) => {
    const matchesSearch =
      item.trackingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${item.userId.firstName} ${item.userId.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? moment(item.orderDate).isSame(selectedDate, 'day') : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-title">Medication Trade</h1>
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <Input
            type="text"
            prefix={<BsSearch className="mx-2" size={20} />}
            placeholder="Search"
            style={{ width: 200 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table columns={columns(handleEdit)} rowKey="_id" dataSource={filteredData} />
      <Modal
        title="Edit Tracking Number"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="trackingNo"
            label="Tracking Number"
            rules={[{ required: true, message: 'Please enter the tracking number!' }]}
          >
            <Input placeholder="Enter tracking number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PharmacyMedicationTrade;
