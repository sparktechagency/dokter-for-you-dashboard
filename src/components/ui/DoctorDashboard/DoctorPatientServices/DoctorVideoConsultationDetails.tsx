import { Modal } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PatientInfoAndQandASection from '../../../shared/PatientInfoAndQandASection';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';
import { useSetUpVideoCallLinkMutation } from '../../../../redux/apiSlices/DoctorConsultationSlice';
import toast from 'react-hot-toast';
import moment from 'moment';

const DoctorVideoConsultationDetails = () => {
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isMakeOrderModalVisible, setIsMakeOrderModalVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);
  const [setVideoLink] = useSetUpVideoCallLinkMutation();

  const [meetingLink, setMeetingLink] = useState('');

  if (isFetching) return <div>Loading...</div>;

  const consultation = getConsultationById?.data;

  // console.log('Video Consultation detailsPage', consultation);

  const handleBack = () => {
    navigate(-1);
  };

  const showRejectModal = () => {
    setIsRejectModalVisible(true);
  };

  // const showPrescriptionRejectModal = () => {
  //   setIsRejectModalVisible(true);
  // };

  const handleRejectOk = () => {
    setIsRejectModalVisible(false);
    navigate(`/doctor-patient-services/details/${id}/reject-prescription`);
  };

  const handleRejectCancel = () => {
    setIsRejectModalVisible(false);
  };

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const showMakeOrderModal = () => {
    setIsMakeOrderModalVisible(true);
  };

  const handleMakeOrderOk = () => {
    setIsMakeOrderModalVisible(false);
    navigate(`/doctor-patient-services/details/${id}/confirm-prescription`);
  };

  const handleMakeOrderCancel = () => {
    setIsMakeOrderModalVisible(false);
  };

  const handleConfirmOk = () => {
    setIsConfirmModalVisible(false);
    navigate(`/doctor-video-consultation/details/${id}/confirm-prescription`);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleSetUpVideoCallLink = async () => {
    if (!meetingLink) {
      toast.error('Please enter a meeting link.');
      return;
    }

    try {
      const response = await setVideoLink({ data: { link: meetingLink }, id }).unwrap();
      if (response.success) {
        toast.success('Meeting link set up successfully.');
      } else {
        toast.error('Failed to set up meeting link.');
      }
    } catch (error) {
      toast.error('Error setting up meeting link.');
    }
  };

  const prescription = (
    <div className="flex items-center justify-between py-10 px-5">
      <h1 className="text-blue-700 font-bold w-[30%]">Please give your prescription for your Patient.</h1>
      <div className="space-x-5">
        <button onClick={showRejectModal} className="py-3 px-6 bg-red-600 text-white font-semibold">
          Reject Video Consultation
        </button>
        <button onClick={showConfirmModal} className="py-3 px-6 bg-blue-950 text-white font-semibold">
          Confirm Video Consultation
        </button>
      </div>
    </div>
  );
  const afterVideoConsultationPrescription = (
    <div className="flex items-center justify-between py-10 px-5">
      <h1 className="text-blue-700 font-bold w-[30%]">Please give your prescription for your Patient.</h1>
      <div className="space-x-5">
        {/* <button onClick={showPrescriptionRejectModal} className="py-3 px-6 bg-red-600 text-white font-semibold">
          Reject Prescription
        </button> */}
        <button onClick={showMakeOrderModal} className="py-3 px-6 bg-blue-950 text-white font-semibold">
          Make Order
        </button>
      </div>
    </div>
  );

  const placeMeetingLink = (
    <div>
      <h1 className="text-xl font-bold">Please Give Meeting Link</h1>
      <h1 className="text-lg mt-5 font-bold">Date: {moment(consultation?.scheduledDate).format('LLL')}</h1>
      {consultation?.link ? (
        <p className="text-lg ">
          Video Consultation Link:{' '}
          <a
            className="text-blue-600 text-xl underline"
            href={consultation?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {consultation?.link}
          </a>
        </p>
      ) : (
        <p className="text-red-600 text-xl">No link provided Yet.</p>
      )}
      <input
        type="text"
        name="link"
        placeholder="Upload a Meeting Link"
        className={`border-2 w-[60%] py-4 border-slate-400 my-5 p-2 rounded-md`}
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
      />
      <button
        onClick={() => handleSetUpVideoCallLink()}
        className=" px-6 py-4 rounded-lg ms-5 bg-blue-950 text-white font-semibold"
      >
        Submit
      </button>
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-3">
        <button onClick={handleBack}>
          <BsArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-2xl font-medium">Patient Details</h1>
      </div>

      <div className="my-5">
        <PatientInfoAndQandASection id={id ?? ''} />
      </div>
      {!consultation?.scheduledDate && <div className="bg-white p-3">{prescription}</div>}
      {consultation?.scheduledDate && <div className="bg-white p-3 mt-3">{placeMeetingLink}</div>}
      {consultation?.scheduledDate && <div className="bg-white p-3 mt-3">{afterVideoConsultationPrescription}</div>}

      <Modal
        title="Reject Video Consultation"
        open={isRejectModalVisible}
        onOk={handleRejectOk}
        onCancel={handleRejectCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to reject this Video Consultation?</p>
      </Modal>

      <Modal
        title="Confirm Video Consultation"
        open={isConfirmModalVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to confirm this Video Consultation?</p>
      </Modal>
      <Modal
        title="Make Order"
        open={isMakeOrderModalVisible}
        onOk={handleMakeOrderOk}
        onCancel={handleMakeOrderCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to make order</p>
      </Modal>
    </>
  );
};

export default DoctorVideoConsultationDetails;
