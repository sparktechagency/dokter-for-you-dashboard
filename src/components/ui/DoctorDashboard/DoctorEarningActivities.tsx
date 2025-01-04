import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ConfigProvider, Radio } from 'antd';

const stats = [
    {
        name: 'Regular Consultation',
        value: 85,
        color: '#1854F9',
        key: 'regularConsultation',
    },
    {
        name: 'Digital Prescription',
        value: 65,
        color: '#00B3CC',
        key: 'digitalPrescription',
    },
    {
        name: 'Total Service',
        value: 95,
        color: '#11D279',
        key: 'totalService',
    },
    {
        name: 'Video Consultation',
        value: 75,
        color: '#FF6B6B',
        key: 'videoConsultation',
    },
    {
        name: 'Medication',
        value: 55,
        color: '#845EC2',
        key: 'medication',
    },
];

const chartData = [
    {
        name: 'Jan',
        regularConsultation: 85,
        digitalPrescription: 65,
        totalService: 95,
        videoConsultation: 75,
        medication: 55,
    },
    {
        name: 'Feb',
        regularConsultation: 60,
        digitalPrescription: 80,
        totalService: 50,
        videoConsultation: 77,
        medication: 66,
    },
    {
        name: 'Mar',
        regularConsultation: 82,
        digitalPrescription: 68,
        totalService: 92,
        videoConsultation: 72,
        medication: 58,
    },
    {
        name: 'Apr',
        regularConsultation: 88,
        digitalPrescription: 62,
        totalService: 102,
        videoConsultation: 78,
        medication: 82,
    },
    {
        name: 'May',
        regularConsultation: 95,
        digitalPrescription: 75,
        totalService: 105,
        videoConsultation: 85,
        medication: 65,
    },
    {
        name: 'Jun',
        regularConsultation: 92,
        digitalPrescription: 73,
        totalService: 102,
        videoConsultation: 82,
        medication: 63,
    },
    {
        name: 'Jul',
        regularConsultation: 48,
        digitalPrescription: 98,
        totalService: 77,
        videoConsultation: 88,
        medication: 68,
    },
    {
        name: 'Aug',
        regularConsultation: 96,
        digitalPrescription: 76,
        totalService: 120,
        videoConsultation: 66,
        medication: 96,
    },
    {
        name: 'Sep',
        regularConsultation: 94,
        digitalPrescription: 74,
        totalService: 104,
        videoConsultation: 84,
        medication: 64,
    },
    {
        name: 'Oct',
        regularConsultation: 100,
        digitalPrescription: 80,
        totalService: 110,
        videoConsultation: 90,
        medication: 70,
    },
    {
        name: 'Nov',
        regularConsultation: 87,
        digitalPrescription: 67,
        totalService: 107,
        videoConsultation: 87,
        medication: 77,
    },
    {
        name: 'Dec',
        regularConsultation: 99,
        digitalPrescription: 79,
        totalService: 109,
        videoConsultation: 89,
        medication: 69,
    },
];

const DoctorEarningActivities = () => {
    const [activeFilter, setActiveFilter] = useState<string>('Month');

    return (
        <div className="bg-white p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                    <span className="font-bold text-2xl">Earning</span> Activities
                </h2>
                <ConfigProvider
                    theme={{
                        token: { colorPrimary: '#2884FF' },
                    }}
                >
                    <Radio.Group
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        buttonStyle="solid"
                        size="large"
                    >
                        <Radio.Button value="Month">Month</Radio.Button>
                        <Radio.Button value="Year">Year</Radio.Button>
                        <Radio.Button value="Total">Total</Radio.Button>
                    </Radio.Group>
                </ConfigProvider>
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
                        data={chartData}
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
