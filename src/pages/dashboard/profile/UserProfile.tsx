import { useEffect, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { Form, Input } from 'antd';
import { useGetCurrentUserProfileQuery, useUpdateUserProfileMutation } from '../../../redux/apiSlices/authSlice';
import toast from 'react-hot-toast';
import logo from '../../../assets/whiteBg.png';

const UserProfile = () => {
  const [form] = Form.useForm();
  const [profileImgURL, setProfileImgURL] = useState<string | undefined>(undefined);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [signatureImgURL, setSignatureImgURL] = useState<string | undefined>(undefined);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  console.log(signatureFile);

  const { data: currentUser, isFetching, refetch } = useGetCurrentUserProfileQuery(undefined);
  const [updateAdmin] = useUpdateUserProfileMutation();

  const user = currentUser?.data;
  console.log(user);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user?.firstName || user?.pharmecyName || 'Random Doctor',
        lastName: user?.lastName,
        email: user?.email,
        location: user?.location || 'unknown',
        contact: user?.contact || 'unknown',
        regNo: user?.regNo || 'unknown',
      });
      setProfileImgURL(
        user?.profile.startsWith('http') ? user?.profile : `${import.meta.env.VITE_BASE_URL}${user?.profile}`,
      );
      setSignatureImgURL(
        user?.signature?.startsWith('http') ? user?.signature : `${import.meta.env.VITE_BASE_URL}${user?.signature}`,
      );
    }
  }, [form, user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setProfileImgURL(URL.createObjectURL(selectedFile));
      setProfileFile(selectedFile);
    }
  };

  const handleSignatureImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSignatureImgURL(URL.createObjectURL(selectedFile));
      setSignatureFile(selectedFile);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('location', values.location);
      formData.append('contact', values.contact);
      formData.append('regNo', values.regNo);

      if (profileFile) {
        formData.append('profile', profileFile);
      }
      if (signatureFile) {
        formData.append('signature', signatureFile);
      }

      console.log([...formData.entries()]); // Debugging: Check the formData content

      const response = await updateAdmin({ data: formData }).unwrap();
      if (response?.success) {
        toast.success('Profile updated successfully!');
        if (response.updatedSignature) {
          setSignatureImgURL(response.updatedSignature); // Update the signature preview with the new URL
        }
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <input onChange={handleProfileImageChange} type="file" id="profileImg" className="hidden" />
        <label
          htmlFor="profileImg"
          className="relative w-48 h-48 cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
          style={{ backgroundImage: `url(${profileImgURL || logo})` }}
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
          <Form.Item name="firstName" label="First Name">
            <Input
              placeholder="Enter Your First Name"
              className="border border-gray-300 h-[45px] bg-white rounded-lg"
            />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input placeholder="Enter Your Last Name" className="border border-gray-300 h-[45px] bg-white rounded-lg" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Enter Email" className="border border-gray-300 h-[45px] bg-white rounded-lg" />
          </Form.Item>
          <Form.Item name="contact" label="Phone Number">
            <Input placeholder="Enter Phone Number" className="border border-gray-300 h-[45px] bg-white rounded-lg" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input placeholder="Enter Location" className="border border-gray-300 h-[45px] bg-white rounded-lg" />
          </Form.Item>

          {user?.role === 'DOCTOR' && (
            <>
              <Form.Item name="regNo" label="Registration Number">
                <Input
                  placeholder="Enter Registration Number"
                  className="border border-gray-300 h-[45px] bg-white rounded-lg"
                />
              </Form.Item>
              <div className="flex flex-col items-center my-10">
                <input onChange={handleSignatureImageChange} type="file" id="signatureImg" className="!hidden" />
                <label
                  htmlFor="signatureImg"
                  className="relative w-48 h-28 cursor-pointer border border-primary bg-white bg-cover bg-center"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${signatureImgURL || logo})` }}
                  />
                  {/* <div className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center">
                <MdOutlineAddPhotoAlternate size={22} className="text-primary" />
              </div> */}
                </label>
                <p className="text-center mt-5">Signature</p>
              </div>
            </>
          )}

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
