import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ConfigProvider, Radio } from 'antd';

const data = [
    { name: 'Jan', users: 1200 },
    { name: 'Feb', users: 1900 },
    { name: 'Mar', users: 2100 },
    { name: 'Apr', users: 1800 },
    { name: 'May', users: 2400 },
    { name: 'Jun', users: 2100 },
    { name: 'Jul', users: 1900 },
    { name: 'Aug', users: 2300 },
    { name: 'Sep', users: 1800 },
    { name: 'Oct', users: 1600 },
    { name: 'Nov', users: 1800 },
    { name: 'Dec', users: 1500 },
];

const UserStatisticsChart: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('Month');

    return (
        <div className="w-full h-[333px]">
            <div className="flex justify-between mx-8">
                <div>
                    <h2 className="text-xl mb-4">
                        <span className="font-bold">User</span> Statistics
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
                <AreaChart
                    data={data}
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="users"
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
