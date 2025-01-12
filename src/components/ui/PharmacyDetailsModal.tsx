import { Button, Modal } from 'antd';
import { FaDownload } from 'react-icons/fa';
import { pharmacy } from '../../pages/dashboard/user/types/types';

const PharmacyDetailsModal = ({
  open,
  setOpen,
  viewShippingProfile,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  viewShippingProfile: any;
}) => {
  console.log('hellllloooooo', viewShippingProfile);
  const userDetails: pharmacy = {
    name: viewShippingProfile?.pharmecyName,
    email: viewShippingProfile?.email,
    contactNumber: viewShippingProfile?.contact,
    address: viewShippingProfile?.location,
  };
  return (
    <Modal
      maskClosable={false}
      centered
      title={<p className="text-[24px] text-[#333333]"> Pharmacy Details </p>}
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
    >
      <div className="p-6 space-y-6">
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
    </Modal>
  );
};

export default PharmacyDetailsModal;
