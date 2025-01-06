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
                    <Input placeholder="Search" prefix={<CiSearch size={20} />} style={{ width: 200, height: 40 }} />
                </Space>
            </div>

            <Table dataSource={userData} columns={columns} pagination={false} />
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
                title="Message Modal"
                visible={openMessageModal}
                onCancel={() => setOpenMessageModal(false)}
                footer={null}
            >
                {/* Add message modal content here */}
            </Modal>
        </div>
    );
};

export default UserDetails;
