import { Button } from 'antd';
import { FaDownload } from 'react-icons/fa';

const PatientDetailsPage = () => {
    const userDetails = {
        patient: {
            name: 'Asaduijaman Mahfuz',
            email: 'Asaduijaman101@bd.com',
            contactNumber: '+0999999999999999',
            gender: 'Male',
            deathOfBirth: '12 Nov, 2024',
            country: 'Netherlands',
            profileImg: '/user.svg', // Update with real image URL
        },
        consultant: {
            name: 'Dr. Arco Verhoog',
            specialty: 'Urologist',
            contactNumber: '+0999999999999999',
            gender: 'Male',
            profileImg: '/user.svg', // Update with real image URL
        },
        consultationDetails: {
            consultationType: 'Man problem/Erectile dysfunction',
            date: '1/1/2025, 5:30 pm',
            prescriptionStatus: 'Complete',
            price: 25.0,
            discount: 0.0,
            total: 25.0,
        },
    };

    return (
        <div className="bg-white p-3">
            <div className="bg-[#E7FBF2] p-6  flex justify-between items-center mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-800">S No. #2164564615</p>
                    <p className="text-md text-gray-600">Man problem/Erectile dysfunction</p>
                    <p className="text-md text-gray-600">1/1/2025, 5:30 pm</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">Consultation Report</p>
                    <p className="text-sm text-gray-500">Prescription is Complete</p>
                </div>
                <div>
                    <Button type="primary" icon={<FaDownload />} size="large">
                        Download
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#E8EEFE] p-6 lg:order-2">
                    <h3 className="text-xl font-semibold">Patient:</h3>
                    <div className="flex items-center gap-3">
                        <img
                            src={userDetails.patient.profileImg}
                            alt="Patient"
                            className="size-32 rounded-full mt-4 mb-4"
                        />
                        <div className="ml-4">
                            <p>{userDetails.patient.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4 md:ml-0 md:text-right">
                        <p className="flex items-center">
                            <strong>Name:</strong> {userDetails.patient.name}
                        </p>
                        <p className="flex items-center">
                            <strong>Email:</strong> {userDetails.patient.email}
                        </p>
                        <p className="flex items-center">
                            <strong>Contact Number:</strong> {userDetails.patient.contactNumber}
                        </p>
                        <p className="flex items-center">
                            <strong>Gender:</strong> {userDetails.patient.gender}
                        </p>
                        <p className="flex items-center">
                            <strong>Death of Birth:</strong> {userDetails.patient.deathOfBirth}
                        </p>
                        <p className="flex items-center">
                            <strong>Country:</strong> {userDetails.patient.country}
                        </p>
                    </div>
                </div>

                <div className="bg-[#E8EEFE] p-6 lg:order-1">
                    <h3 className="text-xl font-semibold">Consultant:</h3>
                    <img
                        src={userDetails.consultant.profileImg}
                        alt="Consultant"
                        className="size-32 rounded-full mt-4 mb-4"
                    />
                    <div>
                        <p>
                            <strong>Name:</strong> {userDetails.consultant.name}
                        </p>
                        <p>
                            <strong>Specialty:</strong> {userDetails.consultant.specialty}
                        </p>
                        <p>
                            <strong>Contact Number:</strong> {userDetails.consultant.contactNumber}
                        </p>
                        <p>
                            <strong>Gender:</strong> {userDetails.consultant.gender}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <p>
                    <strong>Consultation for:</strong> {userDetails.consultationDetails.consultationType}
                </p>
                <p>Medical questionnaire, doctor's advice, and prescription.</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div>
                        <p>
                            <strong>Price:</strong> ${userDetails.consultationDetails.price}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Discount:</strong> ${userDetails.consultationDetails.discount}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p>
                        <strong>Total:</strong> ${userDetails.consultationDetails.total}
                    </p>
                    <Button type="primary" icon={<FaDownload />} size="large">
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailsPage;
