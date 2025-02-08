import { useState } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';
import {
  useCreateUserAgreementMutation,
  useGetUserAgreementQuery,
} from '../../redux/apiSlices/termsAndConditionsAndUserAgreementSlice';
import toast from 'react-hot-toast';

const UserAgreement = () => {
  const [content, setContent] = useState('');

  // console.log('asdaer', content);

  const { data: getUserAgreement, isFetching } = useGetUserAgreementQuery(undefined);
  const [createUserAgreement] = useCreateUserAgreementMutation();

  if (isFetching) return <div>Loading...</div>;

  const userAgreement = getUserAgreement?.data[0];
  // console.log(userAgreement);

  const handleUpdateTermsAndCondition = async () => {
    try {
      const response = await createUserAgreement({ description: content }).unwrap();
      if (response?.success) {
        toast.success('User agreement updated successfully!');
      }
    } catch (error) {
      // console.log(error);
      toast.error('Failed to update User agreement!');
    }
  };

  const config = {
    readonly: false,
    placeholder: 'Start typings...',
    style: {
      height: 400,
      background: 'white',
    },
  };
  return (
    <div className="bg-white px-4 py-2 rounded-lg pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl text-primary font-semibold">User Agreement</h3>
        </div>
      </div>
      <div>
        <JoditEditor
          value={userAgreement?.description}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
        />
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Button onClick={() => handleUpdateTermsAndCondition()} className="h-10 w-40" type="primary">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default UserAgreement;
