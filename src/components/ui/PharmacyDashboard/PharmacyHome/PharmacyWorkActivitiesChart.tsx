import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetPharmacyWorkLoadQuery } from '../../../../redux/apiSlices/pharmacyDashboardSlice';

const data = [
  { name: 'Jan', consultation: 1400, pharmacy: 1200 },
  { name: 'Feb', consultation: 1500, pharmacy: 1300 },
  { name: 'Mar', consultation: 1300, pharmacy: 1400 },
  { name: 'Apr', consultation: 1600, pharmacy: 1500 },
  { name: 'May', consultation: 1400, pharmacy: 1600 },
  { name: 'Jun', consultation: 1500, pharmacy: 1550 },
  { name: 'Jul', consultation: 1600, pharmacy: 1650 },
  { name: 'Aug', consultation: 1550, pharmacy: 1700 },
  { name: 'Sep', consultation: 1700, pharmacy: 1600 },
  { name: 'Oct', consultation: 1800, pharmacy: 1575 },
  { name: 'Nov', consultation: 1750, pharmacy: 1650 },
  { name: 'Dec', consultation: 1900, pharmacy: 1700 },
];

const PharmacyWorkActivitiesChart = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: pharmacyWorkState, isFetching } = useGetPharmacyWorkLoadQuery(selectedYear);

  if (isFetching) return <div>Loading...</div>;

  const pharmacyWorkStates = pharmacyWorkState?.data;
  console.log('work load', pharmacyWorkStates);

  return (
    <div className="w-full h-[347px]">
      <div className="flex justify-between mx-8">
        <div>
          <h2 className="text-xl mb-4">
            <span className="font-bold">Work</span> Activities
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
        <LineChart
          data={pharmacyWorkStates}
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
          <Line type="monotone" dataKey="total" stroke="#2884FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line
            type="monotone"
            dataKey="pharmacy"
            stroke="#00C49F"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PharmacyWorkActivitiesChart;
