import React from 'react';
import { Button } from 'antd';
import { CiLock } from 'react-icons/ci';
import { FaDownload } from 'react-icons/fa';
import Modal from '../../../../components/shared/Modal';
import { UserDetailsProps } from '../types/types';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    userDetails: UserDetailsProps;
}

const UserDetailsModal: React.FC<Props> = ({ open, setOpen, userDetails }) => {
    const userDetailsContent = (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <img src="/user.svg" alt="Profile picture" className="rounded-full size-[136px]" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">{userDetails.name}</h3>
                            <p className="text-green-500">{userDetails.country}</p>
                        </div>
                        <CiLock size={30} className="text-green-500 text-xl cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {Object.entries(userDetails).map(([key, value], index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                        <div className="text-gray-600">{key}</div>
                        <div className="col-span-2">: {value}</div>
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

    return <Modal title="Users profile Details" open={open} setOpen={setOpen} body={userDetailsContent} width={700} />;
};

export default UserDetailsModal;
