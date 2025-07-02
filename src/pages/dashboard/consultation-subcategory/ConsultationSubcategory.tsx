import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Form, Input, Popconfirm, Select, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { TbTrash } from 'react-icons/tb';
import Modal from '../../../components/shared/Modal';
import { IoImage } from 'react-icons/io5';
import {
  useCreateConsultationSubcategoryMutation,
  useDeleteConsultationSubcategoryMutation,
  useEditConsultationSubcategoryMutation,
  useGetConsultationCategoryQuery,
  useGetConsultationSubcategoryQuery,
} from '../../../redux/apiSlices/consultationSlice';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';

interface Subcategory {
  _id: string;
  name: string;
  category: {
    name: string;
    _id: string;
  };
  subCategoryName: string;
  image: string;
  details: string;
  subDetails: string;
}

const ConsultationSubCategory: React.FC = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<Subcategory | null>(null);

  const editor = useRef(null);

  // console.log(editCategoryData);

  const { data: consultationSubCategoryData, isFetching, refetch } = useGetConsultationSubcategoryQuery(undefined);
  const { data: consultationCategoryData, isFetching: isFetchingConsultationCategory } =
    useGetConsultationCategoryQuery(undefined);
  const [createConsultationSubcategory] = useCreateConsultationSubcategoryMutation();
  const [editConsultationSubcategory] = useEditConsultationSubcategoryMutation();
  const [deleteConsultationSubcategory] = useDeleteConsultationSubcategoryMutation();

  const consultationSubCategories = consultationSubCategoryData?.data;
  const categories = consultationCategoryData?.data;
  // console.log(categories);

  const [categoryImagePreview, setCategoryImagePreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (editCategoryData) {
      form.setFieldsValue({
        name: editCategoryData.name,
        subCategoryName: editCategoryData.subCategoryName,
        details: editCategoryData.details,
        subDetails: editCategoryData.subDetails,
      });
      setCategoryImagePreview(
        editCategoryData?.image.startsWith('http')
          ? editCategoryData.image
          : `${import.meta.env.VITE_BASE_URL}${editCategoryData?.image}`,
      );
    } else {
      form.resetFields();
      setCategoryImagePreview(undefined);
    }
  }, [editCategoryData, form]);

  if (isFetching || isFetchingConsultationCategory) return <div>Loading...</div>;

  const onFinish = async (values: {
    name: string;
    category: string;
    image: File;
    details: string;
    subDetails: string;
  }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('details', values.details);
    formData.append('category', values.category);
    formData.append('subDetails', values.subDetails);
    // console.log('imageeeeee', editCategoryData);

    if (values.image) {
      formData.append('image', values.image);
    } else if (editCategoryData?.image) {
      formData.append('image', editCategoryData.image);
    }

    try {
      let response;
      if (editCategoryData) {
        response = await editConsultationSubcategory({ data: formData, id: editCategoryData._id }).unwrap();
        if (response?.success) {
          toast.success('Subcategory updated successfully!');
          // form.resetFields();
          // setCategoryImagePreview(undefined);
          setEditCategoryData(null);
          setOpenModal(false);
        }
      } else {
        response = await createConsultationSubcategory(formData).unwrap();
        if (response?.success) {
          toast.success('Subcategory added successfully!');
          form.resetFields();
          setCategoryImagePreview('');
          setOpenModal(false);
        }
      }
      refetch();
    } catch (error) {
      toast.error(editCategoryData ? 'Failed to update subcategory!' : 'Failed to add subcategory!');
    }
    setOpenModal(false);
  };

  const handleDeleteSubcategory = async (value: unknown) => {
    const id = value as string;
    try {
      const response = await deleteConsultationSubcategory(id).unwrap();
      if (response?.success) {
        toast.success('Subcategory deleted successfully!');
        refetch();
      }
    } catch (error) {
      toast.error('Failed to delete subcategory!');
    }
  };

  const categoryForm: React.ReactNode = (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
      <Form.Item
        label="Sub Category Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the sub category name' }]}
      >
        <Input placeholder="Enter Sub Category Name" />
      </Form.Item>
      <Form.Item
        label="Category Name"
        name="category"
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select placeholder="Select Category">
          {categories?.map((category: any) => (
            <Select.Option key={category._id} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Category Image"
        name="image"
        rules={editCategoryData ? [] : [{ required: true, message: 'Please upload the sub category image' }]}
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
          {categoryImagePreview || editCategoryData?.image ? (
            <img
              src={categoryImagePreview || editCategoryData?.image}
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

      <Form.Item label="Details" name="details" rules={[{ required: true, message: 'Please enter the details' }]}>
        <Input.TextArea rows={7} placeholder="Enter Details" />
      </Form.Item>

      <Form.Item label="Sub Details" name="subDetails">
        <JoditEditor
          config={{
            readonly: false,
            height: 400,
            style: {
              padding: '0 35px',
            },
          }}
          ref={editor}
          value={form.getFieldValue('subDetails')}
          onChange={(value) => form.setFieldValue('subDetails', value)}
        />
      </Form.Item>

      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large">
            {editCategoryData ? 'Update Subcategory' : 'Add Subcategory'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Consultation Subcategory</h1>
        <div className="flex items-end gap-2">
          <Select style={{ width: 150 }} placeholder="Select Category" allowClear>
            {consultationSubCategories?.map((category: Subcategory) => (
              <Select.Option key={category.name} value={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>

          <Popconfirm
            title="Delete Subcategory"
            description="Are you sure to delete this subcategory?"
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
            Add Sub Category
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {consultationSubCategories?.map((subcategory: Subcategory, _index: number) => {
          console.log('adthbadhbarhb', `${import.meta.env.VITE_BASE_URL}${subcategory?.image}`);
          return (
            <Card key={_index} className="">
              <div className="flex items-center gap-4 mb-4 rounded-xl relative">
                <div className="w-full h-40 rounded-xl">
                  <img
                    className="w-full h-[160px] object-cover rounded-xl"
                    src={
                      subcategory?.image.startsWith('http')
                        ? subcategory?.image
                        : `${import.meta.env.VITE_BASE_URL}${subcategory?.image}`
                    }
                    alt="image"
                  />
                </div>
              </div>
              <div className="space-y-1 mb-3">
                <h3 className="text-secondary text-lg font-semibold ">{subcategory.name}</h3>
                <h1 className="text-primary">{subcategory?.category?.name}</h1>
              </div>
              <div className="flex gap-2">
                <Popconfirm
                  title="Delete Subcategory"
                  description="Are you sure to delete this subcategory?"
                  okText="Yes"
                  onConfirm={() => handleDeleteSubcategory(subcategory._id)}
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} className="flex items-center">
                    Delete
                  </Button>
                </Popconfirm>
                <Button
                  onClick={() => {
                    setEditCategoryData(subcategory);
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
          );
        })}
      </div>

      <Modal
        width={800}
        open={openModal}
        setOpen={(open) => {
          setOpenModal(open);
          if (!open) {
            setEditCategoryData(null);
            setCategoryImagePreview(undefined);
          }
        }}
        body={categoryForm}
        title={editCategoryData ? 'Edit Subcategory' : 'Add Subcategory'}
      />
    </div>
  );
};

export default ConsultationSubCategory;
