import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useGetEarningStatesQuery } from '../../../redux/apiSlices/dashboardSlice';

const EarningChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: earningState, isFetching, refetch } = useGetEarningStatesQuery(selectedYear);

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  const earningStates = earningState?.data;

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full h-[347px]">
      <div className="flex justify-between mx-8">
        <div>
          <h2 className="text-xl  mb-4">
            <span className="font-bold">Earning</span> Statistics
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
        <BarChart
          data={earningStates}
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
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Legend />
          <Bar
            barSize={30}
            dataKey="totalEarnings"
            onMouseEnter={(_, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {earningStates?.map((_: any, index: number) => (
              <Cell key={`cell-${index}`} fill={index === activeIndex ? '#2884FF' : '#E8EEFE'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;
