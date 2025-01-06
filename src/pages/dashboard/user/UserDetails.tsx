import React, { useState } from 'react';
import { Button, Space, Tooltip, Table, Modal, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { BsEye } from 'react-icons/bs';
import { CiLock, CiSearch, CiUnlock } from 'react-icons/ci';
import randomProfile from '../../../assets/randomProfile2.jpg';
import { UserDataType } from './types/types';
import { useGetUserQuery } from '../../../redux/apiSlices/userSlice';

const UserDetails: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openMessageModal, setOpenMessageModal] = useState(false);
    const [modalData, setModalData] = useState<UserDataType | null>(null);
    console.log(modalData);
    const { data: users, isFetching } = useGetUserQuery(undefined);

    if (isFetching) return <div>Loading...</div>;
    const userData = users?.data;

    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filtered user data based on search query
    const filteredUserData = userData.filter(
        (user: UserDataType) =>
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.contact.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const columns = [
        { title: 'Serial No', dataIndex: 'sno', key: 'sno', render: (_: any, __: any, index: number) => index + 1 },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'userName',
            render: (_: any, record: UserDataType) => `${record?.firstName} ${record?.lastName}`,
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'contact', key: 'contact' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: UserDataType) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Button
                            onClick={() => {
                                setOpenModal(true);
                                setModalData(record);
                            }}
                            type="text"
                            icon={<BsEye size={20} />}
                        />
                    </Tooltip>
                    <Tooltip title="Lock">
                        <Button
                            onClick={() => console.log('Locking user:', record.key)}
                            type="text"
                            icon={<CiLock size={20} />}
                        />
                    </Tooltip>
                </Space>
            ),
        },
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

                    <Button
                        onClick={() => setOpenMessageModal(true)}
                        style={{ height: 40 }}
                        icon={<SendOutlined />}
                        type="primary"
                    >
                        Send Message
                    </Button>
                    <Input
                        placeholder="Search"
                        prefix={<CiSearch size={20} />}
                        style={{ width: 200, height: 40 }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Space>
            </div>

            <Table dataSource={filteredUserData} columns={columns} pagination={false} />
            {/* //user details modal */}
            <Modal title="User Details" visible={openModal} onCancel={() => setOpenModal(false)} footer={null}>
                {modalData && (
                    <>
                        <div className="flex gap-4 items-center my-10">
                            <img
                                className="w-32 h-32 border rounded-full"
                                src={
                                    modalData?.profile
                                        ? `${import.meta.env.VITE_BASE_URL}${modalData?.profile}`
                                        : randomProfile
                                }
                                alt=""
                            />
                            <div>
                                <h1 className="text-2xl text-[#0A2369] font-semibold">
                                    {modalData?.firstName} {modalData?.lastName}
                                </h1>
                                <p className="text-gray-500 text-xl text-[#11D279]">{modalData?.country}</p>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-xl">
                                <span className="font-semibold">Name:</span> {modalData?.firstName}{' '}
                                {modalData?.lastName}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">Email:</span> {modalData?.email}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">Contact Number:</span> {modalData?.contact}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">Gender:</span> {modalData?.gender}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">Date of Birth:</span> {modalData?.dateOfBirth}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">Address:</span> {modalData?.location}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">Postcode:</span> {modalData?.postcode}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">City:</span> {modalData?.city}
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">Country:</span> {modalData?.country}
                            </p>
                        </div>
                    </>
                )}
            </Modal>
            <Modal
                title="Type your Message"
                open={openMessageModal}
                onCancel={() => setOpenMessageModal(false)}
                footer={null}
            >
                <div className="w-full">
                    <textarea
                        rows={4}
                        className="border border-slate-400 rounded-2xl p-5 w-full"
                        placeholder="Message"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <Button type="primary" size="large">
                        Send Now
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default UserDetails;
