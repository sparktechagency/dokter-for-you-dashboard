import { Button, Input, Select, Modal, Form } from 'antd';
import { BsArrowLeft, BsSearch } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import medicine1 from '../../../../assets/ceevit.png';
import medicine2 from '../../../../assets/ceevit2.png';
import medicine3 from '../../../../assets/ceevit.png';
import medicine4 from '../../../../assets/ceevit2.png';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';
import moment from 'moment';

interface Medicine {
  id: number;
  name: string;
  type: string;
  image: string;
  description: string;
  dosage: string;
  bestTaken: string;
  storage: string;
  price: number;
}

const medicinesData: Medicine[] = [
  {
    id: 1,
    name: 'Ceevit',
    type: 'Vitamin C',
    image: medicine1,
    description:
      'Ceevit is a vitamin C supplement that helps boost immunity and maintain healthy skin. Ceevit is a vitamin C supplement that helps boost immunity and maintain healthy skin. Ceevit is a vitamin C supplement that helps boost immunity and maintain healthy skin.',
    dosage: '1 tablet daily',
    bestTaken: 'After meals',
    storage: 'Store in a cool, dry place',
    price: 13.99,
  },
  {
    id: 2,
    name: 'Vitamin D3',
    type: 'Vitamin D',
    image: medicine2,
    description: 'Essential vitamin D3 supplement for strong bones and immune system support.',
    dosage: '1 capsule daily',
    bestTaken: 'With breakfast',
    storage: 'Keep away from direct sunlight',
    price: 15.99,
  },
  {
    id: 3,
    name: 'Omega-3',
    type: 'Fish Oil',
    image: medicine3,
    description: 'High-quality fish oil supplement rich in EPA and DHA for heart and brain health.',
    dosage: '2 softgels daily',
    bestTaken: 'With meals',
    storage: 'Refrigerate after opening',
    price: 24.99,
  },
  {
    id: 4,
    name: 'Zinc Plus',
    type: 'Mineral',
    image: medicine4,
    description: 'Advanced zinc formula for immune support and skin health.',
    dosage: '1 tablet daily',
    bestTaken: 'Before bedtime',
    storage: 'Store at room temperature',
    price: 11.99,
  },
];

