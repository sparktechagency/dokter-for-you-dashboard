import { Form, Input, Checkbox, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        localStorage.setItem('role', values?.role);
        if (values?.role === 'admin') {
            navigate('/admin-dashboard');
        } else if (values?.role === 'pharmacy') {
            navigate('/pharmacy-dashboard');
        } else if (values?.role === 'doctor') {
            navigate('/doctor-dashboard');
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
            <div className="bg-white/80 drop-shadow-md  rounded-lg p-10 w-[600px]">
                <div className=" mb-6">
                    <h1 className="text-[25px] font-semibold mb-2">Log in to your account</h1>
                    <p className="text-[#11D279]"> Please enter your email and password to continue</p>
                </div>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="email" label={<p> Email</p>}>
                        <Input
                            placeholder="Enter your email"
                            style={{
                                width: '100%',
                                height: 45,
                                border: '1px solid #d9d9d9',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="role" label={<p>User Role</p>}>
                        <Select
                            placeholder="user role"
                            style={{
                                width: '100%',
                                height: 45,
                                // border: "1px solid #d9d9d9",
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'pharmacy', label: 'Pharmacy' },
                                { value: 'doctor', label: 'Doctor' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<p>Password</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            type="password"
                            placeholder="Enter your password"
                            style={{
                                height: 45,
                                border: '1px solid #d9d9d9',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                        />
                    </Form.Item>

                    <div className="flex items-center justify-between">
                        <Form.Item style={{ marginBottom: 0 }} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot text-primary font-semibold" href="/forgot-password">
                            Forgot password
                        </a>
                    </div>

                    <Form.Item style={{ marginBottom: 0 }}>
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
                            {/* {isLoading? < Spinner/> : "Sign in"} */} Sign in
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
