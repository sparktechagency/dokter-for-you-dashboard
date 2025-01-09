import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../../components/shared/Modal';
import { IoImage } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';
import {
  useCreateAboutMutation,
  useDeleteAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} from '../../../redux/apiSlices/aboutAndArticleSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const About: React.FC = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editAboutData, setEditAboutData] = useState<any>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<string | undefined>(undefined);

  const { data: aboutData, isFetching } = useGetAboutQuery(undefined);
  const [createAbout] = useCreateAboutMutation();
  const [editAbout] = useUpdateAboutMutation();
  const [deleteAbout] = useDeleteAboutMutation();

  const abouts = aboutData?.data || [];
  console.log(abouts);

  useEffect(() => {
    if (editAboutData) {
      form.setFieldsValue({
        title: editAboutData.title,
        description: editAboutData.description,
        image: editAboutData.image,
      });
      setCategoryImagePreview(
        editAboutData.image?.startsWith('http')
          ? editAboutData.image
          : `${import.meta.env.VITE_BASE_URL}${editAboutData.image}`,
      );
    } else {
      setCategoryImagePreview(undefined);
    }
  }, [editAboutData, form]);

  if (isFetching) return <div>Loading...</div>;

  const onFinish = async () => {
    const formData = new FormData();
    formData.append('title', form.getFieldValue('title'));
    formData.append('description', form.getFieldValue('description'));
    formData.append('image', form.getFieldValue('image'));

    try {
      if (editAboutData) {
        const response = await editAbout({ data: formData, id: editAboutData._id }).unwrap();
        if (response?.success) {
          toast.success('About updated successfully!');
        }
      } else {
        const response = await createAbout(formData).unwrap();
        if (response?.success) {
          toast.success('About added successfully!');
          form.resetFields();
          setCategoryImagePreview(undefined);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenModal(false);
    }
  };

  const handleDeleteAbout = async (id: string) => {
    try {
      const response = await deleteAbout(id).unwrap();
      if (response?.success) {
        toast.success('About deleted successfully!');
      }
    } catch (error) {
      toast.error('Failed to delete about!');
    }
  };

  const aboutForm = (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
      <Form.Item label="Title" name="title">
        <Input placeholder="Enter Title" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={10} placeholder="Enter Description" />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        getValueFromEvent={(e) => {
          const file = e?.fileList?.[0]?.originFileObj;
          if (file) {
            setCategoryImagePreview(URL.createObjectURL(file));
          }
          return e?.fileList?.[0]?.originFileObj;
        }}
      >
        <Upload.Dragger
          accept="image/*"
          maxCount={1}
          showUploadList={false}
          beforeUpload={(_file) => {
            return false;
          }}
        >
          {categoryImagePreview ? (
            <img src={categoryImagePreview} alt="category preview" className="w-48 h-48 mx-auto object-cover" />
          ) : (
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2">
                <IoImage size={24} />
              </div>
              <p className="text-gray">Upload Image</p>
            </div>
          )}
        </Upload.Dragger>
      </Form.Item>
      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large">
            {editAboutData ? 'Update About' : 'Add About'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  return (
    <div className="bg-white h-screen p-6 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">About Management</h1>
        <div className="flex items-center gap-3">
          <Button type="text" icon={<BsTrash size={24} className="text-red-500" />} />
          <Button
            onClick={() => setOpenModal(true)}
            style={{
              height: 42,
            }}
            icon={<PlusOutlined />}
            type="primary"
          >
            Add About
          </Button>
        </div>
      </div>
      <div>
        <div>
          {abouts.map((about: any, index: number) => (
            <div key={index}>
              <div className="flex w-full gap-1 justify-between mb-4 border-b-2 pb-5 border-dashed border-slate-300">
                <h1 className="w-[5%] bg-white rounded-xl shadow-lg flex justify-center font-bold items-center">
                  {index + 1}
                </h1>
                <div className="w-[90%]">
                  <h3 className="text-lg p-3 rounded-xl mb-1 shadow-lg bg-white font-semibold">{about.title}</h3>
                  <p className="text-gray-600 text-justify p-3 rounded-xl shadow-lg bg-white ">{about.description}</p>
                </div>
                <div className="flex w-[5%] flex-col justify-center items-center shadow-lg rounded-xl gap-3">
                  <div className="">
                    <FaEdit
                      size={24}
                      onClick={() => {
                        setOpenModal(true), setEditAboutData(about);
                      }}
                      className="text-blue-500 cursor-pointer"
                    />
                  </div>
                  <div className="border-t-2 border-dashed border-slate-300 pt-3">
                    <FaTrash
                      size={24}
                      onClick={() => handleDeleteAbout(about._id)}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        width={600}
        open={openModal}
        setOpen={(open) => {
          setOpenModal(open);
          if (!open) {
            setEditAboutData(null);
            setCategoryImagePreview(undefined);
          }
        }}
        body={aboutForm}
        title={editAboutData ? 'Edit About' : 'Add About'}
      />
    </div>
  );
};

export default About;
