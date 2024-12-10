import { Table, Badge, Button, Tooltip, Popconfirm, Select, DatePicker, Input, Tabs } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';
import { LiaHandPointRightSolid } from 'react-icons/lia';
import { data } from './constant/constant';
import { useState } from 'react';

const PatientServices = () => {
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
                            href="/patient-services/details"
                            type="text"
                            shape="circle"
                            icon={<BsEye size={20} />}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to poke your therapist?"
                        onConfirm={() => console.log('Poked')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            shape="circle"
                            icon={<LiaHandPointRightSolid color="#00B3CC" size={20} />}
                        />
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
            title: 'Meeting ID',
            dataIndex: 'meetingId',
            key: 'meetingId',
        },
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            key: 'schedule',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge
                    status={status === 'Scheduled' ? 'processing' : status === 'Completed' ? 'success' : 'default'}
                    text={
                        <span
                            style={{
                                color:
                                    status === 'Scheduled' ? '#FAAD14' : status === 'Completed' ? '#52C41A' : '#1890FF',
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
                    <Tooltip title="Join Meeting">
                        <Button type="primary" size="small" onClick={() => console.log('Join Meeting')}>
                            Join
                        </Button>
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
        },
        {
            title: 'Prescription ID',
            dataIndex: 'prescriptionId',
            key: 'prescriptionId',
        },
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div className="flex items-center space-x-2">
                    <Tooltip title="Download">
                        <Button type="primary" size="small" onClick={() => console.log('Download Prescription')}>
                            Download
                        </Button>
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
        },
        {
            title: 'Medicine Name',
            dataIndex: 'medicineName',
            key: 'medicineName',
        },
        {
            title: 'Dosage',
            dataIndex: 'dosage',
            key: 'dosage',
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            key: 'frequency',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge
                    status={status === 'Active' ? 'success' : 'default'}
                    text={
                        <span
                            style={{
                                color: status === 'Active' ? '#52C41A' : '#1890FF',
                                fontWeight: 'bold',
                            }}
                        >
                            {status}
                        </span>
                    }
                />
            ),
        },
    ];

    // Sample data for each table
    const videoData = [
        {
            sno: 1,
            meetingId: 'MEET-001',
            patientName: 'John Doe',
            doctor: 'Dr. Smith',
            schedule: '2024-12-10 14:00',
            duration: '30 mins',
            status: 'Scheduled',
        },
        // Add more video consultation data as needed
    ];

    const prescriptionData = [
        {
            sno: 1,
            prescriptionId: 'PRE-001',
            patientName: 'John Doe',
            doctor: 'Dr. Smith',
            date: '2024-12-10',
        },
        // Add more prescription data as needed
    ];

    const medicationData = [
        {
            sno: 1,
            medicineName: 'Amoxicillin',
            dosage: '500mg',
            frequency: '3 times/day',
            startDate: '2024-12-10',
            endDate: '2024-12-17',
            status: 'Active',
        },
        // Add more medication data as needed
    ];

    const getTableContent = () => {
        switch (activeTab) {
            case '1':
                return (
                    <Table
                        columns={regularColumns}
                        dataSource={data}
                        pagination={{ pageSize: 10 }}
                        rowClassName="text-gray-700"
                    />
                );
            case '2':
                return (
                    <Table
                        columns={videoColumns}
                        dataSource={videoData}
                        pagination={{ pageSize: 10 }}
                        rowClassName="text-gray-700"
                    />
                );
            case '3':
                return (
                    <Table
                        columns={prescriptionColumns}
                        dataSource={prescriptionData}
                        pagination={{ pageSize: 10 }}
                        rowClassName="text-gray-700"
                    />
                );
            case '4':
                return (
                    <Table
                        columns={medicationColumns}
                        dataSource={medicationData}
                        pagination={{ pageSize: 10 }}
                        rowClassName="text-gray-700"
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
                    hideAdd
                    activeKey={activeTab}
                    centered
                    indicator={{
                        size: 20,
                        align: 'end',
                    }}
                    onChange={(key: string) => setActiveTab(key)}
                    animated
                    tabPosition="top"
                    items={[
                        {
                            label: (
                                <div
                                    className={`px-4 py-2 ${
                                        activeTab === '1' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'
                                    }`}
                                >
                                    Regular Consultation
                                </div>
                            ),
                            key: '1',
                        },
                        {
                            label: (
                                <div
                                    className={`px-4 py-2 ${
                                        activeTab === '2' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'
                                    }`}
                                >
                                    Video Consultation
                                </div>
                            ),
                            key: '2',
                        },
                        {
                            label: (
                                <div
                                    className={`px-4 py-2 ${
                                        activeTab === '3' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'
                                    }`}
                                >
                                    Digital Prescription Details
                                </div>
                            ),
                            key: '3',
                        },
                        {
                            label: (
                                <div
                                    className={`px-4 py-2 ${
                                        activeTab === '4' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'
                                    }`}
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

export default PatientServices;
