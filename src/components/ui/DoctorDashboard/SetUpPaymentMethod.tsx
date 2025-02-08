import { Form, Input, Button, Select, Row, Col } from 'antd';

import { useDoctorPaymentSetUpMutation } from '../../../redux/apiSlices/userSlice';
import toast from 'react-hot-toast';

const SetUpPaymentMethod = () => {
  const [form] = Form.useForm();

  const [setUpPaymentMethod] = useDoctorPaymentSetUpMutation();

  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Create data object
    const data = {
      dateOfBirth: values.dateOfBirth,
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: values.email,
      idNumber: values.idNumber,
      bank_info: {
        account_holder_name: values.account_holder_name,
        account_holder_type: values.account_holder_type,
        account_number: values.account_number,
        currency: values.currency,
        bic: values.bic,
        country: 'NL',
      },
      address: {
        line1: values.address.line1,
        city: values.address.city,
        state: values.address.state,
        postal_code: values.address.postal_code,
        country: 'NL',
      },
    };

    // Append data object to formData
    formData.append('data', JSON.stringify(data));

    try {
      const response = await setUpPaymentMethod(formData).unwrap();
      if (response?.success) {
        toast.success('Payment method set up successfully!');
      } else {
        toast.error('Failed to set up payment method.');
      }
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.data?.message || 'An error occurred while setting up payment method.');
    }

    // console.log(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Set Up Payment Method</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true, message: 'Please enter your date of birth.' }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name.' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="idNumber"
              label="ID Number"
              rules={[{ required: true, message: 'Please enter your ID number.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="account_holder_name"
              label="Account Holder Name"
              rules={[{ required: true, message: 'Please enter account holder name.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="account_holder_type"
              label="Account Holder Type"
              rules={[{ required: true, message: 'Please select account holder type.' }]}
            >
              <Select>
                <Select.Option value="individual">Individual</Select.Option>
                <Select.Option value="business">Business</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="account_number"
              label="Account Number"
              rules={[{ required: true, message: 'Please enter your account number.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="currency"
              label="Currency"
              rules={[{ required: true, message: 'Please select currency.' }]}
            >
              <Select>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="EUR">EUR</Select.Option>
                <Select.Option value="GBP">GBP</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="bic" label="BIC" rules={[{ required: true, message: 'Please enter your BIC.' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address.line1"
              label="Address Line 1"
              rules={[{ required: true, message: 'Please enter your address line.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="country" label="Country">
              <Input disabled defaultValue="NL" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['address', 'city']}
              label="City"
              rules={[{ required: true, message: 'Please enter your city.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['address', 'state']}
              label="State"
              rules={[{ required: true, message: 'Please enter your state.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['address', 'postal_code']}
              label="Postal Code"
              rules={[{ required: true, message: 'Please enter your postal code.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Set Up Payment Method
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SetUpPaymentMethod;
