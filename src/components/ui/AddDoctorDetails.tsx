import { Button, Form, Input, Modal, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useGetConsultationSubcategoryQuery } from '../../redux/apiSlices/consultationSlice';
import toast from 'react-hot-toast';
import { useCreateDoctorMutation } from '../../redux/apiSlices/userSlice';

const genders = [
  {
    key: '1',
    value: 'MALE',
  },
  {
    key: '2',
    value: 'FEMALE',
  },
  {
    key: '3',
    value: 'OTHER',
  },
];

const AddDoctorDetails = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [form] = Form.useForm();

  const { data: consultationSubCategoryData, isFetching } = useGetConsultationSubcategoryQuery(undefined);
  const [createDoctor] = useCreateDoctorMutation();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const consultationSubCategories = consultationSubCategoryData?.data;
  console.log(consultationSubCategories);

  const onFinish = async (values: any) => {
    // console.log('Form Values:', values);

    try {
      const response = await createDoctor(values).unwrap();
      // console.log('dgbdbhdbhdafb', response);
      if (response?.success) {
        toast.success('Doctor added successfully!');
        setOpen(false);
      } else {
        toast.error('Failed to add doctor.');
      }
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  return (
    <Modal
      maskClosable={false}
      centered
      title={<p className="text-[24px] text-[#333333]"> Add Doctor Profile </p>}
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

          {/* <Form.Item
            label="Doctor Type"
            name="subCategory"
            rules={[{ required: true, message: 'Please enter Doctor Type' }]}
          >
            <Select placeholder="Select Doctor Type" style={{ width: '100%' }}>
              {consultationSubCategories?.map((sub: any) => (
                <Select.Option key={sub._id} value={sub._id}>
                  {sub.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> */}

          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select  gender' }]}>
            <Select
              placeholder="Select Gender"
              style={{
                width: '100%',
              }}
            >
              {genders.map((gender) => (
                <Select.Option key={gender.key} value={gender.value}>
                  {gender.value}
                </Select.Option>
              ))}
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
                Add Doctor
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddDoctorDetails;
