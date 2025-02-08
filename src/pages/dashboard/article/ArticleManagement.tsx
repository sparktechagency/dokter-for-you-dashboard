import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../../components/shared/Modal';
import { IoImage } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';
import {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from '../../../redux/apiSlices/aboutAndArticleSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ArticleManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editArticleData, setEditArticleData] = useState<any>(null);

  const [articleImagePreview, setArticleImagePreview] = useState<string | undefined>(undefined);

  const { data: articleData, isFetching } = useGetArticleQuery(undefined);
  const [createArticle] = useCreateArticleMutation();
  const [editArticle] = useUpdateArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();

  const articles = articleData?.data || [];
  // console.log(articles);

  useEffect(() => {
    if (editArticleData) {
      form.setFieldsValue({
        title: editArticleData.title,
        description: editArticleData.description,
        image: editArticleData.image,
      });
      setArticleImagePreview(
        editArticleData.image?.startsWith('http')
          ? editArticleData.image
          : `${import.meta.env.VITE_BASE_URL}${editArticleData.image}`,
      );
    } else {
      form.resetFields();
      setArticleImagePreview(undefined);
    }
  }, [editArticleData, form]);

  if (isFetching) return <div>Loading...</div>;

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('image', values.image);

    try {
      if (editArticleData) {
        const response = await editArticle({ data: formData, id: editArticleData._id }).unwrap();
        if (response?.success) {
          toast.success('Article updated successfully!');
        }
      } else {
        const response = await createArticle(formData).unwrap();
        if (response?.success) {
          toast.success('Article added successfully!');
          form.resetFields();
          setArticleImagePreview(undefined);
        }
      }
      setOpenModal(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      const response = await deleteArticle(id).unwrap();
      if (response?.success) {
        toast.success('Article deleted successfully!');
      }
    } catch (error) {
      toast.error('Failed to delete article!');
    }
  };

  const articleForm = (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
      <Form.Item label="Title" name="title">
        <Input placeholder="Enter Title" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Enter Description" />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        getValueFromEvent={(e) => {
          const file = e?.fileList?.[0]?.originFileObj;
          if (file) {
            setArticleImagePreview(URL.createObjectURL(file));
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
          {articleImagePreview ? (
            <img src={articleImagePreview} alt="article preview" className="w-48 h-48 mx-auto object-cover" />
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
            {editArticleData ? 'Update Article' : 'Add Article'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Article Management</h1>
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
            Add Article
          </Button>
        </div>
      </div>
      <div>
        {articles.map((article: any, index: number) => (
          <div key={index}>
            <div className="flex w-full gap-1 justify-between mb-4 border-b-2 pb-5 border-dashed border-slate-300">
              <h1 className="w-[5%] bg-white rounded-xl shadow-lg flex justify-center font-bold items-center">
                {index + 1}
              </h1>
              <div className="w-[90%]">
                <div className="flex mb-1 w-full gap-1">
                  <h3 className="text-lg p-3 w-2/3 rounded-xl shadow-md bg-white font-semibold">{article.title}</h3>
                  <h3 className="text-lg p-3 w-1/3 rounded-xl shadow-md bg-white font-semibold">
                    Date: {new Date(article.createdAt).toDateString()}
                  </h3>
                </div>
                <p className="text-gray-600 text-justify p-3 rounded-xl shadow-lg h-[300px] overflow-y-scroll bg-white ">
                  {article.description}
                </p>
              </div>
              <div className="flex w-[5%] flex-col justify-center items-center shadow-lg rounded-xl gap-3">
                <div className="">
                  <FaEdit
                    size={24}
                    onClick={() => {
                      setEditArticleData(article);
                      setOpenModal(true);
                    }}
                    className="text-blue-500 cursor-pointer"
                  />
                </div>
                <div className="border-t-2 border-dashed border-slate-300 pt-3">
                  <FaTrash
                    onClick={() => {
                      handleDeleteArticle(article._id);
                    }}
                    size={24}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        width={600}
        open={openModal}
        setOpen={(open) => {
          setOpenModal(open);
          if (!open) {
            setEditArticleData(null);
            setArticleImagePreview(undefined);
          }
        }}
        body={articleForm}
        title={editArticleData ? 'Edit Article' : 'Add Article'}
      />
    </div>
  );
};

export default ArticleManagement;
