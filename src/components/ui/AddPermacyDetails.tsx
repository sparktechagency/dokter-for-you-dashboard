import { Button, Form, Input, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useCreatePharmacyMutation } from '../../redux/apiSlices/userSlice';
import toast from 'react-hot-toast';

const AddPharmacyDetails = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [form] = Form.useForm();

  const [createPharmacy] = useCreatePharmacyMutation();

  const onFinish = async (values: any) => {
    try {
      const response = await createPharmacy(values).unwrap();
      if (response?.success) {
        toast.success('Pharmacy added successfully!');
        setOpen(false);
      } else {
        toast.error('Failed to add pharmacy.');
      }
    } catch (error) {
      // console.log(error);
    }

    // console.log('Form Values:', values);
    // setOpen(false);
  };

  return (
    <Modal
      maskClosable={false}
      centered
      title={<p className="text-[24px] text-[#333333]"> Add pharmacy </p>}
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
    >
      <div>
        <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Pharmacy Name"
            name="pharmecyName"
            rules={[{ required: true, message: 'Please enter pharmacy name' }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[{ required: true, message: 'Please enter contact number' }]}
          >
            <Input placeholder="Enter Contact Number" />
          </Form.Item>

          <Form.Item label="Address" name="location" rules={[{ required: true, message: 'Please enter address' }]}>
            <Input placeholder="Enter Address" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="******"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="rounded-lg bg-gray-100"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-end">
            <Form.Item>
              <Button htmlType="submit" type="primary" size="large">
                Add Pharmacy
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddPharmacyDetails;
