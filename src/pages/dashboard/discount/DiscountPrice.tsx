import { Table, Button, Tooltip, Popconfirm, Input, Form, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import Modal from '../../../components/shared/Modal';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DiscountPrice = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [discountData, setDiscountData] = useState<any>(null);

    const handleModalClose = () => {
        setOpenModal(false);
        setDiscountData(null);
        form.resetFields();
    };

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            key: 'sno',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Discount Name',
            dataIndex: 'discountName',
            key: 'discountName',
        },
        {
            title: 'Discount Code',
            dataIndex: 'discountCode',
            key: 'discountCode',
            render: (code: string) => <span className="font-mono">{code}</span>,
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date: string) => dayjs(date).format('DD MMM YYYY'),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date: string) => dayjs(date).format('DD MMM YYYY'),
        },
        {
            title: 'Discount Amount (%)',
            dataIndex: 'discountAmount',
            key: 'discountAmount',
            render: (amount: number) => `${amount}%`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex gap-2">
                    <Tooltip title="Edit">
                        <Button
                            onClick={() => {
                                setDiscountData(record);
                                setOpenModal(true);
                            }}
                            type="text"
                            icon={<CiEdit size={20} className="text-blue-600" />}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Delete Discount"
                            description="Are you sure to delete this discount?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => console.log('Delete', record)}
                        >
                            <Button type="text" icon={<BsTrash size={18} className="text-red-500" />} />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    // Sample data
    const data = [
        {
            key: '1',
            discountName: 'Summer Sale',
            discountCode: 'SUMMER2024',
            startDate: '2024-06-01',
            endDate: '2024-08-31',
            discountAmount: 20,
        },
        {
            key: '2',
            discountName: 'New Year Special',
            discountCode: 'NY2024',
            startDate: '2024-01-01',
            endDate: '2024-01-31',
            discountAmount: 15,
        },
        {
            key: '3',
            discountName: 'Flash Sale',
            discountCode: 'FLASH50',
            startDate: '2024-03-01',
            endDate: '2024-03-07',
            discountAmount: 50,
        },
    ];

    useEffect(() => {
        if (discountData) {
            form.setFieldsValue({
                discountName: discountData.discountName,
                discountCode: discountData.discountCode,
                dateRange: [dayjs(discountData.startDate), dayjs(discountData.endDate)],
                discountAmount: discountData.discountAmount,
            });
        } else {
            form.resetFields();
        }
    }, [discountData, form]);

    const onFinish = async (values: any) => {
        const formattedValues = {
            ...values,
            startDate: values.dateRange[0].format('YYYY-MM-DD'),
            endDate: values.dateRange[1].format('YYYY-MM-DD'),
        };
        console.log('Form Values:', formattedValues);
        handleModalClose();
    };

    const discountForm = (
        <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
            <Form.Item
                label="Discount Name"
                name="discountName"
                rules={[{ required: true, message: 'Please enter discount name' }]}
            >
                <Input placeholder="Enter Discount Name" />
            </Form.Item>

            <Form.Item
                label="Discount Code"
                name="discountCode"
                rules={[{ required: true, message: 'Please enter discount code' }]}
            >
                <Input placeholder="Enter Discount Code" className="font-mono" />
            </Form.Item>

            <Form.Item
                label="Date Range"
                name="dateRange"
                rules={[{ required: true, message: 'Please select date range' }]}
            >
                <RangePicker style={{ width: '100%' }} format="DD MMM YYYY" />
            </Form.Item>

            <Form.Item
                label="Discount Amount (%)"
                name="discountAmount"
                rules={[
                    { required: true, message: 'Please enter discount amount' },
                    { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100' },
                ]}
            >
                <Input type="number" min={0} max={100} suffix="%" placeholder="Enter Discount Amount" />
            </Form.Item>

            <div className="flex justify-end">
                <Form.Item>
                    <Button htmlType="submit" type="primary" size="large">
                        Save Changes
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-title">Discount Management</h1>
                </div>
                <div className="mb-4 flex items-center justify-end gap-4">
                    <Popconfirm
                        title="Are you sure to delete the selected items?"
                        onConfirm={() => console.log('Deleted selected')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" shape="circle" icon={<BsTrash color="red" size={20} />} />
                    </Popconfirm>

                    <Input
                        type="text"
                        prefix={<BsSearch className="mx-2" size={20} />}
                        placeholder="Search"
                        style={{ width: 200 }}
                    />

                    <Button
                        icon={<BsPlusLg size={18} />}
                        style={{
                            height: 42,
                        }}
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setDiscountData(null);
                            setOpenModal(true);
                        }}
                    >
                        Add Discount
                    </Button>
                </div>
            </div>

            <div>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys: any, selectedRows: any) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        },
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </div>

            <Modal
                title={discountData ? 'Update Discount' : 'Add Discount'}
                open={openModal}
                setOpen={handleModalClose}
                body={discountForm}
                width={600}
            />
        </div>
    );
};

export default DiscountPrice;
