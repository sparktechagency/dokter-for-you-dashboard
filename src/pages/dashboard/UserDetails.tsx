import React from 'react';
import { Table, Button, Input, Space, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { CiLock, CiSearch, CiUnlock } from 'react-icons/ci';

interface DataType {
    key: string;
    sno: string;
    userName: string;
    email: string;
    companyName: string;
}

const UserDetails: React.FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'S.no',
            dataIndex: 'sno',
            key: 'sno',
            width: '80px',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, _record) => (
                <Space size="middle">
                    <Tooltip title="Send Message">
                        <Button type="text" icon={<SendOutlined />} />
                    </Tooltip>
                    <Tooltip title="Unlock">
                        <Button type="text" icon={<CiUnlock size={20} />} style={{ color: 'green' }} />
                    </Tooltip>
                    <Tooltip title="Lock">
                        <Button type="text" icon={<CiLock size={20} />} style={{ color: 'red' }} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            sno: '#1239',
            userName: 'Mr. Mahmud',
            email: 'mr101@mail.ru',
            companyName: '(+33)7 00 55 59 27',
        },
        {
            key: '2',
            sno: '#1238',
            userName: 'Lily',
            email: 'xterris@gmail.com',
            companyName: '(+33)7 00 55 59 27',
        },
        {
            key: '3',
            sno: '#1237',
            userName: 'Kathry',
            email: 'irnabela@gmail.com',
            companyName: '(+33)7 00 55 59 27',
        },
        {
            key: '4',
            sno: '#1236',
            userName: 'Priscilla',
            email: 'cadence@gmail.com',
            companyName: '(+33)7 00 55 59 27',
        },
        {
            key: '5',
            sno: '#1235',
            userName: 'Claire',
            email: 'quasiah@gmail.com',
            companyName: '(+33)7 00 55 59 27',
        },
        // Add more data as needed
    ];

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Users Details</h1>
                <Space>
                    <Tooltip title="Unlock All">
                        <Button type="text" icon={<CiUnlock style={{ fontSize: '30px', color: 'green' }} />} />
                    </Tooltip>
                    <Tooltip title="Lock All">
                        <Button type="text" icon={<CiLock style={{ fontSize: '30px', color: 'red' }} />} />
                    </Tooltip>

                    <Button style={{ height: 40 }} icon={<SendOutlined />} type="primary">
                        Send Message
                    </Button>
                    <Input placeholder="Search" prefix={<CiSearch size={20} />} style={{ width: 200, height: 40 }} />
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys: any, selectedRows: any) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                }}
                pagination={{
                    total: 1239,
                    current: 1,
                    pageSize: 10,
                    showSizeChanger: false,
                    showQuickJumper: true,
                }}
            />
        </div>
    );
};

export default UserDetails;
