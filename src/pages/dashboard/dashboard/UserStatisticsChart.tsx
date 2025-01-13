import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetUserStatisticsQuery } from '../../../redux/apiSlices/dashboardSlice';

const UserStatisticsChart: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: userState, isFetching, refetch } = useGetUserStatisticsQuery(selectedYear);

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  const userStates = userState?.data;

  return (
    <div className="w-full h-[333px]">
      <div className="flex justify-between mx-8">
        <div>
          <h2 className="text-xl mb-4">
            <span className="font-bold">User</span> Statistics
          </h2>
        </div>
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
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={userStates}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00B3CC" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00B3CC00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#2884FF"
            fillOpacity={1}
            fill="url(#colorUsers)"
            strokeWidth={2}
            dot={{ r: 4, fill: '#2884FF' }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatisticsChart;
