import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from 'antd';
import { useState } from 'react';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';
import moment from 'moment';
import { useSetScheduleVideoCallMutation } from '../../../../redux/apiSlices/DoctorConsultationSlice';
import toast from 'react-hot-toast';

const DoctorConfirmVideoConsultation = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<any>(null);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);
  const [setScheduleVideoCall] = useSetScheduleVideoCallMutation();

  if (isFetching) return <div>Loading...</div>;

  const consultationData = getConsultationById?.data;
  console.log(consultationData);

  const topSection = (
    <div className="flex items-center justify-between px-4 py-2 bg-white my-2">
      {/* Back Button and Title */}
      <div className="flex items-center space-x-2">
        <BsArrowLeft className="text-lg text-gray-700 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-medium text-gray-800">User Services Details</h1>
      </div>

      {/* Reported Button */}
      <Button
        className={`text-white py-5 ${
          consultationData?.status === 'pending'
            ? 'bg-yellow-500'
            : consultationData?.status === 'rejected'
            ? 'bg-red-500'
            : 'bg-blue-500'
        }`}
      >
        {consultationData?.status}
      </Button>
    </div>
  );

  const detailsSection = (
    <div className="bg-[#E7FBF2] p-6  flex justify-between items-center mb-4">
      <div className="text-gray-600  flex flex-col gap-1  ">
        <p className="text-[16px] ">Reg No. {consultationData?._id}</p>
        <p className="text-[16px]">{consultationData?.subCategory?.name}</p>
        <p className="text-[16px]">{moment(consultationData?.createdAt).format('LL')}</p>
      </div>
      <div className="text-center ">
        <p className="text-lg  font-normal text-[#0A2369] pb-1">Consultation Report</p>
        <p className="text-sm text-gray">Appointment date: {moment(consultationData?.createdAt).format('LL')}</p>
      </div>
      <div className="text-center ">
        <p className="text-lg font-normal text-[#0A2369] pb-1">Price</p>
        <p className="text-sm text-gray">€ 25</p>
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
              src={
                consultationData?.userId?.profile.startsWith('http')
                  ? consultationData?.userId?.profile
                  : `${import.meta.env.VITE_BASE_URL}${consultationData?.userId?.profile}`
              }
              alt="Patient"
              className="object-cover size-32 rounded-full"
            />

            {/* Patient Info */}
            <div>
              <h2 className="text-xl font-semibold text-[#0A2369]">
                {consultationData?.userId?.firstName} {consultationData?.userId?.lastName}
              </h2>
              <p className="text-lg text-[#11D279]">{consultationData?.userId?.country}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-4 w-[70%] text-sm text-gray-800 space-y-4">
            <p className="flex">
              <span className="font-semibold w-[20%]">Name</span> : {consultationData?.userId?.firstName}{' '}
              {consultationData?.userId?.lastName}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Email</span> : {consultationData?.userId?.email}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Contact Number</span> : {consultationData?.userId?.contact}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Gender</span> : {consultationData?.userId?.gender}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Date of birth</span> : {consultationData?.userId?.dateOfBirth}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const handleScheduleMeeting = async () => {
    if (!selectedDateTime) {
      return;
    }

    const formattedDate = selectedDateTime.toISOString();
    const data = { scheduledDate: formattedDate };

    try {
      const response = await setScheduleVideoCall({ data, id }).unwrap();
      if (response.success) {
        toast.success('Meeting scheduled successfully.');
        navigate(`doctor-video-consultation/details/${id}`);
      } else {
        toast.error('Failed to schedule meeting.');
      }
    } catch (error) {
      toast.error('Failed to schedule meeting.');
    }
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
