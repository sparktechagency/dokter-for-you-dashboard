const DoctorMyTransaction = () => {
    return (
        <div>
            <div className="flex items-center gap-5">
                <div className="bg-white w-[20%] p-10">
                    <h1>
                        Total Earn: <span>€3000</span>
                    </h1>
                </div>
                <div className="bg-white w-[20%] p-10">
                    <h1>
                        Total Earn: <span>€3000</span>
                    </h1>
                </div>
                <div className="bg-white p-7 flex items-center justify-between w-[60%]">
                    <h1>
                        Balance Available: <span>€3000</span>
                    </h1>
                    <button className="bg-green-900 text-white py-3 px-10">Withdraw Balance</button>
                </div>
            </div>
        </div>
    );
};

export default DoctorMyTransaction;
