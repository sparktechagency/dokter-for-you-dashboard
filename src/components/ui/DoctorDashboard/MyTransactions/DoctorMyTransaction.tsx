import { Button, Input, Table, Tooltip } from 'antd';

import { BsEye, BsSearch } from 'react-icons/bs';

import {
  useDoctorEarningHistoryQuery,
  useGetDoctorEarningsStatesQuery,
  useWithdrawMoneyMutation,
} from '../../../../redux/apiSlices/DoctorConsultationSlice';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useState } from 'react';

export const data = [
  {
    key: '1',
    sno: '#1239',
    regNo: '190653',
    consultFor: 'Man problem/Erectile dysfunction',
    consultant: 'Dr. Arco Verhoog',
    dateTime: '14/11/2022, 10:09',
    price: 25.0,
    status: 'Loading...',
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

const DoctorMyTransaction = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: getDoctorEarnings, isFetching } = useGetDoctorEarningsStatesQuery(undefined);
  const { data: getEarningHistory } = useDoctorEarningHistoryQuery(undefined);
  const [withdrawMoney] = useWithdrawMoneyMutation();

  if (isFetching) return <div>Loading...</div>;

  const doctorEarnings = getDoctorEarnings?.data;
  const earningHistory = getEarningHistory?.data;
  console.log(earningHistory);

  // Regular Consultation columns
  const regularColumns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Reg. No',
      dataIndex: 'regNo',
      key: 'regNo',
      render: (_: any, record: any) => <span>{record?._id.slice(-8)}</span>,
    },
    {
      title: 'Consultation Type',
      dataIndex: 'consultationType',
      key: 'consultationType',
    },
    {
      title: 'Consult for',
      dataIndex: ['subCategory', 'name'],
      key: 'consultFor',
    },
    {
      title: 'Patient Name',
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
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: 'Earning',
      dataIndex: 'price',
      key: 'price',
      render: () => `€ ${(25 * 15) / 100}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div>
          <button
            className={`${
              status === 'pending' ? 'bg-[#cfa423]' : 'bg-[#1854F9]'
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
              href={`medication-trade/details/${record?._id}`}
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleWithdrawMoney = async () => {
    try {
      const response = await withdrawMoney(undefined).unwrap();
      console.log(response);
      if (response.success) {
        toast.success('Money withdrawn successfully!');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to withdraw money.');
    }
  };

  const filteredEarningHistory = earningHistory?.filter((record: any) => {
    const patientName = `${record.userId.firstName} ${record.userId.lastName}`.toLowerCase();
    return patientName.includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="flex items-center mb-3 gap-5">
        <div className="bg-white w-[20%] p-10">
          <h1 className="text-xl">
            Total Earn: <span className="text-primary font-bold">€ {doctorEarnings?.totalEarn}</span>
          </h1>
        </div>
        <div className="bg-white w-[20%] p-10">
          <h1 className="text-xl">
            Total Withdraw: <span className="text-red-700 font-bold">€ {doctorEarnings?.totalWithdrawn}</span>
          </h1>
        </div>
        <div className="bg-white p-8 flex items-center justify-between w-[60%]">
          <h1 className="text-xl">
            Balance Available: <span className="text-green-700 font-bold">€ {doctorEarnings?.balanceAvailable}</span>
          </h1>
          <button onClick={() => handleWithdrawMoney()} className="bg-green-900 text-white py-3 px-10">
            Withdraw Balance
          </button>
        </div>
      </div>
      <div></div>
      <div className="flex justify-end">
        <div className="mb-4 flex items-center justify-end gap-4">
          <Input
            type="text"
            prefix={<BsSearch className="mx-2" size={20} />}
            placeholder="Search by Patient Name"
            style={{ width: 200 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <Table columns={regularColumns} rowKey="_id" dataSource={filteredEarningHistory} pagination={{ pageSize: 10 }} />;
    </div>
  );
};

export default DoctorMyTransaction;
