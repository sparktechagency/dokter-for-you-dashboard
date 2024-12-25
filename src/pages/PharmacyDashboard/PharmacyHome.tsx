import PharmacyEarningChart from "../../components/ui/PharmacyDashboard/PharmacyHome/PharmacyEarningChart";
import PharmacyWorkActivitiesChart from "../../components/ui/PharmacyDashboard/PharmacyHome/PharmacyWorkActivitiesChart";
import Summary from "../../components/ui/PharmacyDashboard/PharmacyHome/Summary";

const PharmacyHome = () => {
    return (
        <div className=" space-y-6 pb-10 ">
            <Summary />

            <div className=" bg-white p-4 ">
                <PharmacyEarningChart />
            </div>
            <div className=" bg-white p-4 ">
                <PharmacyWorkActivitiesChart />
            </div>
        </div>
    );
};

export default PharmacyHome;