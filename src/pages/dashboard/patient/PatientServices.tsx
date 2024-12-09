import { Table, Badge, Button, Tooltip, Popconfirm } from 'antd';
import { BsEye } from 'react-icons/bs';
import { LiaHandPointRightSolid } from 'react-icons/lia';
import { data } from './constant/constant';

const PatientServices = () => {
    const columns = [
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

    return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} rowClassName="text-gray-700" />;
};

export default PatientServices;
