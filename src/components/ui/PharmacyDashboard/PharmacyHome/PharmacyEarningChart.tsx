import  { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ConfigProvider, Radio } from 'antd';

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
        const [activeFilter, setActiveFilter] = useState<string>('Month');
    
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
                            <ConfigProvider
                                theme={{
                                    token: { colorPrimary: '  #2884FF' },
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
                        <BarChart
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
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Legend />
                            <Bar
                                barSize={30}
                                dataKey="value"
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