import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';

const DigitalPrescriptionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => {
    navigate(-1);
  };

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);

  if (isFetching) return <div>Loading...</div>;

  const consultationData = getConsultationById?.data;

  const topSection = (
    <div className="flex items-center justify-between px-4 py-2 bg-white my-2">
      {/* Back Button and Title */}
      <div className="flex items-center space-x-2">
        <BsArrowLeft className="text-lg text-gray-700 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-medium text-gray-800">Digital Prescription Details</h1>
      </div>

      {/* Reported Button */}
      <Button className={`text-white py-5 ${consultationData?.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
        {consultationData?.status}
      </Button>
    </div>
  );

  const detailsSection = (
    <div className="bg-[#E7FBF2] p-6  flex justify-between items-center mb-4">
      <div className="text-gray0-80">
        <p className="text-lg font-semibold">ID: #{consultationData?._id}</p>
        <p className="text-lg">{consultationData?.subCategory?.name}</p>
        <p className="text-lg">{new Date(consultationData?.createdAt).toDateString()}</p>
      </div>
      <div className="text-center ">
        <p className="text-lg font-semibold">Consultation Report</p>
        <p className="text-sm text-secondary">
          Appointment date: {new Date(consultationData?.createdAt).toDateString()}
        </p>
      </div>
      <div></div>
    </div>
  );

  const patientAndConsultantSection = (
    <div className="">
      <div className="bg-[#E8EEFE] p-6 text-gray ">
        <h1 className="text-xl font-semibold text-[#222222] my-3">Patient:</h1>
        <div className="flex h-full pb-5 gap-40 items-center">
          <div className="flex items-center space-x-4">
            {/* Profile Picture */}

            <img
              src={
                consultationData?.userId?.profile.startsWith('http')
                  ? consultationData?.userId?.profile
                  : `${import.meta.env.VITE_BASE_URL}${consultationData?.userId?.profile}`
              }
              alt="Patient"
              className="object-cover border size-32 rounded-full"
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
          <div className="mt-4 text-sm text-gray-800 space-y-4">
            <p>
              <span className="font-semibold">Name:</span> {consultationData?.userId?.firstName}{' '}
              {consultationData?.userId?.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {consultationData?.userId?.email}
            </p>
            <p>
              <span className="font-semibold">Contact Number:</span> {consultationData?.userId?.contact}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {consultationData?.userId?.gender}
            </p>
            <p>
              <span className="font-semibold">Death of birth:</span> {consultationData?.userId?.dateOfBirth}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const consultationDetailsSection = (
    <div className=" p-4 text-gray">
      {/* Consultation Details */}
      <div className="flex justify-between items-center pb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Consultation for {consultationData?.subCategory?.name}
          </h3>
          <p className="text-sm text-gray-500">Medical questionnaire, doctor's advice and prescription.</p>
        </div>
        <div className="text-[#0A2369] font-semibold text-lg">$25.00</div>
      </div>

      {/* Discount and Total */}
      <div className="mt-4">
        <div className="flex justify-end gap-20">
          <span>Discount -</span>
          <span>$0.00</span>
        </div>
        <hr className="h-0.5 bg-gray" />
        <div className="flex justify-end gap-20 text-lg font-semibold text-gray-900 mt-2">
          <span>Total -</span>
          <span className="text-[#0A2369]">$25.00</span>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 text-right">
        <Button style={{ height: 42 }} type="primary" icon={<FaDownload size={20} />}>
          Download
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-3">
      {topSection}
      {detailsSection}
      {patientAndConsultantSection}
      {consultationDetailsSection}
    </div>
  );
};

export default DigitalPrescriptionDetails;
