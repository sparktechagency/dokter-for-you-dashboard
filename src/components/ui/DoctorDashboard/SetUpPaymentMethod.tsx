import { Form, Input, Button, Select, Row, Col } from 'antd';
// import { useCreatePaymentMethodMutation } from '../../../redux/apiSlices/paymentSlice';

const SetUpPaymentMethod = () => {
  const [form] = Form.useForm();
  //   const [createPaymentMethod, { isLoading }] = useCreatePaymentMethodMutation();

  const onFinish = async (values) => {
    console.log(values);
    // try {
    //   await createPaymentMethod(values).unwrap();
    //   notification.success({ message: 'Payment method created successfully.' });
    //   form.resetFields();
    // } catch (error) {
    //   notification.error({ message: 'Error creating payment method.' });
    // }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Set up payment method</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="User Name"
              rules={[{ required: true, message: 'Please enter your name.' }]}
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
              name="contactNo"
              label="Contact Number"
              rules={[{ required: true, message: 'Please enter your contact number.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter your address.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="paymentGateway"
              label="Payment Gateway"
              rules={[{ required: true, message: 'Please select a payment gateway.' }]}
            >
              <Select>
                <Select.Option value="paypal">PayPal</Select.Option>
                <Select.Option value="creditCard">Credit Card</Select.Option>
                <Select.Option value="bankTransfer">Bank Transfer</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="expiryDate"
              label="Expiry Date"
              rules={[{ required: true, message: 'Please enter the expiry date.' }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="accountNumber"
              label="Account/Card Number"
              rules={[{ required: true, message: 'Please enter your account/card number.' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="cvc" label="CVC/CVV" rules={[{ required: true, message: 'Please enter your CVC/CVV.' }]}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="iban" label="IBAN" rules={[{ required: true, message: 'Please enter your IBAN.' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="bic" label="BIC" rules={[{ required: true, message: 'Please enter your BIC.' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Set up payment method
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SetUpPaymentMethod;
