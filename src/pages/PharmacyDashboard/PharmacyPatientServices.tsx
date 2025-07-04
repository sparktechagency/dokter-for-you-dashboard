import { Button, Input, Select, Table, Tooltip } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { useGetConsultationsQuery } from '../../redux/apiSlices/patientServiceSlice';
import moment from 'moment';

const PharmacyPatientServices = () => {
  const { data: getConsultations, isFetching } = useGetConsultationsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  if (isFetching) return <div>Loading...</div>;

  const consultations = getConsultations?.data?.consultations;
  // console.log(consultations);

  const forwardToPartnerOptions = consultations
    ?.filter((item: any) => item?.suggestedMedicine?.length > 0)
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const uniqueSubCategories = Array.from(
    new Set(forwardToPartnerOptions?.map((item: any) => item.subCategory?.name)),
  ).map((subCategory) => ({ value: subCategory, label: subCategory }));

  const filteredOptions = forwardToPartnerOptions?.filter(
    (item: any) =>
      (selectedSubCategory === 'all' || item?.subCategory?.name === selectedSubCategory) &&
      (item?.doctorId?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.doctorId?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.subCategory?.name?.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const Columns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Reg. No',
      dataIndex: '_id',
      key: '_id',
      render: (_: any, record: any) => record._id.slice(0, 10),
    },
    {
      title: 'Consult for',
      dataIndex: ['subCategory', 'name'],
      key: 'consultFor',
    },
    {
      title: 'Patient',
      dataIndex: 'userId',
      key: 'patient',
      render: (userId: any) => (
        <span>
          {userId?.firstName} {userId?.lastName}
        </span>
      ),
    },
    {
      title: 'Country',
      dataIndex: ['userId', 'country'],
      key: 'country',
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <span>{moment(createdAt).format('MMMM Do YYYY, h:mm a')}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'totalPrice',
      key: 'price',
      render: (totalPrice: any) => `€ ${totalPrice || 0}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div>
          <button
            className={`${
              status === 'processing'
                ? 'bg-yellow-500'
                : status === 'accepted'
                ? 'bg-blue-600'
                : status === 'prescribed'
                ? 'bg-green-500'
                : 'bg-red-500'
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
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/pharmacy-patient-services/details/${record._id}`}
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
              placeholder="Search by doctor or registration number"
              style={{ width: 200 }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              placeholder="Consult Subcategory"
              style={{ width: 200 }}
              value={selectedSubCategory}
              onChange={(value) => setSelectedSubCategory(value)}
              options={[{ value: 'all', label: 'All Subcategories' }, ...uniqueSubCategories]}
            />
          </div>
        </div>
        <p className=" text-[#0A2369] text-[20px] pb-3 font-normal"></p>
        <Table columns={Columns} rowKey="_id" dataSource={filteredOptions} pagination={{ pageSize: 10 }} />
      </div>
    </div>
  );
};

export default PharmacyPatientServices;
