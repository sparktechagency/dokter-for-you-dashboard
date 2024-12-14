import { useState } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';

const TermsAndCondition = () => {
    const [content, setContent] = useState('');

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
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={() => {}}
                />
            </div>
            <div className="mt-6 flex items-center justify-center">
                <Button className="h-10 w-40" type="primary">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default TermsAndCondition;
