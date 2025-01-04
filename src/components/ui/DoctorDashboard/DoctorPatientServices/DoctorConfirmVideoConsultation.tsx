import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import { useState } from 'react';

const DoctorConfirmVideoConsultation = () => {
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
                <p className="text-sm text-gray">Appointment date: 22 nov, 2024 . 08:30am</p>
            </div>
            <div className="text-center ">
                <p className="text-lg font-normal text-[#0A2369] pb-1">Price</p>
                <p className="text-sm text-gray">220$</p>
            </div>
            <div></div>
        </div>
    );

    const patientAndConsultantSection = (
        <div className="">
            <div className="bg-[#E8EEFE] p-6 text-gray ">
                <h1 className="text-xl font-semibold text-[#222222] my-3">Patient:</h1>
                <div className="flex w-full h-full pb-5 justify-start gap-14 items-center">
                    <div className="flex w-[30%] items-center space-x-4">
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
                    <div className="mt-4 w-[70%] text-sm text-gray-800 space-y-4">
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Name</span> : Asadujjaman Mahfuz
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Email</span> : Asadujjaman101@bd.com
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Contact Number</span> : +0999999999999999
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Gender</span> : Male
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Date of birth</span> : 12 Nov, 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const [selectedDateTime, setSelectedDateTime] = useState<any>(null);

    const handleScheduleMeeting = () => {
        if (!selectedDateTime) {
            return;
        }
        // Handle scheduling logic here
        console.log('Meeting scheduled for:', selectedDateTime.format('YYYY-MM-DD HH:mm'));
    };

    const confirmMeetingSchedule = (
        <div>
            <h1 className="text-2xl border-b pb-5 border-slate-300 font-semibold">Confirm Meeting Schedule</h1>
            <div className="mt-8 space-y-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-700 font-medium">Time & Date</label>
                    <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        className="w-[35%] py-4"
                        onChange={(dateTime) => setSelectedDateTime(dateTime)}
                    />
                </div>
                <button
                    onClick={handleScheduleMeeting}
                    className="w-[35%] bg-[#0a2369] text-white py-4 font-semibold rounded-md hover:bg-blue-700 transition-colors"
                >
                    Schedule Meeting
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <div className=" bg-white p-3">
                {topSection}
                {detailsSection}
                {patientAndConsultantSection}
            </div>
            <div className="bg-white p-3 mt-3 pb-10">{confirmMeetingSchedule}</div>
        </div>
    );
};

export default DoctorConfirmVideoConsultation;
