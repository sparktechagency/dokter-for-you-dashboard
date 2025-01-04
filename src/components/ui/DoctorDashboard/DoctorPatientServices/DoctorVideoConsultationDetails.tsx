import { Modal } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PatientInfoAndQandASection from '../../../shared/PatientInfoAndQandASection';

const DoctorVideoConsultationDetails = () => {
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isMakeOrderModalVisible, setIsMakeOrderModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const showRejectModal = () => {
        setIsRejectModalVisible(true);
    };

    const showPrescriptionRejectModal = () => {
        setIsRejectModalVisible(true);
    };

    const handleRejectOk = () => {
        setIsRejectModalVisible(false);
        navigate(`/doctor-patient-services/details/${153543}/reject-prescription`);
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
        navigate(`/doctor-patient-services/details/${153543}/confirm-prescription`);
    };

    const handleMakeOrderCancel = () => {
        setIsMakeOrderModalVisible(false);
    };

    const handleConfirmOk = () => {
        setIsConfirmModalVisible(false);
        navigate(`/doctor-video-consultation/details/${153543}/confirm-prescription`);
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalVisible(false);
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
                <button onClick={showPrescriptionRejectModal} className="py-3 px-6 bg-red-600 text-white font-semibold">
                    Reject Prescription
                </button>
                <button onClick={showMakeOrderModal} className="py-3 px-6 bg-blue-950 text-white font-semibold">
                    Make Order
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
                <PatientInfoAndQandASection />
            </div>
            <div className="bg-white p-3">{prescription}</div>
            <div className="bg-white p-3 mt-3">{afterVideoConsultationPrescription}</div>

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
