import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useGetPharmacyTotalEarningQuery } from '../../../../redux/apiSlices/pharmacyDashboardSlice';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 2490 },
  { name: 'Sep', value: 3490 },
  { name: 'Oct', value: 4490 },
  { name: 'Nov', value: 3490 },
  { name: 'Dec', value: 4490 },
];

const PharmacyEarningChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: earningState, isFetching } = useGetPharmacyTotalEarningQuery(selectedYear);

  if (isFetching) return <div>Loading...</div>;

  const earningStates = earningState?.data;
  // console.log(earningStates);

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
        <div>
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
            dataKey="total"
            onMouseEnter={(_, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index === activeIndex ? '#2884FF' : '#E8EEFE'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PharmacyEarningChart;
