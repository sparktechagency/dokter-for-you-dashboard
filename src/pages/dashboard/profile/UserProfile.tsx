import { useEffect, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { Form, Input } from 'antd';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useGetCurrentAdminQuery, useUpdateUserProfileMutation } from '../../../redux/apiSlices/authSlice';
import toast from 'react-hot-toast';
import logo from '../../../assets/whiteBg.png';

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

const UserProfile = () => {
  const [form] = Form.useForm();
  const [imgURL, setImgURL] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const getUserToken = localStorage.getItem('authToken');
  if (!getUserToken) {
    console.error('No auth token found');
    return;
  }
  const decodedToken = jwtDecode<CustomJwtPayload>(getUserToken);
  const { id } = decodedToken;

  const { data: currentAdminData, isFetching } = useGetCurrentAdminQuery(id);

  const [updateAdmin] = useUpdateUserProfileMutation();

  const user = currentAdminData?.data;
  //   console.log(user);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        location: user?.location || 'unknown',
        contact: user?.contact || 'unknown',
      });
      setImgURL(user?.profile.startsWith('http') ? user?.profile : `${import.meta.env.VITE_BASE_URL}${user?.profile}`);
    }
  }, [form, user]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values: any) => {
    // console.log(values);
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('location', values.location);
      formData.append('contact', values.contact);

      if (file) {
        console.log('image file', file);
        formData.append('profile', file);
      } else if (imgURL) {
        formData.append('profile', imgURL);
      } else {
        console.error('No file or image URL provided.');
        return;
      }
      //   console.log(formData);

      const response = await updateAdmin({ data: formData }).unwrap();
      console.log('in response', response);
      if (response?.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const onChangeImage = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/* Profile Image */}
      <div className="flex justify-center flex-col items-center">
        <input onChange={onChangeImage} type="file" id="img" className="hidden" />
        <label
          htmlFor="img"
          className="relative w-48 h-48 cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
          style={{ backgroundImage: `url(${imgURL ? imgURL : logo})` }}
        >
          <div className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center">
            <MdOutlineAddPhotoAlternate size={22} className="text-primary" />
          </div>
        </label>
        <h1 className="text-2xl font-semibold mt-4">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-gray-500 mt-2">{user?.email}</p>
      </div>

      {/* Form */}
      <div className="flex flex-col w-[70%] mt-5 justify-center items-center">
        <h1 className="text-xl my-5">Edit Profile</h1>
        <Form name="normal_login" layout="vertical" className="w-3/4" onFinish={handleSubmit} form={form}>
          <Form.Item name="firstName" label={<p className="block">Full Name</p>} className="mb-0">
            <Input
              placeholder="Enter Your First Name"
              className="border border-gray-300 h-[45px] bg-white rounded-lg"
            />
          </Form.Item>
          <Form.Item name="lastName" label={<p className="block">Full Name</p>} className="mb-0">
            <Input placeholder="Enter Your Last Name" className="border border-gray-300 h-[45px] bg-white rounded-lg" />
          </Form.Item>

          <Form.Item name="email" label={<p className="block">Email</p>} className="mb-0">
            <Input
              type="text"
              placeholder="Enter Email"
              className="border border-gray-300 h-[45px] bg-white rounded-lg"
            />
          </Form.Item>

          <Form.Item name="contact" label={<p>Phone Number</p>} className="mb-0">
            <Input
              type="text"
              placeholder="Enter Phone Number"
              className="border border-gray-300 h-[45px] bg-white rounded-lg"
            />
          </Form.Item>

          <Form.Item name="location" label={<p className="block">Location</p>} className="mb-0">
            <Input placeholder="Enter Location" className="border border-gray-300 h-[45px] bg-white rounded-lg" />
          </Form.Item>

          <div className="text-center mt-6">
            <Form.Item>
              <button type="submit" className="bg-[#0a2369] text-white w-36 h-[45px] rounded-lg">
                Save
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
