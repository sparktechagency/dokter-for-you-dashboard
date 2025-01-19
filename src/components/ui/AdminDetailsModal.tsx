import { Button, Modal } from 'antd';
import { FaDownload } from 'react-icons/fa';
import { doctorDetails } from '../../pages/dashboard/user/types/types';

const AdminDetailsModal = ({
  open,
  setOpen,
  viewShippingProfile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  viewShippingProfile: any;
}) => {
  console.log(viewShippingProfile);

  const userDetails: doctorDetails = {
    name: viewShippingProfile?.firstName + ' ' + viewShippingProfile?.lastName,
    email: viewShippingProfile?.email,
    type: viewShippingProfile?.role,
    contactNumber: viewShippingProfile?.contact,
    gender: viewShippingProfile?.gender,
    address: viewShippingProfile?.location,
  };

  return (
    <Modal
      maskClosable={false}
      centered
      title={<p className="text-[24px] text-[#333333]"> Admin profile Details </p>}
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={viewShippingProfile?.profile} alt="Profile picture" className="rounded-full size-[136px]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {viewShippingProfile?.firstName} {viewShippingProfile?.lastName}
                </h3>
                <p className="text-green-500"> {viewShippingProfile?.role}</p>
              </div>
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
      </div>
    </Modal>
  );
};

export default AdminDetailsModal;
