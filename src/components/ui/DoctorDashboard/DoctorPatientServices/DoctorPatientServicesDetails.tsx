import { Modal } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PatientInfoAndQandASection from '../../../shared/PatientInfoAndQandASection';

const DoctorPatientServicesDetails = () => {
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const showRejectModal = () => {
    setIsRejectModalVisible(true);
  };

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

  const handleConfirmOk = () => {
    setIsConfirmModalVisible(false);
    navigate(`/doctor-patient-services/details/${153543}/confirm-prescription`);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const prescription = (
    <div className="flex items-center justify-between py-10 px-5">
      <h1 className="text-blue-700 font-bold w-[30%]">Please give your prescription for your Patient.</h1>
      <div className="space-x-5">
        <button onClick={showRejectModal} className="py-3 px-6 bg-red-600 text-white font-semibold">
          Reject Prescription
        </button>
        <button onClick={showConfirmModal} className="py-3 px-6 bg-blue-950 text-white font-semibold">
          Confirm Prescription
        </button>
      </div>
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
        <PatientInfoAndQandASection id={id as string} />
      </div>
      <div className="bg-white p-3">{prescription}</div>

      <Modal
        title="Reject Prescription"
        open={isRejectModalVisible}
        onOk={handleRejectOk}
        onCancel={handleRejectCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to reject this prescription?</p>
      </Modal>

      <Modal
        title="Confirm Prescription"
        open={isConfirmModalVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to confirm this prescription?</p>
      </Modal>
    </>
  );
};

export default DoctorPatientServicesDetails;
