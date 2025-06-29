import { Table, Button, Tooltip, Select, Input, Tabs, TabsProps } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { useGetDoctorConsultationsQuery } from '../../../../redux/apiSlices/DoctorConsultationSlice';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import moment from 'moment';

interface ConsultationItem {
  _id: string;
  consultationType: string;
  subCategory: {
    name: string;
  };
  forwardToPartner: boolean;
  medicins: any[];
  doctorId: {
    firstName: string;
    lastName: string;
  };
  status: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

const DoctorPatientServices = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [countryTab, setCountryTab] = useState<'netherland' | 'europe'>('netherland');

  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if (token === null) {
    // Handle the case where the token is null, e.g., redirect to login
    console.error('No auth token found');
    return <div>Please log in again.</div>;
  }
  const payload = jwtDecode(token) as CustomJwtPayload;
  const { id } = payload;

  // console.log(id);

  const { data: getConsultations, isFetching } = useGetDoctorConsultationsQuery(id);

  if (isFetching) return <div>Loading...</div>;

  const netherlandConsultations = getConsultations?.data?.consultations?.filter(
    (item: any) =>
      item?.userId?.country?.toLowerCase() === 'netherlands' || item?.userId?.country?.toLowerCase() === 'nederland',
  );
  const europeConsultations = getConsultations?.data?.consultations?.filter(
    (item: any) =>
      item?.userId?.country?.toLowerCase() !== 'netherlands' && item?.userId?.country?.toLowerCase() !== 'nederland',
  );

  const uniqueSubCategories = Array.from(new Set(netherlandConsultations?.map((item: any) => item?.subCategory?.name)));

  const subCategoryOptions = uniqueSubCategories?.map((subCategory) => ({
    value: subCategory,
    label: subCategory,
  }));

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'prescribed', label: 'Prescribed' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const consultationData = countryTab === 'netherland' ? netherlandConsultations : europeConsultations;
  console.log(consultationData);

  const filteredConsultations = consultationData
    ?.slice()
    ?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    ?.filter((item: ConsultationItem) => {
      const matchesSearch = item?.subCategory?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesSubCategory = selectedSubCategory ? item?.subCategory?.name === selectedSubCategory : true;
      const matchesStatus = selectedStatus ? item?.status === selectedStatus : true;
      return matchesSearch && matchesSubCategory && matchesStatus;
    });

  console.log('filteredConsultations', filteredConsultations);

  const regularConsultationData = filteredConsultations?.filter(
    (item: ConsultationItem) => item?.consultationType === 'regular',
  );
  const videoConsultationData = filteredConsultations?.filter(
    (item: ConsultationItem) => item?.consultationType === 'video',
  );
  const digitalPrescriptionData = filteredConsultations?.filter(
    (item: ConsultationItem) => item?.forwardToPartner === false,
  );
  const digitalPrescriptionWithOrderData = filteredConsultations?.filter(
    (item: ConsultationItem) => item?.forwardToPartner === true,
  );

  const countryColumn = {
    title: 'Country',
    dataIndex: ['userId', 'country'],
    key: 'country',
    render: (country: string) => <span>{country || 'N/A'}</span>,
  };

