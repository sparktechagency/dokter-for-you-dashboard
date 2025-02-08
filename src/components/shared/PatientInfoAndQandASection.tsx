import { Button } from 'antd';
import { useGetConsultationByIdQuery } from '../../redux/apiSlices/patientServiceSlice';
import moment from 'moment';

const topSectionData = {
  title: 'User Services Details',
  loading: true,
};

const detailsSectionData = {
  sNo: '2164564615',
  problem: 'Man problem/Erectile dysfunction',
  date: '1/1/2025, 5:30 pm',
  appointmentDate: '22 nov, 2024 . 08:30am',
  price: '220$',
};

const patientData = {
  name: 'Asadujjaman Mahfuz',
  email: 'Asadujjaman101@bd.com',
  contact: '+0999999999999999',
  gender: 'Male',
  dob: '12 Nov, 2024',
  country: 'Netherlands',
  image: '/user.svg',
};

interface QA {
  question: string;
  answer: string;
}

const PatientInfoAndQandASection = ({ id }: { id: string }) => {
  const { data: getConsultationById, isFetching } = useGetConsultationByIdQuery(id);

  if (isFetching) return <div>Loading...</div>;

  const consultation = getConsultationById?.data;

  // console.log(consultation);

  const topSection = topSectionData && (
    <div className="flex items-center justify-between px-4 py-2 bg-white my-2">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-medium text-gray-800">{topSectionData.title}</h1>
      </div>

      {topSectionData.loading && (
        <Button
          className={`py-5 px-6 text-lg ${consultation?.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}
          type="primary"
        >
          {consultation.status}
        </Button>
      )}
    </div>
  );

  const detailsSection = detailsSectionData && (
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

  const patientAndConsultantSection = patientData && (
    <div className="">
      <div className="bg-[#E8EEFE] p-6 text-gray">
        <h1 className="text-xl font-semibold text-[#222222] my-3">Patient:</h1>
        <div className="flex w-full h-full pb-5 justify-start gap-14 items-center">
          <div className="flex w-[30%] items-center space-x-4">
            <img
              src={
                consultation?.userId?.profile.startsWith('http')
                  ? consultation?.userId?.profile
                  : `${import.meta.env.VITE_BASE_URL}${consultation?.userId?.profile}`
              }
              alt="Patient"
              className="object-cover w-28 h-28 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#0A2369]">
                {consultation?.userId?.firstName} {consultation?.userId?.lastName}
              </h2>
              <p className="text-lg text-[#11D279]">{consultation?.userId?.country}</p>
            </div>
          </div>

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

  const questionAndAnswerSection = (
    <div>
      <h1 className="text-blue-800 font-bold text-2xl">Primary Matachin Question</h1>
      <div>
        {consultation?.QNA?.map((qa: QA, index: number) => (
          <div key={index} className="border-slate-300 border-b py-4">
            <h1 className="text-lg font-semibold text-gray-800">
              {index + 1}. {qa.question}
            </h1>
            <p className="text-gray-600 my-5">
              <span>Answer:</span>{' '}
              <span
                className={`${
                  qa.answer.slice(0, 3).toLowerCase() === 'yes'
                    ? 'text-red-500 font-bold'
                    : qa.answer.slice(0, 3).toLowerCase() === 'no'
                    ? 'text-green-500 font-bold'
                    : ''
                }`}
              >
                {qa.answer}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const dynamicQuestionAndAnswerSection = (
    <div>
      <h1 className="text-blue-800 font-bold text-2xl">Apotheek Zaandam Oost Question</h1>
      <div>
        {consultation?.DinamicQNA?.map((qa: QA, index: number) => (
          <div key={index} className="border-slate-300 border-b py-4">
            <h1 className="text-lg font-semibold text-gray-800">
              {index + 1}. {qa.question}
            </h1>
            <p className="text-gray-600 my-5">
              <span>Answer:</span>{' '}
              <span
                className={`${
                  qa.answer.slice(0, 3).toLowerCase() === 'yes'
                    ? 'text-red-500 font-bold'
                    : qa.answer.slice(0, 3).toLowerCase() === 'no'
                    ? 'text-green-500 font-bold'
                    : ''
                }`}
              >
                {qa.answer}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  //   const questionAndAnswer2Section = (
  //     <div>
  //       <h1 className="text-blue-800 font-bold text-xl">
  //         Apotheek Zaandam Oost ensures that your medication is delivered to your home by a partner pharmacy.
  //       </h1>
  //       <div>
  //         {QAA2.map((qa, index) => (
  //           <div key={index} className="border-slate-300 border-b py-4">
  //             <h1 className="text-lg font-semibold text-gray-800">
  //               {index + 1}. {qa.question}
  //             </h1>
  //             <p className="text-gray-600 my-5">
  //               <span className="text-blue-900 font-bold">Answer:</span> {qa.answer}
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );

  return (
    <>
      <div className="bg-white p-3">
        {topSection}
        {detailsSection}
        {patientAndConsultantSection}
      </div>
      <div className="bg-white p-3 mt-3">{questionAndAnswerSection}</div>
      <div className="bg-white p-3 mt-3">{dynamicQuestionAndAnswerSection}</div>
      {/* <div className="bg-white p-3 mt-3">{questionAndAnswer2Section}</div> */}
    </>
  );
};

export default PatientInfoAndQandASection;
