import React from 'react';
import { Table, Button, Space, Tooltip, Popconfirm } from 'antd';
import { BsEye } from 'react-icons/bs';
import { CiLock, CiUnlock } from 'react-icons/ci';
import type { ColumnsType } from 'antd/es/table';
import { UserDataType } from '../types';

interface Props {
    data: UserDataType[];
    onViewDetails: () => void;
}

const UserTable: React.FC<Props> = ({ data, onViewDetails }) => {
    const columns: ColumnsType<UserDataType> = [
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
            render: (_, _record, index: number) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Button onClick={onViewDetails} type="text" icon={<BsEye size={20} />} />
                    </Tooltip>
                    {index % 2 === 0 ? (
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
                    ) : (
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
                    )}
                </Space>
            ),
        },
    ];

    return (
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
    );
};

export default UserTable;
