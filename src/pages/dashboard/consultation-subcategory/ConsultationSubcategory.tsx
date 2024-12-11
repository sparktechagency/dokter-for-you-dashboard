import React, { useState, useEffect } from 'react';
import { Button, Card, Checkbox, Form, Input, Popconfirm, Select, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { TbTrash } from 'react-icons/tb';
import Modal from '../../../components/shared/Modal';
import { IoImage } from 'react-icons/io5';

const ConsultationSubCategory: React.FC = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [editCategoryData, setEditCategoryData] = useState<any>(null);

    const categories = [
        { name: 'For Man', subCategoryName: '  Weight Problem', image: '/problem.png', details: 'This is a details' },
        { name: 'For Woman', subCategoryName: 'Weight Problem', image: '/problem.png', details: 'This is a details' },
        {
            name: 'For Children',
            subCategoryName: 'Weight Problem',
            image: '/problem.png',
            details: 'This is a details',
        },
        { name: 'STDs', subCategoryName: 'Weight Problem', image: '/problem.png', details: 'This is a details' },
        { name: 'Skin Care', subCategoryName: 'Weight Problem', image: '/problem.png', details: 'This is a details' },
        { name: 'Pain', subCategoryName: 'Weight Problem', image: '/problem.png', details: 'This is a details' },
        { name: 'Sleep', subCategoryName: 'Weight Problem', image: '/problem.png', details: 'This is a details' },
        {
            name: 'Other Services',
            subCategoryName: 'Weight Problem',
            image: '/problem.png',
            details: 'This is a details',
        },
    ];

    const [categoryImagePreview, setCategoryImagePreview] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (editCategoryData) {
            form.setFieldsValue({
                name: editCategoryData.name,
                subCategoryName: editCategoryData.subCategoryName,
                image: editCategoryData.image,
                details: editCategoryData.details,
            });
        } else {
            form.resetFields();
        }
    }, [editCategoryData, form]);

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        setOpenModal(false);
    };

    const categoryForm = (
        <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Form.Item label="Sub Category Name" name="subCategoryName">
                        <Input placeholder="Enter Sub Category Name" />
                    </Form.Item>
                    <Form.Item label="Category Name" name="name">
                        <Select placeholder="Select Category">
                            {categories.map((category) => (
                                <Select.Option key={category.name} value={category.name}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Category Image"
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
                </div>

                <div>
                    <div>
                        <Form.Item label="Details" name="details">
                            <Input.TextArea rows={12} placeholder="Enter Details" />
                        </Form.Item>
                    </div>
                </div>
            </div>

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
                <h1 className="text-2xl font-bold">Consultation Subcategory</h1>
                <div className="flex items-end gap-2">
                    <Select style={{ width: 150 }} placeholder="Select Category" allowClear>
                        <Select.Option value="For Man">For Man</Select.Option>
                        <Select.Option value="For Woman">For Woman</Select.Option>
                        <Select.Option value="For Children">For Children</Select.Option>
                        <Select.Option value="STDs">STDs</Select.Option>
                        <Select.Option value="Skin Care">Skin Care</Select.Option>
                        <Select.Option value="Pain">Pain</Select.Option>
                        <Select.Option value="Sleep">Sleep</Select.Option>
                        <Select.Option value="Other Services">Other Services</Select.Option>
                    </Select>

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
                        Add Sub Category
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, _index) => (
                    <Card key={_index} className="">
                        <div className="flex items-center gap-4 mb-4 relative">
                            <div className="">
                                <img src={category.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <Checkbox className="absolute right-4 top-4" />
                        </div>
                        <div className="space-y-1 mb-3">
                            <h1 className="text-secondary text-lg font-semibold">{category.subCategoryName}</h1>
                            <h3 className="text-primary">{category.name}</h3>
                        </div>
                        <div className="flex gap-2">
                            <Popconfirm
                                title="Delete Category"
                                description="Are you sure to delete this category?"
                                okText="Yes"
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
                title={editCategoryData ? 'Edit Category' : 'Add Category'}
            />
        </div>
    );
};

export default ConsultationSubCategory;
