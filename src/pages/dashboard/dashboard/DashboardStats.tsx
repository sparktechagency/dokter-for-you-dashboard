import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { GrMoney } from 'react-icons/gr';

const DashboardStats = () => {
    const data = [
        {
            name: 'Total User',
            total: '109558',
            daily: '1392',
            icon: <IoPersonOutline size={24} />,
            bgColor: 'bg-[#F0F4FF]',
            iconColor: 'text-[#0A2369]',
        },
        {
            name: 'Workload',
            date: '13 NOV, 2024',
            load: '1000',
            resolve: '2500',
            icon: <MdOutlineWorkOutline size={24} />,
            bgColor: 'bg-[#F0F4FF]',
            iconColor: 'text-[#0A2369]',
        },
        {
            name: 'Work activity',
            date: '13 NOV, 2024',
            consult: '1700',
            pharmacy: '1800',
            icon: <GiMedicines size={24} />,
            bgColor: 'bg-[#F0F4FF]',
            iconColor: 'text-[#0A2369]',
        },
        {
            name: 'Total Earning',
            total: '$558k',
            daily: '$525k',
            icon: <GrMoney size={24} />,
            bgColor: 'bg-[#F0F4FF]',
            iconColor: 'text-[#0A2369]',
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
                <div key={index} className="bg-white  p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}>
                            <div className={item.iconColor}>{item.icon}</div>
                        </div>
                        <h3 className="text-gray-700 font-medium text-lg">{item.name}</h3>
                    </div>

                    {item.date ? (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">{item.date}</p>
                            <div className="flex gap-2 mt-1">
                                {item.load && (
                                    <div>
                                        <span className="text-gray-500">load: </span>
                                        <span className="text-red-500 font-semibold">{item.load}</span>
                                    </div>
                                )}
                                {item.resolve && (
                                    <div>
                                        <span className="text-gray-500">resolve: </span>
                                        <span className="text-green-500 font-semibold">{item.resolve}</span>
                                    </div>
                                )}
                                {item.consult && (
                                    <div>
                                        <span className="text-gray-500">Consult: </span>
                                        <span className="text-gray-900 font-semibold">{item.consult}</span>
                                    </div>
                                )}
                                {item.pharmacy && (
                                    <div>
                                        <span className="text-gray-500">pharmacy: </span>
                                        <span className="text-primary font-semibold">{item.pharmacy}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-2">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">Total: </span>
                                    <span className="text-gray-900 font-semibold">{item.total}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">Daily: </span>
                                    <span
                                        className={`font-semibold ${
                                            item.name === 'Total Earning' ? 'text-primary' : 'text-gray-900'
                                        }`}
                                    >
                                        {item.daily}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
