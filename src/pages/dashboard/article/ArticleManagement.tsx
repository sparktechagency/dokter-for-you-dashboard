import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Popconfirm, Upload, Table, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../../components/shared/Modal';
import { IoImage } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { BsTrash } from 'react-icons/bs';

const ArticleManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [editArticleData, setEditArticleData] = useState<any>(null);
    const [articleData, setArticleData] = useState<any[]>([
        {
            key: '1',
            title: 'Article 1',
            description: 'This is the description for article 1.',
            image: '/vite.svg',
        },
        { key: '2', title: 'Article 2', description: 'This is the description for article 2.', image: '/vite.svg' },
    ]);
    const [articleImagePreview, setArticleImagePreview] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (editArticleData) {
            form.setFieldsValue({
                title: editArticleData.title,
                description: editArticleData.description,
                image: editArticleData.image,
            });
            setArticleImagePreview(editArticleData.image);
        } else {
            form.resetFields();
            setArticleImagePreview(undefined);
        }
    }, [editArticleData, form]);

    const onFinish = async (values: any) => {
        if (editArticleData) {
            // Update existing article data
            setArticleData((prev) =>
                prev.map((item) => (item.key === editArticleData.key ? { ...item, ...values } : item)),
            );
        } else {
            // Add new article data
            setArticleData((prev) => [...prev, { key: `${prev.length + 1}`, ...values }]);
        }
        setOpenModal(false);
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
                        <img
                            src={articleImagePreview}
                            alt="article preview"
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
                        {editArticleData ? 'Update Article' : 'Add Article'}
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
            render: (image: string) => <img src={image} alt="article" className="size-16 object-cover" />,
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
                            setEditArticleData(record);
                            setOpenModal(true);
                        }}
                        type="text"
                        icon={<CiEdit size={20} />}
                        className="flex items-center"
                    />

                    <Popconfirm
                        title="Delete Article"
                        description="Are you sure to delete this article?"
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
            <Table
                columns={columns}
                dataSource={articleData}
                rowClassName="hover:bg-gray-100"
                pagination={{ pageSize: 10 }}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />

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
