import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useGetDoctorEarningStatesQuery } from '../../../redux/apiSlices/dashboardSlice';

const DoctorEarningActivities = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: userState, isFetching, refetch } = useGetDoctorEarningStatesQuery(selectedYear);

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  const userStates = userState?.data;
  //   // console.log('earning activities', userStates);

  const stats = [
    {
      name: 'Regular Consultation',
      value: userStates?.lifetime?.lifetimeRegularConsultation,
      color: '#1854F9',
      key: 'regular',
    },
    {
      name: 'Digital Prescription',
      value: userStates?.lifetime?.lifetimeConsultationWithoutMeds,
      color: '#00B3CC',
      key: 'withoutMeds',
    },
    {
      name: 'Total Service',
      value: userStates?.lifetime?.totalLifetimeConsultation,
      color: '#11D279',
      key: 'total',
    },
    {
      name: 'Video Consultation',
      value: userStates?.lifetime?.lifetimeVideoConsultation,
      color: '#FF6B6B',
      key: 'video',
    },
    {
      name: 'Medication',
      value: userStates?.lifetime?.lifetimeConsultationWithMeds,
      color: '#845EC2',
      key: 'withMeds',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          <span className="font-bold text-2xl">Earning</span> Activities
        </h2>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded-md px-3 py-2 w-32 cursor-pointer"
            style={{
              maxHeight: '150px',
              overflowY: 'scroll',
            }}
          >
            {years
              .slice()
              .reverse()
              ?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Statistics Display */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((item) => (
          <div key={item.name} className="flex flex-col">
            <span className="text-gray-600 text-sm">{item.name}</span>
            <span className="text-lg font-semibold" style={{ color: item.color }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={userStates?.monthlyBreakdown}
            width={500}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {stats.map((stat) => (
              <Line
                key={stat.key}
                type="monotone"
                dataKey={stat.key}
                name={stat.name}
                stroke={stat.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoctorEarningActivities;
