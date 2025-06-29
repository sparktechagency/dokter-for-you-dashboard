import { Table, Button, Tooltip, Select, Input, Tabs, TabsProps } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';

import { useState } from 'react';
import { useGetConsultationsQuery } from '../../../redux/apiSlices/patientServiceSlice';
import dayjs from 'dayjs';

// Define the interface for consultation items
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
  createdAt: string;
}

const PatientServices = () => {
  const [countryTab, setCountryTab] = useState<'netherland' | 'europe'>('netherland');
  const [activeTab, setActiveTab] = useState('1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(undefined);

  const { data: getConsultations, isFetching } = useGetConsultationsQuery(undefined);

  if (isFetching) return <div>Loading...</div>;

  // console.log(getConsultations);

  const netherlandConsultations = getConsultations?.data?.consultations?.filter(
    (item: any) =>
      item?.userId?.country?.toLowerCase() === 'netherlands' || item?.userId?.country?.toLowerCase() === 'nederland',
  );
  const europeConsultations = getConsultations?.data?.consultations?.filter(
    (item: any) =>
      item?.userId?.country?.toLowerCase() !== 'netherlands' && item?.userId?.country?.toLowerCase() !== 'nederland',
  );

  const consultationData = countryTab === 'netherland' ? netherlandConsultations || [] : europeConsultations || [];

  const subCategories = [...new Set(consultationData?.map((item: any) => item?.subCategory?.name))];

  const regularConsultationData = consultationData
    ?.filter((item: ConsultationItem) => item?.consultationType === 'regular')
    .sort(
      (a: ConsultationItem, b: ConsultationItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const videoConsultationData = consultationData
    ?.filter((item: ConsultationItem) => item?.consultationType === 'video')
    .sort(
      (a: ConsultationItem, b: ConsultationItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const digitalPrescriptionData = consultationData
    ?.filter((item: ConsultationItem) => item?.forwardToPartner === false)
    .sort(
      (a: ConsultationItem, b: ConsultationItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const digitalPrescriptionWithOrderData = consultationData
    ?.filter((item: ConsultationItem) => item?.forwardToPartner === true)
    .sort(
      (a: ConsultationItem, b: ConsultationItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const filteredConsultationData = (data: any[]) => {
    return data.filter((item: ConsultationItem) => {
      const subCategoryMatch = item?.subCategory?.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const doctorNameMatch = `${item?.doctorId?.firstName || ''} ${item?.doctorId?.lastName || ''}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const selectedSubCategoryMatch = selectedSubCategory ? item?.subCategory?.name === selectedSubCategory : true;
      return (subCategoryMatch || doctorNameMatch) && selectedSubCategoryMatch;
    });
  };

  const countryColumn = {
    title: 'Country',
    dataIndex: ['userId', 'country'],
    key: 'country',
    render: (country: string) => <span>{country || 'N/A'}</span>,
  };

  const insertCountryColumn = (columns: any[]) => {
    if (countryTab === 'europe') {
      const index = columns.findIndex((col) => col.key === 'regNo');
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
      title: 'Registration No.',
      dataIndex: '_id',
      key: 'regNo',
      render: (id: string) => `#${id.slice(-8)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'consultFor',
      render: (subCategory: { name: string }) => (
        <div className="flex items-center space-x-2">
          <span>{subCategory?.name}</span>
        </div>
      ),
    },
    {
      title: 'Consultant',
      dataIndex: 'doctorId',
      key: 'consultant',
      render: (_: any, record: any) => {
        const firstName = record?.doctorId?.firstName || 'N/A';
        const lastName = record?.doctorId?.lastName || 'N/A';
        return `${firstName} ${lastName}`;
      },
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('DD/MM/YYYY, h:mm A'),
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      render: () => `$25.00`,
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
              // onClick={() => setSelectedData(record)}
              href={`/regular-consultation/details/${record._id}`}
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
      title: 'Registration No.',
      dataIndex: '_id',
      key: 'regNo',
      render: (id: string) => `#${id.slice(-8)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'consultFor',
      render: (subCategory: { name: string }) => (
        <div className="flex items-center space-x-2">
          <span>{subCategory?.name}</span>
        </div>
      ),
    },
    {
      title: 'Consultant',
      dataIndex: 'doctorId',
      key: 'consultant',
      render: (_: any, record: any) => {
        const firstName = record?.doctorId?.firstName || 'N/A';
        const lastName = record?.doctorId?.lastName || 'N/A';
        return `${firstName} ${lastName}`;
      },
    },
    {
      title: 'Date & Time',
      dataIndex: 'updatedAt',
      key: 'dateAndTime',
      render: (updatedAt: string) => new Date(updatedAt).toLocaleString(),
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      render: () => `$25.00`,
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
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/regular-consultation/details/${record._id}`}
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
      title: 'Registration No.',
      dataIndex: '_id',
      key: 'regNo',
      render: (id: string) => `#${id.slice(-8)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'consultFor',
      render: (subCategory: { name: string }) => (
        <div className="flex items-center space-x-2">
          <span>{subCategory?.name}</span>
        </div>
      ),
    },

    {
      title: 'Date & Time',
      dataIndex: 'updatedAt',
      key: 'dateAndTime',
      render: (updatedAt: string) => new Date(updatedAt).toLocaleString(),
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      render: () => `$25.00`,
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
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/digital-prescription/details/${record._id}`}
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
      title: 'Registration No.',
      dataIndex: '_id',
      key: 'regNo',
      render: (id: string) => `#${id.slice(-8)}`,
    },
    {
      title: 'Consult for',
      dataIndex: 'subCategory',
      key: 'consultFor',
      render: (subCategory: { name: string }) => (
        <div className="flex items-center space-x-2">
          <span>{subCategory?.name}</span>
        </div>
      ),
    },
    {
      title: 'Consultant',
      dataIndex: 'doctorId',
      key: 'consultant',
      render: (_: any, record: any) => {
        const firstName = record?.doctorId?.firstName || 'N/A';
        const lastName = record?.doctorId?.lastName || 'N/A';
        return `${firstName} ${lastName}`;
      },
    },
    {
      title: 'Date & Time',
      dataIndex: 'updatedAt',
      key: 'dateAndTime',
      render: (updatedAt: string) => new Date(updatedAt).toLocaleString(),
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      render: () => `$25.00`,
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
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button href={`/medication/details/${record._id}`} type="text" shape="circle" icon={<BsEye size={20} />} />
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
            dataSource={filteredConsultationData(regularConsultationData)}
            pagination={{ pageSize: 10 }}
          />
        );
      case '2':
        return (
          <Table
            columns={insertCountryColumn(videoColumns)}
            dataSource={filteredConsultationData(videoConsultationData)}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        );
      case '3':
        return (
          <Table
            columns={insertCountryColumn(prescriptionColumns)}
            dataSource={filteredConsultationData(digitalPrescriptionData)}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        );
      case '4':
        return (
          <Table
            columns={insertCountryColumn(medicationColumns)}
            dataSource={filteredConsultationData(digitalPrescriptionWithOrderData)}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        );
      default:
        return null;
    }
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
      <div>
        <h1 className="text-2xl font-semibold text-title">Patient Services</h1>
      </div>

      <div className="flex justify-between">
        <div></div>
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
            placeholder="Consult Subcategory"
            style={{ width: 200 }}
            options={subCategories?.map((subCategory) => ({ value: subCategory, label: subCategory }))}
            onChange={(value) => setSelectedSubCategory(value)}
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
        {/* Existing Tabs for consultation types remain unchanged */}
        <Tabs
          removeIcon
          activeKey={activeTab}
          centered
          indicator={{ size: 0 }}
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
                  Digital Prescription With Order
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

export default PatientServices;
