import { Badge, Button, DatePicker, Input, Select, Table, Tabs, Tooltip } from 'antd';
import type { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';
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

const videoData = [
    {
        sno: 1,
        dateAndTime: '2024-12-10 14:00',
        price: '€ 25.00',
    },
    {
        sno: 2,
        dateAndTime: '2024-12-10 14:00',
        price: '€ 25.00',
    },
    // Add more video consultation data as needed
];

const DoctorMyTransaction = () => {
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
            title: 'Earning',
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
                            href="/doctor-patient-services/details/2222"
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
        },
        {
            title: 'Date & Time',
            dataIndex: 'dateAndTime',
            key: 'dateAndTime',
            align: 'center' as AlignType,
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: string) => price,
            align: 'center' as AlignType,
        },
    ];

    const getTableContent = () => {
        switch (activeTab) {
            case '1':
                return <Table columns={regularColumns} dataSource={data} pagination={{ pageSize: 10 }} />;
            case '2':
                return <Table columns={videoColumns} dataSource={videoData} pagination={{ pageSize: 10 }} />;

            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex items-center mb-3 gap-5">
                <div className="bg-white w-[20%] p-10">
                    <h1 className="text-xl">
                        Total Earn: <span className="text-primary font-bold">€3000</span>
                    </h1>
                </div>
                <div className="bg-white w-[20%] p-10">
                    <h1 className="text-xl">
                        Total Earn: <span className="text-red-700 font-bold">€3000</span>
                    </h1>
                </div>
                <div className="bg-white p-8 flex items-center justify-between w-[60%]">
                    <h1 className="text-xl">
                        Balance Available: <span className="text-green-700 font-bold">€3000</span>
                    </h1>
                    <button className="bg-green-900 text-white py-3 px-10">Withdraw Balance</button>
                </div>
            </div>
            <div>
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
                                        className={`px-4 py-2 ${
                                            activeTab === '1' ? 'bg-[#0A2369] text-white rounded-lg' : 'bg-[#E6F7FA]'
                                        }`}
                                    >
                                        Earning History
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
                                        Raised History
                                    </div>
                                ),
                                key: '2',
                            },
                        ]}
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-title">
                            {activeTab === '1' ? 'Earning History' : 'Raised History'}
                        </h1>
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
                        <DatePicker
                            style={{ width: 200 }}
                            placeholder="Date & Time"
                            showTime
                            format="YYYY-MM-DD HH:mm"
                        />
                    </div>
                </div>

                {getTableContent()}
            </div>
        </div>
    );
};

export default DoctorMyTransaction;
