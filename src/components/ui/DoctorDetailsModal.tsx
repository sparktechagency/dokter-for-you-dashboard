import { Modal } from 'antd';

import { doctorDetails } from '../../pages/dashboard/user/types/types';

const DoctorDetailsModal = ({
  open,
  setOpen,
  viewShippingProfile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  viewShippingProfile: any;
}) => {
  const userDetails: doctorDetails = {
    name: viewShippingProfile?.firstName + ' ' + viewShippingProfile?.lastName,
    email: viewShippingProfile?.email,
    contactNumber: viewShippingProfile?.contact,
    gender: viewShippingProfile?.gender,
    address: viewShippingProfile?.location,
    // type: viewShippingProfile?.subCategory?.name,
  };

  // console.log('in profile modal', viewShippingProfile);
  return (
    <Modal
      maskClosable={false}
      centered
      title={<p className="text-[24px] text-[#333333]"> Doctor profile Detail </p>}
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={
                viewShippingProfile?.profile.startsWith('http')
                  ? viewShippingProfile?.profile
                  : `${import.meta.env.VITE_BASE_URL}${viewShippingProfile?.profile}`
              }
              alt="Profile picture"
              className="rounded-full border w-[120px] h-[120px] object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">
                  {viewShippingProfile?.firstName} {viewShippingProfile?.lastName}
                </h3>
                {/* <p className="text-green-500">Specialized in {viewShippingProfile?.subCategory?.name}</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(userDetails).map(([key, value], index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div className="text-gray-600 text-xl">{key}</div>
              <div className="col-span-2 text-xl">: {value}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default DoctorDetailsModal;
