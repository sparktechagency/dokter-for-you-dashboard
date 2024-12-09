import React, { useState } from 'react';
import { Table, Button, Input, Space, Tooltip, Popconfirm } from 'antd';
import { ExclamationCircleOutlined, SendOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { CiLock, CiSearch, CiUnlock } from 'react-icons/ci';
import { BsEye } from 'react-icons/bs';
import Modal from '../../../components/shared/Modal';
import { FaDownload } from 'react-icons/fa';

interface DataType {
    key: string;
    sno: string;
    userName: string;
    email: string;
    companyName: string;
}

const UserDetails: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);

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
                    <Tooltip title="View Details">
                        <Button onClick={() => setOpenModal(true)} type="text" icon={<BsEye size={20} />} />
                    </Tooltip>
                    <Tooltip title="Unlock">
                        <Popconfirm
                            title="Are you sure to unlock this account?"
                            onConfirm={() => console.log('Unlock')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="text" icon={<CiUnlock size={20} />} style={{ color: 'green' }} />
                        </Popconfirm>
                    </Tooltip>
                    <Tooltip title="Lock">
                        <Popconfirm
                            title="Are you sure to lock this account?"
                            onConfirm={() => console.log('Lock')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="text" icon={<CiLock size={20} />} style={{ color: 'red' }} />
                        </Popconfirm>
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

    const body = (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <img src="/user.svg" alt="Profile picture" className="rounded-full size-[136px]" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">Asaduijaman</h3>
                            <p className="text-green-500">Netherlands</p>
                        </div>
                        <CiLock size={30} className="text-green-500 text-xl cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { label: 'Name', value: 'Asaduijaman Mahfuz' },
                    { label: 'Email', value: 'Asaduijaman101@bd.com' },
                    { label: 'Contact Number', value: '+0999999999999999' },
                    { label: 'Gender', value: 'Male' },
                    { label: 'Death of birth', value: '12 nov, 2024' },
                    { label: 'Address', value: '4517 Washington Ave. Manchester, Kentucky 39495' },
                    { label: 'Postcode', value: '100' },
                    { label: 'City/town', value: 'Amsterdam' },
                ].map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                        <div className="text-gray-600">{item.label}</div>
                        <div className="col-span-2">
                            {item.label === 'Name' ||
                            item.label === 'Email' ||
                            item.label === 'Address' ||
                            item.label === 'Postcode' ||
                            item.label === 'City/town'
                                ? `: ${item.value}`
                                : item.value}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div className="flex justify-end">
                    <Button type="primary" icon={<FaDownload />} size="large">
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
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
            <Modal title="Users profile Detail" open={openModal} setOpen={setOpenModal} body={body} width={700} />
        </div>
    );
};

export default UserDetails;
