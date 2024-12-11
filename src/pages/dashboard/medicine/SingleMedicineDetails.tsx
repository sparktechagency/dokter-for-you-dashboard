import { Button } from 'antd';
import { FaDownload } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import BackButton from '../../../components/ui/BackButton';

const SingleMedicineDetails = () => {
    return (
        <div className="bg-white p-6 ">
            <BackButton />
            <h2 className="text-lg font-bold mb-6 text-gray-800 text-start">Medication Details</h2>

            {/* Content Wrapper */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <div className="w-full md:w-1/3 flex justify-center">
                    <img
                        src="/ceevit2.png" // Replace with actual image URL
                        alt="Medication"
                        className=""
                    />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-2/3">
                    <table className="table-fixed  w-full text-lg text-gray text-left">
                        <tbody>
                            <tr>
                                <td className="font-medium w-1/3 text-gray-700 align-top">S.no</td>
                                <td className="w-1">{':'}</td>
                                <td>#1239</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Medicine Name</td>
                                <td>{':'}</td>
                                <td>Ceevit</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Company</td>
                                <td>{':'}</td>
                                <td>Square</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">From</td>
                                <td>{':'}</td>
                                <td>Tablet</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Medicine Type</td>
                                <td>{':'}</td>
                                <td>Vitamin C</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Dosage</td>
                                <td>{':'}</td>
                                <td>250 mg</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Units per Box</td>
                                <td>{':'}</td>
                                <td>50pcs/Box</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Country</td>
                                <td>{':'}</td>
                                <td>Netherlands</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Purchase Cost</td>
                                <td>{':'}</td>
                                <td>€12</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Tax</td>
                                <td>{':'}</td>
                                <td>€2</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">External Expenses</td>
                                <td>{':'}</td>
                                <td>€0.5</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Profit Margin</td>
                                <td>{':'}</td>
                                <td>€2.5</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-700 align-top">Profit Percentage</td>
                                <td>{':'}</td>
                                <td>0.25%</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-primary align-top">Selling Price</td>
                                <td>{':'}</td>
                                <td className="text-primary font-semibold">€15</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-4 text-gray">
                        <h3 className="font-semibold">Description</h3>
                        <p className="mt-1">
                            Where your health is concerned, we believe you have the right to decide what to do with your
                            body. That is why we offer you the opportunity to consult a licensed and registered EU.
                        </p>
                    </div>
                </div>
            </div>

            {/* Description */}

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
                <Button
                    style={{
                        height: 42,
                    }}
                    type="primary"
                    icon={<FaDownload size={20} />}
                >
                    Download
                </Button>
                <Button
                    href="/medicine-service/edit-medicine/2222"
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
