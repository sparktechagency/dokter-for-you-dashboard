import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/apiSlices/authSlice';
import toast from 'react-hot-toast';

interface ErrorResponse {
  data?: {
    message: string;
  };
}

const ResetPassword = () => {
  const navigate = useNavigate();

  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values: any) => {
    // console.log(values);
    try {
      const response = await resetPassword({ data: values }).unwrap();
      // console.log(response);
      if (response?.success) {
        toast.success('Password updated successfully!');
        navigate(`/login`);
      } else {
        toast.error(response?.message || 'Failed to update password.');
      }
    } catch (error) {
      const typedError = error as ErrorResponse; // Type assertion
      toast.error(typedError.data?.message || 'An error occurred. Please try again.');
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
      <div className="bg-white/80 drop-shadow-md py-10 px-20 rounded-lg p-10 w-[600px]">
        <div className=" mb-6">
          <h1 className="text-[25px] font-semibold text-primary ">Reset Password</h1>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="newPassword"
            label={
              <p
                style={{
                  width: '100%',
                  display: 'block',
                  color: '#5C5C5C',
                }}
                className="font-semibold "
              >
                New Password
              </p>
            }
            rules={[
              {
                required: true,
                message: 'Please input your new Password!',
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password
              type="password"
              placeholder="Enter New password"
              style={{
                border: '1px solid #E0E4EC',
                height: '45px',
                background: 'white',
                borderRadius: '8px',
                outline: 'none',
              }}
              className="mb-6"
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 0 }}
            label={
              <p
                style={{
                  display: 'block',
                  color: '#5C5C5C',
                }}
                className="font-semibold"
              >
                Confirm Password
              </p>
            }
            name="confirmPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter Confirm password"
              style={{
                border: '1px solid #E0E4EC',
                height: '45px',
                background: 'white',
                borderRadius: '8px',
                outline: 'none',
              }}
              className="mb-6"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <button
              type="submit"
              style={{
                width: '100%',
                height: 45,
                color: 'white',
                fontWeight: '400px',
                fontSize: '18px',
                background: '#0a2369',
                marginTop: 20,
              }}
            >
              Update
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
