import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';
import moment from 'moment';
import { useRejectConsultationMutation } from '../../../../redux/apiSlices/DoctorConsultationSlice';
import toast from 'react-hot-toast';

const RejectPrescriptionPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);

  const [rejectConsultation] = useRejectConsultationMutation();

  if (isFetching) return <div>Loading...</div>;

  const consultationData = getConsultationById?.data;
  // console.log(consultationData);

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
        <p className="text-[16px] ">Reg No. #{consultationData?._id}</p>
        <p className="text-[16px]">{consultationData?.subCategory?.name}</p>
        <p className="text-[16px]">{moment(consultationData?.createdAt).format('LL')}</p>
      </div>
      <div className="text-center ">
        <p className="text-lg  font-normal text-[#0A2369] pb-1">Consultation Report</p>
        <p className="text-sm text-gray">Appointment date: {moment(consultationData?.createdAt).format('LL')}</p>
      </div>
      <div className="text-center ">
        <p className="text-lg font-normal text-[#0A2369] pb-1">Price</p>
        <p className="text-sm text-gray">€ 25.00</p>
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

  const rejection = (
    <div>
      <h1 className="text-2xl text-red-600 font-bold">Reject Prescription</h1>
    </div>
  );

  const handleRejectPrescription = async () => {
    const opinion = (document.querySelector('textarea[name="opinion"]') as HTMLTextAreaElement).value;

    try {
      const response = await rejectConsultation({ id, data: { opinion } }).unwrap();
      // console.log(response);
      if (response?.success) {
        toast.success('Prescription rejected successfully!');
        navigate('/doctor-patient-services-list');
      } else {
        toast.error(response?.message || 'Failed to reject prescription.');
      }
    } catch (error) {
      // console.log(error);
      toast.error('Failed to reject prescription.');
    }
  };

  return (
    <div>
      <div className=" bg-white p-3">
        {topSection}
        {detailsSection}
        {patientAndConsultantSection}
      </div>
      <div className="bg-white p-3 mt-3">
        <h1 className="border-b p-5 pb-4">{rejection}</h1>
        <div className="p-5">
          <h1 className="text-xl text-gray">Expert Opinion</h1>
          <textarea
            name="opinion"
            className="w-full h-[200px] border border-slate-300 p-5 my-5 rounded-lg"
            placeholder="Write your opinion here..."
            id=""
          ></textarea>
        </div>
        <div className="text-center">
          <button
            onClick={() => handleRejectPrescription()}
            className="text-xl font-bold bg-red-600 text-white py-2 px-32 rounded-lg"
          >
            Upload Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectPrescriptionPage;
