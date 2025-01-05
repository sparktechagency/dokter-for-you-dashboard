import { useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { Form, Input } from 'antd';

const UserProfile = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState('https://avatars.design/wp-content/uploads/2021/02/corporate-avatars-TN-1.jpg');
    const [imgURL, setImgURL] = useState(image);

    // useEffect(() => {
    //     if (user) {
    //         form.setFieldsValue(user);
    //     }
    // }, [user, form]);

    const handleSubmit = (values: { firstName: string; email: string; mobileNumber: string; location: string }) => {
        console.log(values);
    };

    const onChange = (e: any) => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImgURL(imgUrl);
        setImage(file);
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {/* Profile Image */}
            <div className="flex justify-center flex-col items-center">
                <input onChange={onChange} type="file" id="img" className="hidden" />
                <label
                    htmlFor="img"
                    className="relative w-48 h-48 cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgURL})` }}
                >
                    <div className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center bg-white">
                        <MdOutlineAddPhotoAlternate size={22} className="text-primary" />
                    </div>
                </label>
                <h1 className="text-3xl font-bold my-5">Admin Asad</h1>
            </div>

            {/* Form */}
            <div className="flex flex-col w-[70%] justify-center items-center">
                <h1 className="text-xl my-5">Edit Profile</h1>
                <Form name="normal_login" layout="vertical" className="w-3/4" onFinish={handleSubmit} form={form}>
                    <Form.Item name="firstName" label={<p className="block">Full Name</p>} className="mb-0">
                        <Input
                            placeholder="Enter Your Full Name"
                            className="border border-gray-300 h-[45px] bg-white rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item name="email" label={<p className="block">Email</p>} className="mb-0">
                        <Input
                            type="text"
                            placeholder="Enter Email"
                            className="border border-gray-300 h-[45px] bg-white rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item name="mobileNumber" label={<p>Phone Number</p>} className="mb-0">
                        <Input
                            type="text"
                            placeholder="Enter Phone Number"
                            className="border border-gray-300 h-[45px] bg-white rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item name="location" label={<p className="block">Location</p>} className="mb-0">
                        <Input
                            placeholder="Enter Location"
                            className="border border-gray-300 h-[45px] bg-white rounded-lg"
                        />
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
