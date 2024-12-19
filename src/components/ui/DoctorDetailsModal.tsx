import { Button, Modal } from "antd"
import { CiLock } from "react-icons/ci";
import { FaDownload } from "react-icons/fa";
import { doctorDetails } from "../../pages/dashboard/user/types/types";

  const userDetails: doctorDetails = {
        name: 'Asaduijaman Mahfuz',
        email: 'Asaduijaman101@bd.com',
        contactNumber: '+0999999999999999',
        gender: 'Male',
        address: '4517 Washington Ave. Manchester, Kentucky 39495',
        type: 'Urologist', 
    }; 

const DoctorDetailsModal = ({open , setOpen , viewShippingProfile}:{open:boolean , setOpen:(open:boolean)=>void , viewShippingProfile:any}) => { 
    console.log(viewShippingProfile);
    return (
        <Modal
            maskClosable={false}
            centered
            title={<p className="text-[24px] text-[#333333]"> Doctor profile Detail </p>}
            footer={false}
            open={open}
            onCancel={()=>setOpen(false)}
            width={ 700}
        >  
<div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <img src="/user.svg" alt="Profile picture" className="rounded-full size-[136px]" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">{userDetails.name}</h3>
                            <p className="text-green-500">{userDetails?.type}</p>
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

        </Modal> 
    );
};

export default DoctorDetailsModal;