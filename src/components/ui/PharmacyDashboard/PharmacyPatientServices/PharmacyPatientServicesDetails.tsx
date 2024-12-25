import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const PharmacyPatientServicesDetails = () => { 
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const topSection = (
        <div className="flex items-center justify-between px-4 py-2 bg-white my-2">
            {/* Back Button and Title */}
            <div className="flex items-center space-x-2">
                <BsArrowLeft className="text-lg text-gray-700 cursor-pointer" onClick={handleBack} />
                <h1 className="text-lg font-medium text-gray-800">User Services Details</h1>
            </div>

            {/* Reported Button */}
            <Button
                type="primary"
                style={{
                    height: 42,
                    backgroundColor: '#1854F9',
                }}
            >
                Loading...
            </Button>
        </div>
    );

    const detailsSection = (
        <div className="bg-[#E7FBF2] p-6  flex justify-between items-center mb-4">
            <div className="text-gray-600  flex flex-col gap-1  ">
                <p className="text-[16px] ">S No. #2164564615</p>
                <p className="text-[16px]">Man problem/Erectile dysfunction</p>
                <p className="text-[16px]">1/1/2025, 5:30 pm</p> 
              
            </div>
            <div className="text-center ">
                <p className="text-lg  font-normal text-[#0A2369] pb-1">Consultation Report</p>
                <p className="text-sm text-secondary">Appointment date: 22 nov, 2024 . 08:30am</p>
            </div>
            <div className="text-center ">
                <p className="text-lg font-normal text-[#0A2369] pb-1">Price</p>
                <p className="text-sm text-secondary">220$</p>
            </div>
            <div>
      
            </div>
        </div>
    );

    const patientAndConsultantSection = (
        <div className="">
            <div className="bg-[#E8EEFE] p-6 text-gray ">
                <h1 className="text-xl font-semibold text-[#222222] my-3">Patient:</h1>
                <div className="flex h-full pb-5 justify-start gap-14 items-center">
                    <div className="flex items-center space-x-4">
                        {/* Profile Picture */}

                        <img
                            src="/user.svg" // Replace with the real image URL
                            alt="Patient"
                            className="object-cover size-32 rounded-full"
                        />

                        {/* Patient Info */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#0A2369]">Asadujjaman</h2>
                            <p className="text-lg text-[#11D279]">Netherlands</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="mt-4 text-sm text-gray-800 space-y-4">
                        <p>
                            <span className="font-semibold">Name:</span> Asadujjaman Mahfuz
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span> Asadujjaman101@bd.com
                        </p>
                        <p>
                            <span className="font-semibold">Contact Number:</span> +0999999999999999
                        </p>
                        <p>
                            <span className="font-semibold">Gender:</span> Male
                        </p>
                        <p>
                            <span className="font-semibold">Death of birth:</span> 12 Nov, 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className=' bg-white p-3'>
              {topSection}
            {detailsSection}
            {patientAndConsultantSection}
        </div>
    );
};

export default PharmacyPatientServicesDetails;