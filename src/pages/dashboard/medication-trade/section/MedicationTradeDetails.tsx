import { Button } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetConsultationByIdQuery } from '../../../../redux/apiSlices/patientServiceSlice';

const MedicationTradeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);

  if (isFetching) return <div>Loading...</div>;

  const consultationData = getConsultationById?.data;
  // console.log(consultationData);

  const topSection = (
    <div className="flex items-center justify-between px-4 py-2 bg-white my-2">
      {/* Back Button and Title */}
      <div className="flex items-center space-x-2">
        <BsArrowLeft className="text-lg text-gray-700 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-medium text-gray-800">Medication Details</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button
          className={`py-5 text-white ${consultationData?.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}
        >
          {consultationData?.status}
        </Button>
      </div>
    </div>
  );

  const detailsSection = (
    <div className="bg-[#E7FBF2] p-6  flex justify-between items-center mb-4">
      <div className="text-gray0-80">
        <p className="text-lg font-semibold">ID: #{consultationData?._id}</p>
        <p className="text-md">{consultationData?.subCategory?.name}</p>
        <p className="text-md">{new Date(consultationData?.createdAt).toDateString()}</p>
      </div>
    </div>
  );

  const patientAndConsultantSection = (
    <div className="bg-[#E8EEFE] p-6">
      <h1 className="text-xl font-semibold mb-6">Patient:</h1>
      <div className="flex flex-col gap-8">
        {/* Patient Info Section */}
        <div className="flex gap-20 my-10 border-b border-dashed pb-10 border-slate-300">
          <div className="flex items-center gap-4">
            <img
              src={
                consultationData?.userId?.profile.startsWith('http')
                  ? consultationData?.userId?.profile
                  : import.meta.env.VITE_BASE_URL + consultationData?.userId?.profile
              }
              alt="Patient"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#0A2369]">
                {consultationData?.userId?.firstName} {consultationData?.userId?.lastName}
              </h2>
              <p className="text-[#11D279]">{consultationData?.userId?.country}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-[#4B4B4B]">
            <p>
              <span className="inline-block w-32">Name</span> : {consultationData?.userId?.firstName}{' '}
              {consultationData?.userId?.lastName}
            </p>
            <p>
              <span className="inline-block w-32">Email</span> : {consultationData?.userId?.email}
            </p>
            <p>
              <span className="inline-block w-32">Contact Number</span> : {consultationData?.userId?.contact}
            </p>
            <p>
              <span className="inline-block w-32">Gender</span> : {consultationData?.userId?.gender}
            </p>
            <p>
              <span className="inline-block w-32">Death of birth</span> : {consultationData?.userId?.dateOfBirth}
            </p>
          </div>
        </div>

        {/* Address and Schedule Section */}
        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-1">
            <h3 className="font-medium mb-2">Address:</h3>
            <p>
              {consultationData?.userId?.firstName} {consultationData?.userId?.lastName}
            </p>
            <p>{consultationData?.userId?.city}</p>
            <p>{consultationData?.userId?.country}</p>
          </div>
          <div className="space-y-1 text-green-700">
            <h3 className="font-medium mb-2">Billing address:</h3>
            <p>
              {consultationData?.address?.firstname} {consultationData?.address?.lastname}
            </p>
            <p>{consultationData?.address?.place}</p>
            <p>{consultationData?.address?.country}</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium mb-2">Pharmacy Name</h3>
            <p>Apotheek Zaandam Oost</p>
          </div>
          <div className="flex justify-between">
            <div className="space-y-1">
              <h3 className="font-medium mb-2">Time schedule</h3>
              <p>Order Date : {new Date(consultationData?.createdAt).toDateString()}</p>
              <p>Delivery Date : ----</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const medicineDetailsSection = (
    <div>
      {consultationData?.suggestedMedicine?.map((medicine: any, index: number) => {
        return (
          <div
            key={index}
            className="flex items-center border-b border-slate-200 justify-between my-2 rounded-lg p-4 text-gray"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  medicine?._id?.image.startsWith('http')
                    ? medicine?._id?.image
                    : `${import.meta.env.VITE_BASE_URL}${medicine?._id?.image}`
                }
                alt="Ceevit"
                className="w-20 h-auto rounded"
              />

              <div>
                <h3 className="font-semibold text-lg text-gray-800">{medicine?._id?.name}</h3>
                <p className="text-sm text-gray-600">{medicine?._id?.medicineType}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">Dosage</p>
              <p className="font-semibold text-gray-800">{medicine?._id?.dosage}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Unit Per Box</p>
              <p className="font-semibold text-gray-800">{medicine?._id?.unitPerBox}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-semibold text-gray-800">€ {medicine?._id?.sellingPrice || 25}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const subTotal = consultationData?.suggestedMedicine?.reduce((acc: number, medicine: any) => {
    return acc + medicine?._id?.sellingPrice;
  }, 0);

  const consultationDetailsSection = (
    <div className=" p-4 text-gray text-lg">
      <hr className="my-4" />
      <div className="flex items-center justify-end gap-40">
        <p>Subtotal</p>
        <p>{subTotal}</p>
      </div>
      <div className="flex items-center justify-end gap-40">
        <p>Discount</p>
        <p>- 0</p>
      </div>
      <div className="flex items-center justify-end gap-40">
        <p>Shipping cost</p>
        <p>€20.00</p>
      </div>
      <hr className="my-4" />
      <div className="flex items-center justify-end gap-40 text-[#0A2369]">
        <p>Total</p>
        <p>€ {subTotal + 20}</p>
      </div>
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
      {medicineDetailsSection}
      {consultationDetailsSection}
    </div>
  );
};

export default MedicationTradeDetails;