  const insertCountryColumn = (columns: any[]) => {
    if (countryTab === 'europe') {
      const index = columns.findIndex((col) => col.key === '_id');
      const newColumns = [...columns];
      newColumns.splice(index + 1, 0, countryColumn);
      return newColumns;
    }
    return columns;
  };

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
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => `#${id.slice(-10)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (subCategory: { name: string }) => subCategory.name,
    },
    {
      title: 'Consultant',
      dataIndex: 'doctorId',
      key: 'doctorId',
      render: (doctorId: { firstName: string; lastName: string }) => `${doctorId.firstName} ${doctorId.lastName}`,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        return <span>{moment(createdAt).format('MMMM Do YYYY, h:mm a')}</span>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: () => `€ 25.00`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Button
          className={
            status === 'pending'
              ? 'bg-yellow-500 text-white'
              : status === 'rejected'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }
        >
          {status}
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/doctor-patient-services/details/${record?._id}`}
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>
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
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Reg. No',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => `#${id.slice(-10)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (subCategory: { name: string }) => subCategory.name,
    },
    {
      title: 'Consultant',
      dataIndex: 'doctorId',
      key: 'doctorId',
      render: (doctorId: { firstName: string; lastName: string }) => `${doctorId.firstName} ${doctorId.lastName}`,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        return <span>{moment(createdAt).format('MMMM Do YYYY, h:mm a')}</span>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: () => `€ 25.00`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Button
          className={
            status === 'pending'
              ? 'bg-yellow-500 text-white'
              : status === 'rejected'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }
        >
          {status}
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/doctor-video-consultation/details/${record?._id}`}
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>
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
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Reg. No',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => `#${id.slice(-10)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (subCategory: { name: string }) => subCategory.name,
    },
    {
      title: 'Consultant',
      dataIndex: 'doctorId',
      key: 'doctorId',
      render: (doctorId: { firstName: string; lastName: string }) => `${doctorId.firstName} ${doctorId.lastName}`,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        return <span>{moment(createdAt).format('MMMM Do YYYY, h:mm a')}</span>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: () => `€ 25.00`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Button
          className={
            status === 'pending'
              ? 'bg-yellow-500 text-white'
              : status === 'rejected'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }
        >
          {status}
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/doctor-digital-prescription/details/${record?._id}`}
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>
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
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Reg. No',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => `#${id.slice(-10)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (subCategory: { name: string }) => subCategory.name,
    },
    {
      title: 'Consultant',
      dataIndex: 'doctorId',
      key: 'doctorId',
      render: (doctorId: { firstName: string; lastName: string }) => `${doctorId.firstName} ${doctorId.lastName}`,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        return <span>{moment(createdAt).format('MMMM Do YYYY, h:mm a')}</span>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: () => `€ 25.00`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Button
          className={
            status === 'pending'
              ? 'bg-yellow-500 text-white'
              : status === 'rejected'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }
        >
          {status}
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/doctor-digital-prescription-with-orders/details/${record._id}`}
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const getTableContent = () => {
    switch (activeTab) {
      case '1':
        return (
          <Table
            columns={insertCountryColumn(regularColumns)}
            rowKey="_id"
            dataSource={regularConsultationData}
            pagination={{ pageSize: 10 }}
          />
        );
      case '2':
        return (
          <Table
            columns={insertCountryColumn(videoColumns)}
            rowKey="_id"
            dataSource={videoConsultationData}
            pagination={{ pageSize: 10 }}
          />
        );
      case '3':
        return (
          <Table
            columns={insertCountryColumn(prescriptionColumns)}
            rowKey="_id"
            dataSource={digitalPrescriptionData}
            pagination={{ pageSize: 10 }}
          />
        );
      case '4':
        return (
          <Table
            columns={insertCountryColumn(medicationColumns)}
            rowKey="_id"
            dataSource={digitalPrescriptionWithOrderData}
            pagination={{ pageSize: 10 }}
          />
        );
      default:
        return null;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
  };

  // Top-level country tabs using Ant Design Tabs
  const countryTabItems: TabsProps['items'] = [
    {
      key: 'netherland',
      label: 'Service for Netherland',
      children: null, // Content is below
    },
    {
      key: 'europe',
      label: 'Service for Europe',
      children: null,
    },
  ];

  return (
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
            onChange={handleSearchChange}
          />
          <Select
            placeholder="Consult Subcategory"
            style={{ width: 200 }}
            onChange={handleSubCategoryChange}
            options={subCategoryOptions}
          />
          <Select
            placeholder="Consult Status"
            style={{ width: 200 }}
            onChange={setSelectedStatus}
            options={statusOptions}
          />
        </div>
      </div>

      <Tabs
        activeKey={countryTab}
        items={countryTabItems}
        onChange={(key) => setCountryTab(key as 'netherland' | 'europe')}
        style={{ marginBottom: 16 }}
      />

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

export default DoctorPatientServices;
