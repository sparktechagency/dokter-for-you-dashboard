import { FaUsers, FaUserCog, FaClipboardList, FaDollarSign } from 'react-icons/fa';
import { useGetGeneralStatesQuery } from '../../../redux/apiSlices/dashboardSlice';
import moment from 'moment';

const DashboardStats = () => {
  const { data: getGeneralStates, isFetching } = useGetGeneralStatesQuery(undefined);

  if (isFetching) return <div>Loading...</div>;

  const generalStates = getGeneralStates?.data;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F0F4FF]">
            <div className="text-[#0A2369]">
              <FaUsers size={20} />
            </div>
          </div>
          <h3 className="text-gray-700 font-medium text-lg">Total Users</h3>
        </div>
        <p className="text-[12px] py-1 text-gray-500">{moment(new Date()).format('LL')}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-gray-700 font-medium text-xl">Total: {generalStates?.totalUsers}</h3>
          <h3 className="text-gray-700 font-medium text-xl">Daily: {generalStates?.dailyUsers}</h3>
        </div>
      </div>
      <div>
        <div className="bg-white p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F0F4FF]">
              <div className="text-[#0A2369]">
                <FaUserCog size={20} />
              </div>
            </div>
            <h3 className="text-gray-700 font-medium text-lg">Workload</h3>
          </div>
          <p className="text-[12px] py-1 text-gray-500">{moment(new Date()).format('LL')}</p>
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 font-medium text-xl">load: {generalStates?.workload?.pending}</h3>
            <h3 className="text-gray-700 font-medium text-xl">Resolved: {generalStates?.workload?.finished}</h3>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F0F4FF]">
              <div className="text-[#0A2369]">
                <FaClipboardList size={20} />
              </div>
            </div>
            <h3 className="text-gray-700 font-medium text-lg">Work Activity</h3>
          </div>
          <p className="text-[12px] py-1 text-gray-500">{moment(new Date()).format('LL')}</p>
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 font-medium text-xl">Consult: {generalStates?.workActivity?.consult}</h3>
            <h3 className="text-gray-700 font-medium text-xl">Pharmacy: {generalStates?.workActivity?.pharmecy}</h3>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F0F4FF]">
              <div className="text-[#0A2369]">
                <FaDollarSign size={20} />
              </div>
            </div>
            <h3 className="text-gray-700 font-medium text-lg">Total Earning</h3>
          </div>
          <p className="text-[12px] py-1 text-gray-500">{moment(new Date()).format('LL')}</p>
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 font-medium text-xl">Total: {generalStates?.totalEarnings?.total}</h3>
            <h3 className="text-gray-700 font-medium text-xl">Daily: {generalStates?.totalEarnings?.daily}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
