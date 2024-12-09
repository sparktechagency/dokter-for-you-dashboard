import React from 'react';
import { Button, Form, Input } from 'antd';
import Modal from '../../../../components/shared/Modal';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const MessageModal: React.FC<Props> = ({ open, setOpen }) => {
    const messageContent = (
        <Form layout="vertical" requiredMark={false} className="space-y-4">
            <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter a message' }]}>
                <Input.TextArea rows={4} placeholder="Your message" />
            </Form.Item>

            <div className="flex justify-end">
                <Button type="primary" size="large">
                    Send Now
                </Button>
            </div>
        </Form>
    );

    return (
        <Modal
            title="Send Message"
            open={open}
            setOpen={setOpen}
            body={messageContent}
            width={600}
        />
    );
};

export default MessageModal;
