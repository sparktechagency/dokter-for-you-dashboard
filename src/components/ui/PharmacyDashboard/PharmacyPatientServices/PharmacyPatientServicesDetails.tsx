import { Modal } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import signature from '../../../../assets/randomSignature.png';
import { useState } from 'react';
import PatientInfoAndQandASection from '../../../shared/PatientInfoAndQandASection';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';
import { useUpdateConsultationStatusMutation } from '../../../../redux/apiSlices/DoctorConsultationSlice';
import toast from 'react-hot-toast';

const PharmacyPatientServicesDetails = () => {
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);
  const [updateConsultationStatus] = useUpdateConsultationStatusMutation();

  if (isFetching) return <div>Loading...</div>;

  const consultation = getConsultationById?.data;
  console.log(consultation);

  const showRejectModal = () => {
    setIsRejectModalVisible(true);
  };

  const handleRejectOk = () => {
    setIsRejectModalVisible(false);
    navigate(`/pharmacy-patient-services/details/${id}/reject-prescription`);
  };

  const handleRejectCancel = () => {
    setIsRejectModalVisible(false);
  };

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmOk = async () => {
    const formData = new FormData();
    formData.append('status', 'accepted');
    try {
      const response = await updateConsultationStatus({
        id: consultation?._id,
        data: formData,
      }).unwrap();
      if (response?.success) {
        toast.success('Consultation approved successfully!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to approve consultation.');
    }
    setIsConfirmModalVisible(false);
    // Add your confirm logic here
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const singleMedicinePrice = consultation?.suggestedMedicine?.map((medicine: any) => {
    return Number(medicine?._id?.sellingPrice) * Number(medicine?._id?.unitPerBox);
  });

  const suggestedMedication = (
    <div>
      <h1 className="text-2xl my-4 px-5 font-bold text-primary">Doctors Suggested Medication</h1>
      {consultation?.suggestedMedicine?.map((item: any, index: number) => {
        return (
          <div key={index} className="bg-[#e7fbf2] mx-5 p-8  flex justify-between items-center">
            <img
              className="w-24 h-20 object-cover"
              src={
                item?._id?.image.startsWith('http')
                  ? item?._id?.image
                  : `${import.meta.env.VITE_BASE_URL}${item?._id?.image}`
              }
              alt=""
            />
            <div className="text-center">
              <h1 className="text-xl font-bold">{item?._id?.name}</h1>
              <h1 className="text-sm text-gray">{item?._id?.medicineType}</h1>
            </div>
            <div>
              <h1 className="text-xl font-bold">Dosage</h1>
              <h1 className="text-sm text-gray">{item?.dosage}</h1>
            </div>
            <div>
              <h1 className="text-xl font-bold">Contents of the box</h1>
              <h1 className="text-sm text-gray">{item?.count}</h1>
            </div>
            <div>
              <h1 className="text-xl font-bold">Price</h1>
              <h1 className="text-sm text-gray">€ {singleMedicinePrice * item?.count}</h1>
            </div>
          </div>
        );
      })}

      <div className="my-5 mx-5">
        <h1 className="font-bold text-lg">Expert Opinion</h1>
        <p className="my-2 mx-3 text-gray-600">{consultation?.opinion}</p>
      </div>
    </div>
  );

  const doctorSignature = (
    <div className=" p-5">
      <div className="flex items-center gap-3">
        <img
          className="w-12 h-12 rounded-full"
          src={
            consultation?.doctorId?.profile.startsWith('http')
              ? consultation?.doctorId?.profile
              : `${import.meta.env.VITE_BASE_URL}${consultation?.doctorId?.profile}`
          }
          alt=""
        />
        <h1 className="text-lg font-bold">
          {consultation?.doctorId?.firstName} {consultation?.doctorId?.lastName}
        </h1>
      </div>
      <div className="space-y-5 mt-5">
        <div>
          <h1 className="font-bold">Doctor Sub Category</h1>
          <p className="text-gray">{consultation?.subCategory?.name}</p>
        </div>
        <div>
          <h1 className="font-bold">Registration Number</h1>
          <p className="text-gray">{consultation?.doctorId?._id}</p>
        </div>
        <div>
          <h1 className="font-bold">Doctor Signature</h1>
          <img src={signature} alt="" />
        </div>
      </div>
    </div>
  );

  const prescription = (
    <div className="flex items-center justify-between py-10 px-5">
      <h1 className="text-blue-700 font-bold w-[30%]">
        Our doctor send this prescription for review, pleas recheck prescription.
      </h1>
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
      <div className="flex items-center space-x-2">
        <BsArrowLeft className="text-lg text-gray-700 cursor-pointer" onClick={handleBack} />
      </div>
      <div className=" bg-white p-3">
        <PatientInfoAndQandASection id={id as string} />
      </div>

      <div className="flex my-3 gap-3">
        <div className="bg-white w-[75%]">{suggestedMedication}</div>
        <div className=" bg-white w-[25%]">{doctorSignature}</div>
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

export default PharmacyPatientServicesDetails;
