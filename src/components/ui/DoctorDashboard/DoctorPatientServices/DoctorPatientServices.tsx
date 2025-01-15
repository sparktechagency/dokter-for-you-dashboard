import { Table, Badge, Button, Tooltip, Select, DatePicker, Input, Tabs } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { useGetDoctorConsultationsQuery } from '../../../../redux/apiSlices/DoctorConsultationSlice';
import { jwtDecode, JwtPayload } from 'jwt-decode';

// export const data = [
//   {
//     key: '1',
//     sno: '#1239',
//     regNo: '190653',
//     consultFor: 'Man problem/Erectile dysfunction',
//     consultant: 'Dr. Arco Verhoog',
//     dateTime: '14/11/2022, 10:09',
//     price: 25.0,
//     status: 'Loading...',
//   },
//   {
//     key: '2',
//     sno: '#1238',
//     regNo: '190653',
//     consultFor: 'Man problem/Erectile dysfunction',
//     consultant: 'Dr. Arco Verhoog',
//     dateTime: '01/11/2022, 14:35',
//     price: 25.0,
//     status: 'Reported',
//   },
//   // Add more rows here
// ];

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
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

const DoctorPatientServices = () => {
  const [activeTab, setActiveTab] = useState('1');

  const token = localStorage.getItem('authToken');
  if (token === null) {
    // Handle the case where the token is null, e.g., redirect to login
    console.error('No auth token found');
    return <div>Please log in again.</div>;
  }
  const payload = jwtDecode(token) as CustomJwtPayload;
  const { id } = payload;

  console.log(id);

  const { data: getConsultations, isFetching } = useGetDoctorConsultationsQuery(id);

  if (isFetching) return <div>Loading...</div>;

  const consultations = getConsultations?.data;

  console.log(consultations);

  const regularConsultationData = consultations?.filter(
    (item: ConsultationItem) => item?.consultationType === 'regular',
  );
  const videoConsultationData = consultations?.filter((item: ConsultationItem) => item?.consultationType === 'video');
  const digitalPrescriptionData = consultations?.filter((item: ConsultationItem) => item?.forwardToPartner === false);
  const digitalPrescriptionWithOrderData = consultations?.filter(
    (item: ConsultationItem) => item?.forwardToPartner === true,
  );

  console.log(consultations);

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
        const date = new Date(createdAt);
        return date.toLocaleString();
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
        const date = new Date(createdAt);
        return date.toLocaleString();
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
        const date = new Date(createdAt);
        return date.toLocaleString();
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
        const date = new Date(createdAt);
        return date.toLocaleString();
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
      render: (record: any) => (
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
            columns={regularColumns}
            rowKey="_id"
            dataSource={regularConsultationData}
            pagination={{ pageSize: 10 }}
          />
        );
      case '2':
        return (
          <Table columns={videoColumns} rowKey="_id" dataSource={videoConsultationData} pagination={{ pageSize: 10 }} />
        );
      case '3':
        return (
          <Table
            columns={prescriptionColumns}
            rowKey="_id"
            dataSource={digitalPrescriptionData}
            pagination={{ pageSize: 10 }}
          />
        );
      case '4':
        return (
          <Table
            columns={medicationColumns}
            rowKey="_id"
            dataSource={digitalPrescriptionWithOrderData}
            pagination={{ pageSize: 10 }}
          />
        );
      default:
        return null;
    }
  };

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

export default DoctorPatientServices;