const DoctorPatientServicesConfirmPrescription = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicineDetails, setSelectedMedicineDetails] = useState<Medicine | null>(null);
  const [selectedDosage, setSelectedDosage] = useState('250 mg');
  const [selectedUnit, setSelectedUnit] = useState('50 Pcs');
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);

  if (isFetching) return <div>Loading...</div>;

  const consultation = getConsultationById?.data;

  console.log(consultation);

  const showMedicineDetails = (medicine: Medicine) => {
    setSelectedMedicineDetails(medicine);
    setIsModalOpen(true);
    // Reset selections when opening modal
    setSelectedDosage('250 mg');
    setSelectedUnit('50 Pcs');
    setQuantity(0);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMedicineDetails(null);
    // Reset selections when closing modal
    setSelectedDosage('250 mg');
    setSelectedUnit('50 Pcs');
    setQuantity(0);
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (action === 'decrease' && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
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
    <div className="bg-[#E7FBF2] p-6 flex justify-between items-center mb-4">
      <div className="text-gray-600 flex flex-col gap-1">
        <p className="text-[16px]">Reg No. #{consultation._id}</p>
        <p className="text-[16px]">{consultation.subCategory?.name}</p>
        <p className="text-[16px]">{moment(consultation.createdAt).format('LL')}</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-normal text-[#0A2369] pb-1">Consultation Report</p>
        <p className="text-sm text-gray">Appointment date: {moment(consultation.createdAt).format('LL')}</p>
      </div>
      <div className="text-center">
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
                consultation?.userId?.profile.startsWith('http')
                  ? consultation?.userId?.profile
                  : `${import.meta.env.VITE_BASE_URL}${consultation?.userId?.profile}`
              }
              alt="Patient"
              className="object-cover w-28 h-28 rounded-full"
            />
            {/* Patient Info */}
            <div>
              <h2 className="text-xl font-semibold text-[#0A2369]">
                {consultation?.userId?.firstName} {consultation?.userId?.lastName}
              </h2>
              <p className="text-lg text-[#11D279]">{consultation?.userId?.country}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-4 w-[70%] text-sm text-gray-800 space-y-4">
            <p className="flex">
              <span className="font-semibold w-[20%]">Name</span> : {consultation?.userId?.firstName}{' '}
              {consultation?.userId?.lastName}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Email</span> : {consultation?.userId?.email}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Contact Number</span> : {consultation?.userId?.contact}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Gender</span> : {consultation?.userId?.gender}
            </p>
            <p className="flex">
              <span className="font-semibold w-[20%]">Death of birth</span> : {consultation?.userId?.dateOfBirth}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const givePrescription = (
    <div className=" h-[600px]">
      <h1 className="text-2xl font-bold">Give Prescription</h1>
      <h1 className="text-2xl font-bold border-t my-5 pt-3 border-slate-300">Select your preferred medication</h1>
      <div className="mb-4 flex items-center justify-start gap-4">
        <Input
          type="text"
          prefix={<BsSearch className="mx-2" size={20} />}
          placeholder="Search medicines by name"
          style={{ width: 600 }}
        />
        <Select
          placeholder="Select Dosage"
          style={{ width: 200 }}
          options={[
            { value: '1', label: '1 time daily' },
            { value: '2', label: '2 times daily' },
            { value: '3', label: '3 times daily' },
            { value: '4', label: '4 times daily' },
            { value: 'before_meal', label: 'Before meal' },
            { value: 'after_meal', label: 'After meal' },
            { value: 'before_sleep', label: 'Before sleep' },
            { value: 'when_needed', label: 'When needed' },
          ]}
        />
        <Select
          placeholder="Select Price"
          style={{ width: 200 }}
          options={[
            { value: '5', label: '€5' },
            { value: '10', label: '€10' },
            { value: '15', label: '€15' },
            { value: '20', label: '€20' },
            { value: '25', label: '€25' },
            { value: '30', label: '€30' },
            { value: '35', label: '€35' },
            { value: '40', label: '€40' },
            { value: '45', label: '€45' },
            { value: '50', label: '€50' },
          ]}
        />
        <Select
          placeholder="Select Country"
          style={{ width: 200 }}
          options={[
            { value: 'netherlands', label: 'Netherlands' },
            { value: 'germany', label: 'Germany' },
            { value: 'france', label: 'France' },
            { value: 'belgium', label: 'Belgium' },
            { value: 'spain', label: 'Spain' },
            { value: 'italy', label: 'Italy' },
            { value: 'portugal', label: 'Portugal' },
            { value: 'switzerland', label: 'Switzerland' },
          ]}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {medicinesData.map((medicine) => (
          <div
            key={medicine.id}
            className="flex bg-slate-100 shadow-md hover:shadow-lg p-3 rounded-xl flex-col items-center cursor-pointer"
            onClick={() => showMedicineDetails(medicine)}
          >
            <img className="w-[120px] h-[120px]" src={medicine.image} alt={medicine.name} />
            <h1 className="text-xl mt-3 font-bold">{medicine.name}</h1>
            <p className="text-lg">{medicine.type}</p>
            <p className="text-sm text-gray-600 mt-2">${medicine.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const selectedMedicine = (
    <div className="bg-[#e7fbf2] p-8 shadow-md flex justify-between items-center">
      <img className="w-24 h-20" src={medicine1} alt="" />
      <div>
        <h1 className="text-xl font-bold">Ceevit</h1>
        <h1 className="text-sm text-gray">Vitamin C 250 mg</h1>
      </div>
      <div>
        <h1 className="text-xl font-bold">Dosage</h1>
        <h1 className="text-sm text-gray">250 mg</h1>
      </div>
      <div>
        <h1 className="text-xl font-bold">Contents of the box</h1>
        <h1 className="text-sm text-gray">1</h1>
      </div>
      <div>
        <FaTrash className="text-red-600" size={24} />
      </div>
    </div>
  );

  const expertOpinion = (
    <div className="p-3">
      <h1>Expert Opinion</h1>
      <textarea
        placeholder="Where your health is concerned, we believe you have the right to decide what to do with your body. That is why we offer you the opportunity to consult a licensed and registered EU "
        className="w-full border rounded-xl border-slate-300 p-5 my-5 h-32"
      ></textarea>
      <div className="text-center">
        <button className="bg-[#0a2369] text-white py-4 px-20 rounded">Upload Now</button>
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
      <div className="bg-white p-3 mt-3">
        {givePrescription}
        {selectedMedicine}
      </div>
      <div className="bg-white p-3 mt-3">{expertOpinion}</div>
      {/* Medicine Details Modal */}
      <Modal
        title="Medication Details"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={1000}
        closeIcon={<span className="text-2xl">×</span>}
      >
        {selectedMedicineDetails && (
          <div className="flex items-center gap-8">
            <div className="w-1/2">
              <img
                src={selectedMedicineDetails.image}
                alt={selectedMedicineDetails.name}
                className="w-full object-contain"
              />
            </div>
            <div className="w-1/2 space-y-6">
              <div>
                <p className="text-blue-600 font-medium mb-2">SQUARE</p>
                <h2 className="text-3xl font-bold mb-1">{selectedMedicineDetails.name}</h2>
                <p className="text-xl text-gray-600">{selectedMedicineDetails.type}</p>
              </div>
              <div>
                <p className="text-blue-500 mb-4">Tablet</p>
                <p className="text-gray-600">{selectedMedicineDetails.description}</p>
              </div>
              <div>
                <p className="font-medium mb-4">Dosage</p>
                <div className="flex gap-4 mb-4">
                  <button
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedDosage === '250 mg'
                        ? 'bg-[#0a2369] text-white'
                        : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                    }`}
                    onClick={() => setSelectedDosage('250 mg')}
                  >
                    250 mg
                  </button>
                  <button
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedDosage === '500 gm'
                        ? 'bg-[#0a2369] text-white'
                        : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                    }`}
                    onClick={() => setSelectedDosage('500 gm')}
                  >
                    500 gm
                  </button>
                </div>
              </div>
              <div>
                <p className="font-medium mb-4">Select Units per Box</p>
                <div className="flex gap-4 mb-6">
                  <button
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedUnit === '10 Pcs'
                        ? 'bg-[#0a2369] text-white'
                        : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                    }`}
                    onClick={() => setSelectedUnit('10 Pcs')}
                  >
                    10 Pcs
                  </button>
                  <button
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedUnit === '50 Pcs'
                        ? 'bg-[#0a2369] text-white'
                        : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                    }`}
                    onClick={() => setSelectedUnit('50 Pcs')}
                  >
                    50 Pcs
                  </button>
                  <button
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedUnit === '100 Pcs'
                        ? 'bg-[#0a2369] text-white'
                        : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                    }`}
                    onClick={() => setSelectedUnit('100 Pcs')}
                  >
                    100 Pcs
                  </button>
                  <button
                    className={`px-4 py-2 rounded transition-colors ${
                      selectedUnit === '200 Pcs'
                        ? 'bg-[#0a2369] text-white'
                        : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                    }`}
                    onClick={() => setSelectedUnit('200 Pcs')}
                  >
                    200 Pcs
                  </button>
                </div>
              </div>
              <div>
                <p className="font-medium mb-4">Contents of the Box</p>
                <div className="flex gap-2 items-center mb-6">
                  <button
                    className="bg-slate-100 w-20 font-bold hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    onClick={() => handleQuantityChange('decrease')}
                  >
                    -
                  </button>
                  <input type="text" value={quantity} className="w-16 text-center border rounded py-2" readOnly />
                  <button
                    className="bg-slate-100 w-20 font-bold hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    onClick={() => handleQuantityChange('increase')}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-[#00865A] hover:bg-[#007a52] text-white py-4 rounded flex items-center justify-center gap-2"
                onClick={() => {
                  // Handle adding to preferences with selected options
                  console.log({
                    medicine: selectedMedicineDetails,
                    dosage: selectedDosage,
                    unit: selectedUnit,
                    quantity,
                  });
                  handleModalClose();
                }}
              >
                <span className="text-xl">+</span> My preference
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorPatientServicesConfirmPrescription;
