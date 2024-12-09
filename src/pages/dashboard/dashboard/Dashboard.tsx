import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import UserStatisticsChart from './UserStatisticsChart';
import WorkActivitiesChart from './WorkActivitiesChart';

const Dashboard = () => {
    return (
        <div className="space-y-6 pb-10">
            <DashboardStats />

            <div className="grid space-y-8">
                <div className="bg-white p-4">
                    <EarningChart />
                </div>
                <div className=" grid grid-cols-2 gap-8">
                    <div className="bg-white p-4">
                        <UserStatisticsChart />
                    </div>
                    <div className="bg-white p-4">
                        <WorkActivitiesChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
