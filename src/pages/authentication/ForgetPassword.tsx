import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../redux/apiSlices/authSlice';

const ForgetPassword = () => {
    const navigate = useNavigate();

    const [forgotPassword] = useForgotPasswordMutation();

    const onFinish = async (values: any) => {
        try {
            const response = await forgotPassword(values).unwrap();

            if (response?.success) {
                navigate(`/verify-otp?email=${values?.email}`);
            } else {
                console.error('Failed to send OTP:', response?.message);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-gray-100"
            style={{
                backgroundImage: `url('/bgImg.svg')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                zIndex: 1,
            }}
        >
            <div className="bg-white/80 drop-shadow-md rounded-lg p-10 w-[600px]">
                <div className="text-center mb-4">
                    <h1 className="text-[25px] font-semibold ">Forgot Password ?</h1>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label={<p>Email</p>}
                        name="email"
                        id="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your email address"
                            style={{
                                height: 45,
                                border: '1px solid #d9d9d9',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                height: 45,
                                color: 'white',
                                fontWeight: '400px',
                                fontSize: '18px',

                                marginTop: 20,
                            }}
                            className="flex items-center justify-center bg-primary rounded-lg"
                        >
                            Send OTP
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgetPassword;
