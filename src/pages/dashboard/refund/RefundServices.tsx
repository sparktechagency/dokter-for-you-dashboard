import { Table, Badge, Button, Tooltip, Popconfirm, Select, DatePicker, Input, Tabs } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';
import { data } from './constant/constant';
import { useState } from 'react';
import { RiRefundLine } from 'react-icons/ri';

const RefundServices = () => {
  const [activeTab, setActiveTab] = useState('1');

  // Regular Consultation columns
  const regularColumns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Reg. No',
      dataIndex: 'regNo',
      key: 'regNo',
    },
    {
      title: 'Consult for',
      dataIndex: 'consultFor',
      key: 'consultFor',
    },
    {
      title: 'Consultant',
      dataIndex: 'consultant',
      key: 'consultant',
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `€ ${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'Loading...' ? 'processing' : 'default'}
          text={
            <span
              style={{
                color: status === 'Loading...' ? '#FAAD14' : '#1890FF',
                fontWeight: 'bold',
              }}
            >
              {status}
            </span>
          }
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href="/regular-consultation-refund/details/2222"
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you want to refund?"
            onConfirm={() => console.log('refund')}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              style={{
                backgroundColor: '#FF3B28',
              }}
              icon={<RiRefundLine size={20} />}
            >
              Refund Now
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Video Consultation columns
  const videoColumns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Registration No.',
      dataIndex: 'regNo',
      key: 'regNo',
    },
    {
      title: 'Consult for',
      dataIndex: 'consultFor',
      key: 'consultFor',
    },
    {
      title: 'Consultant',
      dataIndex: 'consultant',
      key: 'consultant',
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateAndTime',
      key: 'dateAndTime',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => price,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'Reported' ? 'success' : 'default'}
          text={
            <span
              style={{
                color: status === 'Reported' ? '#52C41A' : '#1890FF',
                fontWeight: 'bold',
              }}
            >
              {status}
            </span>
          }
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href="/video-consultation-refund/details/2222"
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>

          <Popconfirm
            title="Are you want to refund?"
            onConfirm={() => console.log('refund')}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              style={{
                backgroundColor: '#FF3B28',
              }}
              icon={<RiRefundLine size={20} />}
            >
              Refund Now
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Digital Prescription columns
  const prescriptionColumns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Registration No.',
      dataIndex: 'regNo',
      key: 'regNo',
    },
    {
      title: 'Consult for',
      dataIndex: 'consultFor',
      key: 'consultFor',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => price,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'Reported' ? 'success' : 'default'}
          text={
            <span
              style={{
                color: status === 'Reported' ? '#52C41A' : '#1890FF',
                fontWeight: 'bold',
              }}
            >
              {status}
            </span>
          }
        />
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href="/digital-prescription-refund/details/2222"
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>

          <Popconfirm
            title="Are you want to refund?"
            onConfirm={() => console.log('refund')}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              style={{
                backgroundColor: '#FF3B28',
              }}
              icon={<RiRefundLine size={20} />}
            >
              Refund Now
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Medication columns
  const medicationColumns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Registration No.',
      dataIndex: 'regNo',
      key: 'regNo',
    },
    {
      title: 'Consult for',
      dataIndex: 'consultFor',
      key: 'consultFor',
    },
    {
      title: 'Medication',
      dataIndex: 'medication',
      key: 'medication',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'Loading...' ? 'processing' : status === 'Reported' ? 'success' : 'default'}
          text={
            <span
              style={{
                color: status === 'Loading...' ? '#FAAD14' : status === 'Reported' ? '#52C41A' : '#1890FF',
                fontWeight: 'bold',
              }}
            >
              {status}
            </span>
          }
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button href="/medication-refund/details/2222" type="text" shape="circle" icon={<BsEye size={20} />} />
          </Tooltip>

          <Popconfirm
            title="Are you want to refund?"
            onConfirm={() => console.log('refund')}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              style={{
                backgroundColor: '#FF3B28',
              }}
              icon={<RiRefundLine size={20} />}
            >
              Refund Now
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Sample data for each table
  const videoData = [
    {
      sno: 1,
      regNo: '190653',
      consultFor: 'Man problem/Erectile dysfunction',
      consultant: 'Dr. Arco Verhoog',
      dateAndTime: '2024-12-10 14:00',
      duration: '30 mins',
      price: '€ 25.00',
      status: 'Loading...',
    },
    {
      sno: 2,
      regNo: '190652',
      consultFor: 'Man problem/Erectile dysfunction',
      consultant: 'Dr. Arco Verhoog',
      dateAndTime: '2024-12-10 14:00',
      duration: '30 mins',
      price: '€ 25.00',
      status: 'Reported',
    },
    // Add more video consultation data as needed
  ];

  const prescriptionData = [
    {
      sno: 1,
      regNo: '190653',
      consultFor: 'Man problem/Erectile dysfunction',
      medication: 'Amoxicillin',
      price: '€ 25.00',
      status: 'Loading...',
      date: '2024-12-10 14:00',
    },
    {
      sno: 4,
      regNo: '190652',
      consultFor: 'Man problem/Erectile dysfunction',
      medication: 'Amoxicillin',
      price: '€ 25.00',
      status: 'Reported',
      date: '2024-12-10 14:00',
    },
    // Add more prescription data as needed
  ];

  const medicationData = [
    {
      sno: 1,
      regNo: '190653',
      consultFor: 'Man problem/Erectile dysfunction',
      medication: 'Amoxicillin',
      price: '€ 25.00',
      status: 'Loading...',
      date: '2024-12-10 14:00',
    },
    {
      sno: 4,
      regNo: '190652',
      consultFor: 'Man problem/Erectile dysfunction',
      medication: 'Amoxicillin',
      price: '€ 25.00',
      status: 'Reported',
      date: '2024-12-10 14:00',
    },
  ];

  const getTableContent = () => {
    switch (activeTab) {
      case '1':
        return <Table columns={regularColumns} dataSource={data} pagination={{ pageSize: 10 }} />;
      case '2':
        return <Table columns={videoColumns} dataSource={videoData} pagination={{ pageSize: 10 }} />;
      case '3':
        return <Table columns={prescriptionColumns} dataSource={prescriptionData} pagination={{ pageSize: 10 }} />;
      case '4':
        return <Table columns={medicationColumns} dataSource={medicationData} pagination={{ pageSize: 10 }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-title">Refund Services</h1>
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <Input
            type="text"
            prefix={<BsSearch className="mx-2" size={20} />}
            placeholder="Search"
            style={{ width: 200 }}
          />
          <Select
            placeholder="Consult Category"
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'general', label: 'General' },
              { value: 'specialist', label: 'Specialist' },
              { value: 'dental', label: 'Dental' },
            ]}
          />
          <Select
            placeholder="Consult Subcategory"
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'All Subcategories' },
              { value: 'checkup', label: 'Regular Checkup' },
              { value: 'followup', label: 'Follow-up' },
              { value: 'emergency', label: 'Emergency' },
            ]}
          />
          <DatePicker style={{ width: 200 }} placeholder="Date & Time" showTime format="YYYY-MM-DD HH:mm" />
        </div>
      </div>
      <div className="flex justify-start">
        <Tabs
          removeIcon
          activeKey={activeTab}
          centered
          indicator={{
            size: 0,
          }}
          onChange={(key: string) => setActiveTab(key)}
          animated
          items={[
            {
              label: (
                <div
                  className={`px-4 py-2 ${activeTab === '1' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'}`}
                >
                  Regular Consultation
                </div>
              ),
              key: '1',
            },
            {
              label: (
                <div
                  className={`px-4 py-2 ${activeTab === '2' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'}`}
                >
                  Video Consultation
                </div>
              ),
              key: '2',
            },
            {
              label: (
                <div
                  className={`px-4 py-2 ${activeTab === '3' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'}`}
                >
                  Digital Prescription Details
                </div>
              ),
              key: '3',
            },
            {
              label: (
                <div
                  className={`px-4 py-2 ${activeTab === '4' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'}`}
                >
                  Medication by Patient
                </div>
              ),
              key: '4',
            },
          ]}
        />
      </div>

      {getTableContent()}
    </div>
  );
};

export default RefundServices;
