import DoctorEarningActivities from '../DoctorEarningActivities';
import DoctotWorkActivitiesChart from '../DoctotWorkActivitiesChart';
import GeneralStates from '../GeneralStates';

const DoctorDashboard = () => {
    return (
        <div>
            <GeneralStates />
            <div className="w-full flex gap-5">
                <div className="w-1/2">
                    <DoctotWorkActivitiesChart />
                </div>
                <div className="w-1/2">
                    <DoctorEarningActivities />
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
