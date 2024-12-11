import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigation = useNavigate();
    return (
        <div className="flex items-center space-x-2 mb-4">
            <BsArrowLeft className="text-lg text-gray-700 cursor-pointer" onClick={() => navigation(-1)} />
            <h1 className="text-lg font-medium text-gray-800">Back to Medication List</h1>
        </div>
    );
};

export default BackButton;
