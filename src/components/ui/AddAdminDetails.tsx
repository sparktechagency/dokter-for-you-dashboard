import { Button, Form, Input, Modal, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useCreateAdminMutation } from '../../redux/apiSlices/userSlice';
import toast from 'react-hot-toast';

const AddAdminDetails = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [form] = Form.useForm();

  const [createAdmin] = useCreateAdminMutation();

  const onFinish = async (values: any) => {
    try {
      const response = await createAdmin(values).unwrap();
      if (response?.success) {
        toast.success('Admin added successfully!');
        setOpen(false);
      } else {
        toast.error('Failed to add admin.');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Modal
      maskClosable={false}
      centered
      title={<p className="text-[24px] text-[#333333]"> Add Admin Profile </p>}
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
    >
      <div>
        <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}>
            <Input placeholder="Enter Last Name" />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[{ required: true, message: 'Please enter contact number' }]}
          >
            <Input placeholder="Enter Contact Number" />
          </Form.Item>

          <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please enter location' }]}>
            <Input placeholder="Enter Location" />
          </Form.Item>

          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' }]}>
            <Select placeholder="Select Gender" style={{ width: '100%' }}>
              <Select.Option value="MALE">Male</Select.Option>
              <Select.Option value="FEMALE">Female</Select.Option>
              <Select.Option value="OTHER">Other</Select.Option>
            </Select>
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
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddAdminDetails;
