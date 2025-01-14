import { Button, DatePicker, Input, Select, Table, Tooltip } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';

export const data = [
  {
    key: '1',
    sno: '#1239',
    regNo: '190653',
    consultFor: 'Man problem/Erectile dysfunction',
    consultant: 'Dr. Arco Verhoog',
    dateTime: '14/11/2022, 10:09',
    price: 25.0,
    status: 'Resented',
  },
  {
    key: '2',
    sno: '#1238',
    regNo: '190653',
    consultFor: 'Man problem/Erectile dysfunction',
    consultant: 'Dr. Arco Verhoog',
    dateTime: '01/11/2022, 14:35',
    price: 25.0,
    status: 'Reported',
  },
  // Add more rows here
];

const PharmacyPatientServices = () => {
  const Columns = [
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
        <div>
          <button
            className={`${
              status === 'Resented' ? 'bg-[#FFBE00]' : 'bg-[#1854F9]'
            } text-white text-[14px] py-1.5 px-2 rounded-md`}
          >
            {status}
          </button>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href="/pharmacy-patient-services/details/2222"
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-title">Patient Services</h1>
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
        <p className=" text-[#0A2369] text-[20px] pb-3 font-normal">Forward Prescription from our Partner</p>
        <Table columns={Columns} dataSource={data} pagination={{ pageSize: 10 }} />;
      </div>
    </div>
  );
};

export default PharmacyPatientServices;
