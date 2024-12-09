import React, { useState } from 'react';
import { Button, Input, Space, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { CiLock, CiSearch, CiUnlock } from 'react-icons/ci';

import UserTable from './sections/UserTable';
import UserDetailsModal from './sections/UserDetailsModal';
import MessageModal from './sections/MessageModal';
import { mockUserData } from './mockData';
import { UserDetailsProps } from './types';

const UserDetails: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openMessageModal, setOpenMessageModal] = useState(false);

    const mockUserDetails: UserDetailsProps = {
        name: 'Asaduijaman Mahfuz',
        email: 'Asaduijaman101@bd.com',
        contactNumber: '+0999999999999999',
        gender: 'Male',
        dateOfBirth: '12 nov, 2024',
        address: '4517 Washington Ave. Manchester, Kentucky 39495',
        postcode: '100',
        city: 'Amsterdam',
        country: 'Netherlands',
    };

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

                    <Button
                        onClick={() => setOpenMessageModal(true)}
                        style={{ height: 40 }}
                        icon={<SendOutlined />}
                        type="primary"
                    >
                        Send Message
                    </Button>
                    <Input placeholder="Search" prefix={<CiSearch size={20} />} style={{ width: 200, height: 40 }} />
                </Space>
            </div>

            <UserTable data={mockUserData} onViewDetails={() => setOpenModal(true)} />

            <UserDetailsModal open={openModal} setOpen={setOpenModal} userDetails={mockUserDetails} />

            <MessageModal open={openMessageModal} setOpen={setOpenMessageModal} />
        </div>
    );
};

export default UserDetails;
