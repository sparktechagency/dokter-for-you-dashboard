import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BsCameraVideo } from 'react-icons/bs';
import { RiStethoscopeLine } from 'react-icons/ri';
import { TbReportMedical } from 'react-icons/tb';
import { MdOutlineMedication } from 'react-icons/md';
import { FaMoneyBill } from 'react-icons/fa';

const GeneralStates = () => {
  // This would come from your database/API
  const values = {
    daily: 1000,
    totalEarn: 30000,
    raisedAmount: 20000,
    balanceAvailable: 10000,
  };

  const data = [
    { name: 'Daily', value: values.daily },
    { name: 'Total Earn', value: values.totalEarn },
    { name: 'Raised Amount', value: values.raisedAmount },
    { name: 'Balance Available', value: values.balanceAvailable },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FF0000', '#FFBB28'];

  const statsData = [
    {
      title: 'Regular Consultation',
      date: '13 NOV, 2024',
      load: 100,
      resolve: 25,
      price: 250,
      icon: <RiStethoscopeLine className="text-5xl text-blue-500" />,
    },
    {
      title: 'Video Consultation',
      date: '13 NOV, 2024',
      load: 100,
      resolve: 25,
      price: 250,
      icon: <BsCameraVideo className="text-5xl text-blue-500" />,
    },
    {
      title: 'Medication by Patient',
      date: '13 NOV, 2024',
      load: 100,
      resolve: 25,
      price: 250,
      icon: <MdOutlineMedication className="text-5xl text-blue-500" />,
    },
    {
      title: 'Digital Prescription Details',
      date: '13 NOV, 2024',
      load: 100,
      resolve: 25,
      price: 250,
      icon: <TbReportMedical className="text-5xl text-blue-500" />,
    },
  ];

  return (
    <div className="mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <h3 className="text-xl font-semibold">{stat.title}</h3>
                </div>
              </div>
              <span className="text-sm text-slate-400">{stat.date}</span>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl font-semibold">
                    load: <span className="text-[#1854F9]">{stat.load}</span>
                  </p>
                  <p className="text-xl font-semibold">
                    resolve: <span className="text-[#00B3CC]">{stat.resolve}</span>
                  </p>
                  <p className="text-xl font-semibold">
                    Price <span className="text-[#11D279]">€{stat.price}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Earning Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-2xl flex items-center gap-2 mb-4">
            <FaMoneyBill className="text-5xl text-blue-500" /> Total Earning
          </h3>

          <div className="flex items-center justify-between">
            <div className="w-[80%]">
              <div className="mb-4">
                <p className="text-lg">
                  <span className="text-gray-500">Daily: </span>
                  <span className="text-xl font-medium" style={{ color: COLORS[0] }}>
                    €{values.daily}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg">
                  <span className="text-gray-500">Total earn: </span>
                  <span className="text-xl font-medium" style={{ color: COLORS[1] }}>
                    €{values.totalEarn}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg">
                  <span className="text-gray-500">Raised Amount: </span>
                  <span className="text-xl font-medium" style={{ color: COLORS[2] }}>
                    €{values.raisedAmount}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg">
                  <span className="text-gray-500">Balance Available: </span>
                  <span className="text-xl font-medium" style={{ color: COLORS[3] }}>
                    €{values.balanceAvailable}
                  </span>
                </p>
              </div>
            </div>
            <div style={{ width: '150px', height: '150px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} innerRadius={45} outerRadius={60} paddingAngle={5} dataKey="value" cx="50%" cy="50%">
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralStates;
