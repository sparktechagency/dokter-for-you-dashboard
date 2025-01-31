import { Button, Input, Modal } from 'antd';
import { BsArrowLeft, BsSearch } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';
import moment from 'moment';
import {
  useGetMedicineBySubCategoryQuery,
  useMakePrescriptionMutation,
} from '../../../../redux/apiSlices/medicineSlice';
import toast from 'react-hot-toast';

interface Medicine {
  _id: string;
  name: string;
  medicineType: string;
  image: string;
  description: string;
  dosage: string[];
  unitPerBox: string[];
  sellingPrice: number;
  company: string;
  form: string;
}

const DoctorPatientServicesConfirmPrescription = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicineDetails, setSelectedMedicineDetails] = useState<Medicine | null>(null);
  const [selectedDosage, setSelectedDosage] = useState<string | undefined>();
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(0);
  const [selectedMedicines, setSelectedMedicines] = useState<
    { medicineId: Medicine; dosage: string; unit: string; quantity: number }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);
  const [makePrescription] = useMakePrescriptionMutation();
  const consultation = getConsultationById?.data;

  const { data: getMedicineById } = useGetMedicineBySubCategoryQuery(consultation?.subCategory?._id);

  const medicines = getMedicineById?.data;

  if (isFetching) return <div>Loading...</div>;
  console.log(consultation);

  const showMedicineDetails = (medicine: Medicine) => {
    // console.log('adrshsaethaesrhaerh', medicine);

    setSelectedMedicineDetails(medicine);
    setIsModalOpen(true);
    // Reset selections when opening modal
    setSelectedDosage(medicine.dosage[0]);
    setSelectedUnit(medicine.unitPerBox[0]);
    setQuantity(0);
  };

  const handleUploadPrescription = async () => {
    const opinion = (document.querySelector('textarea[name="opinion"]') as HTMLTextAreaElement).value;
    const data = {
      suggestedMedicine: selectedMedicines.map((medicine) => ({
        _id: medicine.medicineId._id,
        dosage: medicine.dosage,
        total: medicine.unit,
        count: medicine.quantity,
      })),
      opinion,
    };
    console.log(data);

    try {
      const response = await makePrescription({ data: data, id }).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success('Prescription uploaded successfully!');
        navigate('/doctor-patient-services-list');
      } else {
        toast.error('Failed to upload prescription.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to upload prescription.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMedicineDetails(null);
    // Reset selections when closing modal
    setSelectedDosage(selectedMedicineDetails?.dosage[0]);
    setSelectedUnit(selectedMedicineDetails?.unitPerBox[0]);
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
        className={`text-white py-5 ${
          consultation?.status === 'pending'
            ? 'bg-yellow-500'
            : consultation?.status === 'completed'
            ? 'bg-blue-500'
            : consultation?.status === 'prescribed'
            ? 'bg-green-500'
            : ''
        }`}
      >
        {consultation?.status}
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

  const patientChosenMedicines = (
    <div>
      <h1 className="text-2xl my-4 px-5 font-bold text-primary">Patient Wanted Medicines</h1>
      {consultation?.medicins?.map((item: any, index: number) => {
        return (
          <div key={index} className="bg-slate-100 mx-5 p-8  flex justify-between items-center">
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
              <h1 className="text-sm text-gray">{item?._id?.dosage[0]}</h1>
            </div>
            <div>
              <h1 className="text-xl font-bold">Quantity</h1>
              <h1 className="text-sm text-gray">{item?.count}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );

  const filteredMedicines = medicines?.filter((medicine: any) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const givePrescription = (
    <div className="">
      <h1 className="text-2xl font-bold">Give Prescription</h1>
      <h1 className="text-2xl font-bold border-t my-5 pt-3 border-slate-300">Select your preferred medication</h1>
      <div className="mb-4 flex items-center justify-start gap-4">
        <Input
          type="text"
          prefix={<BsSearch className="mx-2" size={20} />}
          placeholder="Search medicines by name"
          style={{ width: 600 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredMedicines?.map((medicine: any) => (
          <div
            key={medicine?._id}
            className="flex bg-slate-100 shadow-md hover:shadow-lg p-3 rounded-xl flex-col items-center cursor-pointer"
            onClick={() => showMedicineDetails(medicine)}
          >
            <img
              className="w-[120px] h-[120px] object-cover"
              src={
                medicine?.image.startsWith('http')
                  ? medicine?.image
                  : `${import.meta.env.VITE_BASE_URL}${medicine?.image}`
              }
              alt={medicine?.name}
            />
            <h1 className="text-xl mt-3 font-bold">{medicine?.name}</h1>
            {/* <p className="text-lg">{medicine?.medicineType}</p> */}
          </div>
        ))}
      </div>
    </div>
  );

  const expertOpinion = (
    <div className="p-3">
      <h1>Expert Opinion</h1>
      <textarea
        name="opinion"
        placeholder="Where your health is concerned, we believe you have the right to decide what to do with your body. That is why we offer you the opportunity to consult a licensed and registered EU "
        className="w-full border rounded-xl border-slate-300 p-5 my-5 h-32"
      ></textarea>
      <div className="text-center">
        <button onClick={() => handleUploadPrescription()} className="bg-[#0a2369] text-white py-4 px-20 rounded">
          Upload Now
        </button>
      </div>
    </div>
  );

  // console.log(selectedMedicineDetails);

  const handleAddToCart = ({
    medicine,
    dosage,
    unit,
    quantity,
  }: {
    medicine: Medicine;
    dosage: string;
    unit: string;
    quantity: number;
  }) => {
    const data = {
      medicineId: medicine,
      dosage,
      unit,
      quantity,
    };

    setIsModalOpen(false);

    // console.log('adbhaerhbar', data);
    setSelectedMedicines((prevState) => [...prevState, data]);
  };
  console.log(selectedMedicines);
  const selectedMedicine = selectedMedicines.map((medicine) => (
    <div
      className="bg-[#e7fbf2] mt-10 border-t-4 border-[#0a2369] p-8 shadow-md flex justify-between items-center"
      key={medicine.medicineId._id}
    >
      <img
        className="w-24 h-20 object-cover"
        src={
          medicine?.medicineId?.image.startsWith('http')
            ? medicine?.medicineId?.image
            : `${import.meta.env.VITE_BASE_URL}${medicine?.medicineId?.image}`
        }
        alt=""
      />
      <div>
        <h1 className="text-xl font-bold">{medicine.medicineId.name}</h1>
        {/* <h1 className="text-sm text-gray">{medicine.medicineId.medicineType}</h1> */}
      </div>
      <div>
        <h1 className="text-xl font-bold">Dosage</h1>
        <h1 className="text-sm text-gray">{medicine.dosage}</h1>
      </div>
      <div>
        <h1 className="text-xl font-bold">Quantity</h1>
        <h1 className="text-sm text-gray">{medicine.quantity}</h1>
      </div>
      <div>
        <FaTrash
          className="text-red-600"
          size={24}
          onClick={() =>
            setSelectedMedicines((prevState) =>
              prevState.filter((item) => item.medicineId._id !== medicine.medicineId._id),
            )
          }
        />
      </div>
    </div>
  ));

  return (
    <div>
      <div className=" bg-white p-3">
        {topSection}
        {detailsSection}
        {patientAndConsultantSection}
      </div>
      <div className="bg-white p-3 mt-3">{patientChosenMedicines}</div>
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
                src={
                  selectedMedicineDetails?.image.startsWith('http')
                    ? selectedMedicineDetails?.image
                    : `${import.meta.env.VITE_BASE_URL}${selectedMedicineDetails?.image}`
                }
                alt={selectedMedicineDetails.name}
                className="w-full object-contain"
              />
            </div>
            <div className="w-1/2 space-y-6">
              <div>
                <p className="text-blue-600 font-medium mb-2">{selectedMedicineDetails?.company}</p>
                <h2 className="text-3xl font-bold mb-1">{selectedMedicineDetails?.name}</h2>
                {/* <p className="text-xl text-gray-600">{selectedMedicineDetails?.medicineType}</p> */}
              </div>
              <div>
                <p className="text-blue-500 mb-4">{selectedMedicineDetails?.form}</p>
                <p className="text-gray-600">{selectedMedicineDetails?.description}</p>
              </div>
              <div>
                <p className="font-medium mb-4">Dosage</p>
                <div className="flex gap-4 mb-4">
                  {selectedMedicineDetails?.dosage?.map((dosage: any) => (
                    <button
                      key={dosage}
                      className={`px-4 py-2 rounded transition-colors ${
                        selectedDosage === dosage
                          ? 'bg-[#0a2369] text-white'
                          : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                      }`}
                      onClick={() => setSelectedDosage(dosage)}
                    >
                      {dosage}
                    </button>
                  ))}
                </div>
                {selectedDosage ? null : <p className="text-red-600 text-sm">Please select dosage</p>}
              </div>
              <div>
                <p className="font-medium mb-4">Select Units per Box</p>
                <div className="flex gap-4 mb-6">
                  {selectedMedicineDetails?.unitPerBox?.map((unit: any) => (
                    <button
                      key={unit}
                      className={`px-4 py-2 rounded transition-colors ${
                        selectedUnit === unit
                          ? 'bg-[#0a2369] text-white'
                          : 'bg-slate-100 text-gray-700 hover:bg-slate-400'
                      }`}
                      onClick={() => setSelectedUnit(unit)}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
                {selectedUnit ? null : <p className="text-red-600 text-sm">Please select unit per box</p>}
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
                {quantity ? null : <p className="text-red-600 text-sm">Please select contents of the box</p>}
              </div>
              <button
                className="w-full bg-[#00865A] hover:bg-[#007a52] text-white py-4 rounded flex items-center justify-center gap-2"
                disabled={!selectedDosage || !selectedUnit || !quantity}
                onClick={() =>
                  handleAddToCart({
                    medicine: selectedMedicineDetails,
                    dosage: selectedDosage || '',
                    unit: selectedUnit || '',
                    quantity,
                  })
                }
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
