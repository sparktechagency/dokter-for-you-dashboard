import { Button, Modal } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import mediImg from '../../../../assets/ceevit.png';
import doctorImage from '../../../../assets/doctor.jpg';
import signature from '../../../../assets/randomSignature.png';
import { useState } from 'react';

const QAA = [
    {
        question: 'Is drinking eight glasses of water daily necessary for everyone?',
        answer: 'No, hydration needs vary based on age, activity level, and climate.',
    },
    {
        question: 'Can stress cause physical health problems?',
        answer: 'Yes, it can lead to headaches, high blood pressure, and a weakened immune system.',
    },
    {
        question: 'Should you skip breakfast to lose weight?',
        answer: 'No, skipping breakfast can lead to overeating later in the day.',
    },
    {
        question: 'Can exercise improve mental health?',
        answer: 'Yes, regular exercise reduces anxiety, depression, and stress.',
    },
    {
        question: 'Is a body temperature of 98.6°F always normal?',
        answer: 'No, normal body temperature can vary slightly from person to person.',
    },
    {
        question: 'Can eating too much sugar lead to diabetes?',
        answer: 'Yes, excessive sugar intake contributes to weight gain, a risk factor for Type 2 diabetes.',
    },
    {
        question: 'Should you visit a dentist even if you have no dental pain?',
        answer: 'Yes, regular check-ups help detect issues early.',
    },
    {
        question: 'Does everyone need 8 hours of sleep?',
        answer: 'No, sleep needs vary; 7-9 hours is a general recommendation for adults.',
    },
    {
        question: 'Can drinking green tea help with weight loss?',
        answer: 'Yes, it may boost metabolism, but it’s not a miracle solution.',
    },
    {
        question: 'Is smoking the leading cause of preventable death?',
        answer: 'Yes, smoking contributes to heart disease, cancer, and lung disease.',
    },
    {
        question: 'Should you exercise daily to stay healthy?',
        answer: 'No, rest days are important; aim for at least 3-5 days of activity per week.',
    },
    {
        question: 'Can seasonal allergies affect sleep?',
        answer: 'Yes, symptoms like nasal congestion and sneezing can disrupt sleep.',
    },
    {
        question: 'Does sunlight help in producing vitamin D?',
        answer: 'Yes, exposure to sunlight helps the skin synthesize vitamin D.',
    },
];

const QAA2 = [
    {
        question: 'Can drinking too much coffee cause health problems?',
        answer: 'Yes',
    },
    {
        question: 'Is it safe to exercise with a cold?',
        answer: 'Yes.',
    },
    {
        question: 'Does washing your hands reduce the spread of infections?',
        answer: 'Yes.',
    },
    {
        question: 'Can a balanced diet prevent chronic diseases?',
        answer: 'Yes.',
    },
];

const PharmacyPatientServicesDetails = () => {
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const showRejectModal = () => {
        setIsRejectModalVisible(true);
    };

    const handleRejectOk = () => {
        setIsRejectModalVisible(false);
        navigate(`/pharmacy-patient-services/details/${153543}/reject-prescription`);
    };

    const handleRejectCancel = () => {
        setIsRejectModalVisible(false);
    };

    const showConfirmModal = () => {
        setIsConfirmModalVisible(true);
    };

    const handleConfirmOk = () => {
        setIsConfirmModalVisible(false);
        // Add your confirm logic here
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalVisible(false);
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
        <div className="bg-[#E7FBF2] p-6  flex justify-between items-center mb-4">
            <div className="text-gray-600  flex flex-col gap-1  ">
                <p className="text-[16px] ">S No. #2164564615</p>
                <p className="text-[16px]">Man problem/Erectile dysfunction</p>
                <p className="text-[16px]">1/1/2025, 5:30 pm</p>
            </div>
            <div className="text-center ">
                <p className="text-lg  font-normal text-[#0A2369] pb-1">Consultation Report</p>
                <p className="text-sm text-gray">Appointment date: 22 nov, 2024 . 08:30am</p>
            </div>
            <div className="text-center ">
                <p className="text-lg font-normal text-[#0A2369] pb-1">Price</p>
                <p className="text-sm text-gray">220$</p>
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
                            src="/user.svg" // Replace with the real image URL
                            alt="Patient"
                            className="object-cover size-32 rounded-full"
                        />

                        {/* Patient Info */}
                        <div>
                            <h2 className="text-xl font-semibold text-[#0A2369]">Asadujjaman</h2>
                            <p className="text-lg text-[#11D279]">Netherlands</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="mt-4 w-[70%] text-sm text-gray-800 space-y-4">
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Name</span> : Asadujjaman Mahfuz
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Email</span> : Asadujjaman101@bd.com
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Contact Number</span> : +0999999999999999
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Gender</span> : Male
                        </p>
                        <p className="flex">
                            <span className="font-semibold w-[20%]">Death of birth</span> : 12 Nov, 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const questionAndAnswerSection = (
        <div>
            <h1 className="text-blue-800 font-bold text-2xl">Primary Matachin Question</h1>
            <div>
                {QAA.map((qa, index) => (
                    <div key={index} className="border-slate-300 border-b py-4">
                        <h1 className="text-lg font-semibold text-gray-800">
                            {index + 1}. {qa.question}
                        </h1>
                        <p className="text-gray-600 my-5">
                            <span className="text-blue-900 font-bold">Answer:</span> {qa.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    const questionAndAnswer2Section = (
        <div>
            <h1 className="text-blue-800 font-bold text-xl">
                Apotheek Zaandam Oost ensures that your medication is delivered to your home by a partner pharmacy.
            </h1>
            <div>
                {QAA2.map((qa, index) => (
                    <div key={index} className="border-slate-300 border-b py-4">
                        <h1 className="text-lg font-semibold text-gray-800">
                            {index + 1}. {qa.question}
                        </h1>
                        <p className="text-gray-600 my-5">
                            <span className="text-blue-900 font-bold">Answer:</span> {qa.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    const suggestedMedication = (
        <div>
            <h1 className="text-2xl my-4 px-5 font-bold text-primary">Doctors Suggested Medication</h1>
            <div className="bg-[#e7fbf2] mx-5 p-8  flex justify-between items-center">
                <img className="w-24 h-20" src={mediImg} alt="" />
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
                    <h1 className="text-xl font-bold">Price</h1>
                    <h1 className="text-sm text-gray">$13.00</h1>
                </div>
            </div>
            <div className="my-5 mx-5">
                <h1 className="font-bold text-lg">Expert Opinion</h1>
                <p className="my-2 mx-3 text-gray-600">
                    Where your health is concerned, we believe you have the right to decide what to do with your body.
                    That is why we offer you the opportunity to consult a licensed and registered EU{' '}
                </p>
            </div>
        </div>
    );

    const doctorSignature = (
        <div className=" p-5">
            <div className="flex items-center gap-3">
                <img className="w-12 h-12 rounded-full" src={doctorImage} alt="" />
                <h1 className="text-lg font-bold">Dr. Arco Verhoog</h1>
            </div>
            <div className="space-y-5 mt-5">
                <div>
                    <h1 className="font-bold">Doctor Type</h1>
                    <p className="text-gray">Urologist</p>
                </div>
                <div>
                    <h1 className="font-bold">Registration Number</h1>
                    <p className="text-gray">2313543513</p>
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
            <div className=" bg-white p-3">
                {topSection}
                {detailsSection}
                {patientAndConsultantSection}
            </div>
            <div className="bg-white p-3 mt-3">{questionAndAnswerSection}</div>
            <div className="bg-white p-3 mt-3">{questionAndAnswer2Section}</div>
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
