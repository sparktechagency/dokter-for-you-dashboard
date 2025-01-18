import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);

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
      <Button className={`${consultationData?.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'}`} type="primary">
        {consultationData?.status}
      </Button>
    </div>
  );

  const detailsSection = (
    <div className="bg-[#E7FBF2] p-6  flex justify-between items-center mb-4">
      <div>
        <p className="text-lg font-semibold text-gray-800"># {consultationData?._id || 'N/A'}</p>
        <p className="text-md text-gray-600">{consultationData?.subCategory?.name || 'N/A'}</p>
        <p className="text-md text-gray-600">{new Date(consultationData?.createdAt || 'N/A').toLocaleString()}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-800">Consultation Report</p>
        <p className="text-sm text-gray-500">Prescription is Complete</p>
      </div>
      <div>
        <Button
          href={`${import.meta.env.VITE_BASE_URL}api/v1/pdf/generate-pdf/${consultationData?._id}`}
          type="primary"
          icon={<FaDownload />}
          size="large"
        >
          Download
        </Button>
      </div>
    </div>
  );

  const patientAndConsultantSection = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-[#E8EEFE] p-6 text-gray ">
        <h1 className="text-xl font-semibold text-[#222222] my-3">Patient:</h1>
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img
            src={
              consultationData?.userId?.profile?.startsWith('http')
                ? consultationData?.userId?.profile
                : `${import.meta.env.VITE_BASE_URL}${consultationData?.userId?.profile}`
            }
            alt="Patient"
            className="object-cover border size-32 rounded-full"
          />

          {/* Patient Info */}
          <div>
            <h2 className="text-xl font-semibold text-[#0A2369]">
              {consultationData?.userId?.firstName} {consultationData?.userId?.lastName || 'Unknown'}
            </h2>
            <p className="text-lg text-[#11D279]">{consultationData?.userId?.country || 'Unknown'}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-4 text-sm text-gray-800 space-y-4">
          <p>
            <span className="font-semibold">Name:</span> {consultationData?.userId?.firstName}{' '}
            {consultationData?.userId?.lastName || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {consultationData?.userId?.email || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Contact Number:</span> {consultationData?.userId?.contact || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {consultationData?.userId?.gender || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Death of birth:</span> {consultationData?.userId?.dateOfBirth || 'Unknown'}
          </p>
        </div>
      </div>
      <div className="bg-[#E8EEFE] p-6 text-gray ">
        <h1 className="text-xl font-semibold text-[#222222] my-3">Consultant:</h1>
        <div className="flex items-center space-x-4">
          <img
            src={
              consultationData?.doctorId?.profile?.startsWith('http')
                ? consultationData?.doctorId?.profile
                : `${import.meta.env.VITE_BASE_URL}${consultationData?.doctorId?.profile}`
            }
            alt="Doctor"
            className="object-cover border size-32 rounded-full"
          />

          {/* Patient Info */}
          <div>
            <h2 className="text-xl font-semibold text-[#0A2369]">
              {consultationData?.doctorId?.firstName} {consultationData?.doctorId?.lastName || 'Unknown'}
            </h2>
            <p className="text-lg text-[#11D279]">{consultationData?.doctorId?.designation || 'Unknown'}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-4 text-sm text-gray-800 space-y-4">
          <p>
            <span className="font-semibold">Name:</span> {consultationData?.doctorId?.firstName}{' '}
            {consultationData?.doctorId?.lastName || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {consultationData?.doctorId?.email || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Contact Number:</span> {consultationData?.doctorId?.contact || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {consultationData?.doctorId?.gender || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );

  const consultationDetailsSection = (
    <div className=" p-4 text-gray">
      {/* Consultation Details */}
      <div className="flex justify-between items-center pb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Consultation for man's weight problem</h3>
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
        <Button
          href={`${import.meta.env.VITE_BASE_URL}api/v1/pdf/generate-pdf/${consultationData?._id}`}
          style={{ height: 42 }}
          type="primary"
          icon={<FaDownload size={20} />}
        >
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

export default PatientDetailsPage;
