import { Table, Badge, Button, Tooltip, Popconfirm, Select, DatePicker, Input } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';
import { LiaHandPointRightSolid } from 'react-icons/lia';

const MedicationTrade = () => {
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
                                color:
                                    status === 'Loading...' ? '#FAAD14' : status === 'Reported' ? '#52C41A' : '#1890FF',
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
                            href="/medication-trade/details/2222"
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

    // Sample data for each table

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

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-title">Medication trade</h1>
                </div>
                <div className="mb-4 flex items-center justify-end gap-4">
                    <Input
                        type="text"
                        prefix={<BsSearch className="mx-2" size={20} />}
                        placeholder="Search"
                        style={{ width: 200 }}
                    />
                    <Select
                        placeholder="Status"
                        style={{ width: 200 }}
                        options={[
                            { value: 'all', label: 'All Status' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'delivered', label: 'Delivered' },
                            { value: 'cancelled', label: 'Cancelled' },
                        ]}
                    />
                    <Select
                        placeholder="Pharmacy"
                        style={{ width: 200 }}
                        options={[
                            { value: 'all', label: 'All Pharmacies' },
                            { value: 'pharmacy1', label: 'Pharmacy 1' },
                            { value: 'pharmacy2', label: 'Pharmacy 2' },
                            { value: 'pharmacy3', label: 'Pharmacy 3' },
                        ]}
                    />
                    <DatePicker style={{ width: 200 }} placeholder="Order Date" />
                    <DatePicker style={{ width: 200 }} placeholder="Delivery Date" />
                </div>
            </div>

            <div>
                <Table columns={medicationColumns} dataSource={medicationData} pagination={{ pageSize: 5 }} />
            </div>
        </div>
    );
};

export default MedicationTrade;
