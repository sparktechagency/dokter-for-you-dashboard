import { Button } from 'antd';
import { CiEdit } from 'react-icons/ci';
import BackButton from '../../../components/ui/BackButton';
import { useParams } from 'react-router-dom';
import { useGetMedicineByIdQuery } from '../../../redux/apiSlices/medicineSlice';

const SingleMedicineDetails = () => {
  const { id } = useParams();
  const { data: getMedicineById, isFetching } = useGetMedicineByIdQuery(id);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  const medicineData = getMedicineById?.data;
  console.log(medicineData);

  return (
    <div className="bg-white p-6 ">
      <BackButton />
      <h2 className="text-lg font-bold mb-6 text-gray-800 text-start">Medication Details</h2>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={
              medicineData?.image.startsWith('http')
                ? medicineData?.image
                : `${import.meta.env.VITE_BASE_URL}${medicineData?.image}`
            }
            alt="Medication"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3">
          <table className="table-fixed  w-full text-lg text-gray text-left">
            <tbody>
              <tr>
                <td className="font-medium w-1/3 text-gray-700 align-top">S.no</td>

                <td>: {medicineData?._id}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Medicine Name</td>

                <td>: {medicineData?.name}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Company</td>

                <td>: {medicineData?.company}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Form</td>

                <td>: {medicineData?.form}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Medicine Type</td>

                <td>: {medicineData?.medicineType}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Dosage</td>

                <td>: {medicineData?.dosage}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Units per Box</td>

                <td>: {medicineData?.unitPerBox}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Country</td>

                <td>: {medicineData?.country}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Purchase Cost</td>

                <td>: € {medicineData?.purchaseCost}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Tax</td>

                <td>: € {medicineData?.tax}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">External Expenses</td>

                <td>: € {medicineData?.externalExpenses}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Profit Margin</td>

                <td>: € {medicineData?.sellingPrice - medicineData?.purchaseCost}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-700 align-top">Profit Percentage</td>

                <td>
                  :{' '}
                  {medicineData?.sellingPrice
                    ? `${
                        ((medicineData?.sellingPrice - medicineData?.purchaseCost) / medicineData?.purchaseCost) * 100
                      }%`
                    : '0%'}{' '}
                </td>
              </tr>
              <tr>
                <td className="font-medium text-primary align-top">Selling Price</td>

                <td className="text-primary font-semibold">
                  : € {medicineData?.sellingPrice ? medicineData?.sellingPrice : 0}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 text-gray">
            <h3 className="font-semibold">Description</h3>
            <p className="mt-1">{medicineData?.description}</p>
          </div>
        </div>
      </div>

      {/* Description */}

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          href={`/medicine-service/edit-medicine/${medicineData?._id}`}
          style={{
            height: 42,
            borderColor: '#004B56',
          }}
          type="default"
          icon={<CiEdit size={20} />}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SingleMedicineDetails;
