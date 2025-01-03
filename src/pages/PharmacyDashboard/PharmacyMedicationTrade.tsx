import { DatePicker, Input, Select, Table, Button, Tooltip } from 'antd';
import { BsSearch, BsEye } from 'react-icons/bs';

const data = [
    {
        key: '1',
        sNo: '1',
        trackingNo: '123456789',
        userName: 'Mr. Smith',
        dateTime: '2023-10-01 10:00',
        price: '$50',
        status: 'Resented',
    },
    {
        key: '2',
        sNo: '2',
        trackingNo: '987654321',
        userName: 'Mr. John',
        dateTime: '2023-10-02 11:00',
        price: '$75',
        status: 'Reported',
    },
    // Add more data as needed
];

interface DataType {
    key: string;
    sNo: string;
    trackingNo: string;
    userName: string;
    dateTime: string;
    price: string;
    status: string;
}

interface ColumnType {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text: any, record: DataType) => JSX.Element;
    align?: 'left' | 'center' | 'right';
}

const columns: ColumnType[] = [
    {
        title: 'S.No',
        dataIndex: 'sNo',
        key: 'sNo',
    },
    {
        title: 'Tracking No',
        dataIndex: 'trackingNo',
        key: 'trackingNo',
    },
    {
        title: 'User Name',
        dataIndex: 'userName',
        key: 'userName',
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
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (status: string) => (
            <div>
                <button
                    className={`${
                        status === 'Resented' ? 'bg-[#FFBE00]' : 'bg-[#1854F9]'
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
        render: () => (
            <div className="flex items-center space-x-2">
                <Tooltip title="Details">
                    <Button
                        href="/pharmacy-medication-trade/medication-details/2222"
                        type="text"
                        shape="circle"
                        icon={<BsEye size={20} />}
                    />
                </Tooltip>
            </div>
        ),
    },
];

const PharmacyMedicationTrade = () => {
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
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default PharmacyMedicationTrade;
