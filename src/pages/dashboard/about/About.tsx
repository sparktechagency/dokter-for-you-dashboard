import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Popconfirm, Upload, Table, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../../components/shared/Modal';
import { IoImage } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { BsTrash } from 'react-icons/bs';

const About: React.FC = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [editAboutData, setEditAboutData] = useState<any>(null);
    const [aboutData, setAboutData] = useState<any[]>([
        {
            key: '1',
            title: 'About Us',
            description: 'This is a description of the about us section.',
            image: '/vite.svg',
        },
        { key: '2', title: 'Our Mission', description: 'This is a description of our mission.', image: '/vite.svg' },
    ]);
    const [categoryImagePreview, setCategoryImagePreview] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (editAboutData) {
            form.setFieldsValue({
                title: editAboutData.title,
                description: editAboutData.description,
                image: editAboutData.image,
            });
            setCategoryImagePreview(editAboutData.image);
        } else {
            form.resetFields();
            setCategoryImagePreview(undefined);
        }
    }, [editAboutData, form]);

    const onFinish = async (values: any) => {
        if (editAboutData) {
            // Update existing about data
            setAboutData((prev) =>
                prev.map((item) => (item.key === editAboutData.key ? { ...item, ...values } : item)),
            );
        } else {
            // Add new about data
            setAboutData((prev) => [...prev, { key: `${prev.length + 1}`, ...values }]);
        }
        setOpenModal(false);
    };

    const aboutForm = (
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
                        <img
                            src={categoryImagePreview}
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
            <div className="flex justify-end">
                <Form.Item>
                    <Button htmlType="submit" type="primary" size="large">
                        {editAboutData ? 'Update About' : 'Add About'}
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <img src={image} alt="about" className="size-16 object-cover" />,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => (
                <Tooltip placement="topLeft" title={description}>
                    <div className="line-clamp-2">{description}</div>
                </Tooltip>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => {
                            setEditAboutData(record);
                            setOpenModal(true);
                        }}
                        type="text"
                        icon={<CiEdit size={20} />}
                        className="flex items-center"
                    />

                    <Popconfirm
                        title="Delete About"
                        description="Are you sure to delete this about section?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" icon={<BsTrash size={18} className="text-red-500" />} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">About Management</h1>
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
            <Table
                columns={columns}
                dataSource={aboutData}
                rowClassName="hover:bg-gray-100"
                pagination={{ pageSize: 10 }}
            />

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
