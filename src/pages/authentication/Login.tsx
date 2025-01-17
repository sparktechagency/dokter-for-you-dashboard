import { Form, Input, Checkbox, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/apiSlices/authSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

interface LoginResponse {
  data: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const [login] = useLoginMutation();

  const onFinish = async (values: any) => {
    try {
      const response = (await login(values).unwrap()) as LoginResponse;
      const decodedToken = jwtDecode<CustomJwtPayload>(response.data);
      console.log('decodedToken', decodedToken?.role);
      const { role } = decodedToken;
      if (rememberMe) {
        localStorage.setItem('authToken', response.data);
        localStorage.setItem('role', role);
      } else {
        sessionStorage.setItem('authToken', response.data);
        sessionStorage.setItem('role', role);
      }

      if (role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else if (role === 'PHARMACY') {
        navigate('/pharmacy-dashboard');
      } else if (role === 'DOCTOR') {
        navigate('/doctor-dashboard');
      }

      toast.success('Login successful!');
    } catch (error: any) {
      toast.error((error as { data: { message: string } })?.data?.message);
    }
  };

  const onCheckboxChange = (e: any) => {
    setRememberMe(e.target.checked);
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
              <Checkbox onChange={onCheckboxChange} className="text-sm">
                Remember me
              </Checkbox>
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
