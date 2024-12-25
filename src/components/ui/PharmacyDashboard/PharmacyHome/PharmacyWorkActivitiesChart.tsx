import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ConfigProvider, Radio } from 'antd';

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
       const [activeFilter, setActiveFilter] = useState<string>('Month'); 
    return (
        <div className="w-full h-[347px]">
            <div className="flex justify-between mx-8">
                <div>
                    <h2 className="text-xl mb-4">
                        <span className="font-bold">Work</span> Activities
                    </h2>
                </div>
                <div>
                    <ConfigProvider
                        theme={{
                            token: { colorPrimary: '#2884FF' },
                            components: {},
                        }}
                    >
                        <Radio.Group
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                            buttonStyle="solid"
                            size="large"
                        >
                            <Radio.Button
                                style={{
                                    borderRadius: 0,
                                }}
                                value="Month"
                            >
                                Month
                            </Radio.Button>
                            <Radio.Button value="Year">Year</Radio.Button>
                            <Radio.Button
                                style={{
                                    borderRadius: 0,
                                }}
                                value="Total"
                            >
                                Total
                            </Radio.Button>
                        </Radio.Group>
                    </ConfigProvider>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="consultation"
                        stroke="#2884FF"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
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