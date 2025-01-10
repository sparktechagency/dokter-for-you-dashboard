import { useState } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';
import {
  useCreateTermsAndConditionsMutation,
  useGetTermsAndConditionsQuery,
} from '../../redux/apiSlices/termsAndConditionsAndUserAgreementSlice';
import toast from 'react-hot-toast';

const TermsAndCondition = () => {
  const [content, setContent] = useState('');

  console.log('asdaer', content);

  const { data: getTermsAndCondition, isFetching } = useGetTermsAndConditionsQuery(undefined);
  const [updateTermsAndCondition] = useCreateTermsAndConditionsMutation();

  if (isFetching) return <div>Loading...</div>;

  const termsAndCondition = getTermsAndCondition?.data[0];
  console.log(termsAndCondition);

  const handleUpdateTermsAndCondition = async () => {
    try {
      const response = await updateTermsAndCondition({ description: content }).unwrap();
      if (response?.success) {
        toast.success('Terms and conditions updated successfully!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update Terms and conditions!');
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
          <h3 className="text-2xl text-primary font-semibold">Terms and Conditions</h3>
        </div>
      </div>
      <div>
        <JoditEditor
          value={termsAndCondition?.description}
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

export default TermsAndCondition;
