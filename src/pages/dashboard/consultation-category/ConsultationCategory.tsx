import React, { useState, useEffect } from 'react';
import { Button, Card, Checkbox, Form, Input, Popconfirm, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { TbTrash } from 'react-icons/tb';
import Modal from '../../../components/shared/Modal';
import { IoImage } from 'react-icons/io5';
import {
  useCreateConsultationCategoryMutation,
  useDeleteConsultationCategoryMutation,
  useEditConsultationCategoryMutation,
  useGetConsultationCategoryQuery,
} from '../../../redux/apiSlices/consultationSlice';
import toast from 'react-hot-toast';

interface ConsultationCategory {
  _id: string;
  name: string;
  image: string;
  summary: string;
}

const ConsultationCategory: React.FC = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<ConsultationCategory | null>(null);

  const { data: getCategories, isFetching, refetch } = useGetConsultationCategoryQuery(undefined);
  const [createConsultationCategory] = useCreateConsultationCategoryMutation();
  const [editConsultationCategory] = useEditConsultationCategoryMutation();
  const [deleteConsultationCategory] = useDeleteConsultationCategoryMutation();

  const consultationCategories: ConsultationCategory[] = getCategories?.data || [];

  const [categoryImagePreview, setCategoryImagePreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (editCategoryData) {
      form.setFieldsValue({
        name: editCategoryData?.name,
        image: editCategoryData?.image,
        summary: editCategoryData?.summary,
      });
      setCategoryImagePreview(
        editCategoryData?.image.startsWith('http')
          ? editCategoryData?.image
          : `${import.meta.env.VITE_BASE_URL}${editCategoryData?.image}`,
      );
    } else {
      form.resetFields();
      setCategoryImagePreview(undefined);
    }
  }, [editCategoryData, form]);

  if (isFetching) return <div>Loading...</div>;

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);
    formData.append('summary', values.summary);

    try {
      let response;
      if (editCategoryData) {
        // Update category

        response = await editConsultationCategory({ data: formData, id: editCategoryData?._id }).unwrap();
        if (response?.success) {
          toast.success('Category updated successfully!');
        }
      } else {
        // Create new category
        response = await createConsultationCategory(formData).unwrap();
        if (response?.success) {
          toast.success('Category added successfully!');
        }
      }
      refetch();
    } catch (error) {
      toast.error(editCategoryData ? 'Failed to update category!' : 'Failed to add category!');
    }
    setOpenModal(false);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await deleteConsultationCategory(id).unwrap();
      if (response?.success) {
        toast.success('Category deleted successfully!');
        refetch();
      }
    } catch (error) {
      toast.error('Failed to delete category!');
    }
  };

  const categoryForm = (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
      <Form.Item label="Category Name" name="name">
        <Input placeholder="Enter Category Name" />
      </Form.Item>
      <Form.Item
        label="Category Image"
        name="image"
        getValueFromEvent={(e) => {
          const file = e?.fileList?.[0]?.originFileObj;
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCategoryImagePreview(imageUrl); // Update the preview immediately
            // console.log('Image preview set:', imageUrl); // Log the image preview
          }
          return file || editCategoryData?.image; // Return the file or existing image
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
          ) : editCategoryData?.image ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${editCategoryData?.image}`}
              alt="category preview"
              className="w-48 h-48 mx-auto object-cover"
            />
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
      <Form.Item label="Summary" name="summary">
        <Input.TextArea placeholder="Enter Summary" />
      </Form.Item>

      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large">
            {editCategoryData ? 'Update Category' : 'Add Category'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Consultation Category</h1>
        <div className="flex items-end gap-2">
          <Popconfirm
            title="Delete Category"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            placement="top"
          >
            <Button style={{ height: 42 }} type="text">
              <TbTrash size={24} />
            </Button>
          </Popconfirm>
          <Button
            onClick={() => setOpenModal(true)}
            style={{
              height: 42,
            }}
            iconPosition="end"
            type="primary"
            icon={<PlusOutlined />}
            className="bg-[#002B90]"
          >
            Add Category
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consultationCategories?.map((category: ConsultationCategory, _index) => (
          <Card key={_index} className="relative mb-4">
            <Checkbox className="absolute right-4 top-4" />
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#002B90] rounded-full flex items-center justify-center">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={
                    category?.image.startsWith('http')
                      ? category?.image
                      : `${import.meta.env.VITE_BASE_URL}${category?.image}`
                  }
                  alt="image"
                />
              </div>
              <h3 className="text-lg font-medium">{category.name}</h3>
            </div>
            <div className="flex gap-2">
              <Popconfirm
                title="Delete Category"
                description="Are you sure to delete this category?"
                okText="Yes"
                onConfirm={() => handleDeleteCategory(category._id)}
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} className="flex items-center">
                  Delete
                </Button>
              </Popconfirm>
              <Button
                onClick={() => {
                  setEditCategoryData(category);
                  setOpenModal(true);
                }}
                type="primary"
                icon={<EditOutlined />}
                className="flex items-center bg-[#002B90]"
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        width={600}
        open={openModal}
        setOpen={(open) => {
          setOpenModal(open);
          if (!open) {
            setEditCategoryData(null);
            setCategoryImagePreview(undefined);
          } else {
            // console.log('Opening add modal, resetting image preview.'); // Log when opening add modal
            setCategoryImagePreview(undefined);
          }
        }}
        body={categoryForm}
        title={editCategoryData ? 'Edit Category' : 'Add Category'}
      />
    </div>
  );
};

export default ConsultationCategory;
