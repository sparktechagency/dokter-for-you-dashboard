import { Table, Button, Tooltip, Popconfirm, Select, Input, Form } from 'antd';
import { useState, useEffect } from 'react';
import { BsEye, BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import Modal from '../../../components/shared/Modal';
import { BiEuro } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';

const ShippingSetting = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [viewShippingProfile, setViewShippingProfile] = useState<any>(null);
    const [shippingProfile, setShippingProfile] = useState<any>(null);
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            key: 'sno',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: 'Pharmacy Name',
            dataIndex: 'pharmacyName',
            key: 'pharmacyName',
        },
        {
            title: 'Pharmacy Address',
            dataIndex: 'pharmacyAddress',
            key: 'pharmacyAddress',
        },
        {
            title: 'Selected Area',
            dataIndex: 'selectedArea',
            key: 'selectedArea',
        },
        {
            title: 'Shipping Price',
            dataIndex: 'shippingPrice',
            key: 'shippingPrice',
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex gap-2">
                    <Tooltip title="View">
                        <Button
                            onClick={() => {
                                setViewShippingProfile(record);
                                setOpenViewModal(true);
                            }}
                            type="text"
                            icon={<BsEye size={20} className="text-blue-600" />}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            onClick={() => {
                                setShippingProfile(record);
                                setOpenModal(true);
                            }}
                            type="text"
                            icon={<CiEdit size={20} className="text-blue-600" />}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Delete Shipping Setting"
                            description="Are you sure to delete this shipping setting?"
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
            pharmacyName: 'City Pharmacy',
            pharmacyAddress: '123 Main St, City',
            selectedArea: 'Downtown',
            shippingPrice: 5.99,
        },
        {
            key: '2',
            pharmacyName: 'Health Plus',
            pharmacyAddress: '456 Oak Ave, Town',
            selectedArea: 'Suburbs',
            shippingPrice: 7.99,
        },
        {
            key: '3',
            pharmacyName: 'MediCare',
            pharmacyAddress: '789 Pine Rd, Village',
            selectedArea: 'Rural',
            shippingPrice: 9.99,
        },
    ];

    useEffect(() => {
        if (shippingProfile) {
            form.setFieldsValue({
                pharmacyName: shippingProfile.pharmacyName,
                pharmacyAddress: shippingProfile.pharmacyAddress,
                selectedArea: shippingProfile.selectedArea,
                shippingPrice: shippingProfile.shippingPrice,
            });
        } else {
            form.resetFields();
        }
    }, [shippingProfile, form]);

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        setOpenModal(false);
        setShippingProfile(null);
    };

    const shippingProfileForm = (
        <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
            <Form.Item
                label="Pharmacy Name"
                name="pharmacyName"
                rules={[{ required: true, message: 'Please select pharmacy name' }]}
            >
                <Select placeholder="Select Pharmacy Name">
                    {data.map((pharmacy) => (
                        <Select.Option key={pharmacy.pharmacyName} value={pharmacy.pharmacyName}>
                            {pharmacy.pharmacyName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Pharmacy Address"
                name="pharmacyAddress"
                rules={[{ required: true, message: 'Please enter pharmacy address' }]}
            >
                <Input placeholder="Enter Pharmacy Address" />
            </Form.Item>

            <Form.Item
                label="Selected Area"
                name="selectedArea"
                rules={[{ required: true, message: 'Please enter selected area' }]}
            >
                <Input placeholder="Enter Selected Area" />
            </Form.Item>

            <Form.Item
                label="Shipping Price"
                name="shippingPrice"
                rules={[{ required: true, message: 'Please enter shipping price' }]}
            >
                <Input type="number" step="0.01" min="0" prefix="$" placeholder="Enter Shipping Price" />
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

    const viewShippingProfileModal = (
        <div>
            <div className="text-lg text-gray space-y-8">
                <p>Pharmacy Name: {viewShippingProfile?.pharmacyName}</p>
                <p>Pharmacy Address: {viewShippingProfile?.pharmacyAddress}</p>
                <hr className="my-4" />
                <p>
                    Selected Area: <span className="text-red-500">{viewShippingProfile?.selectedArea}</span>
                </p>
                <p className="flex gap-4">
                    Shipping Price:
                    <span className="flex items-center space-x-1">
                        <BiEuro size={20} className="text-green-500" />
                        <span className="text-secondary">{viewShippingProfile?.shippingPrice}</span>
                    </span>
                </p>

                <div>
                    <div className="flex justify-end">
                        <Button type="primary" icon={<FaDownload />} size="large">
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-title">Shipping Management</h1>
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
                    <Select
                        placeholder="Pharmacy"
                        style={{ width: 200 }}
                        options={[
                            { value: 'all', label: 'All Pharmacies' },
                            { value: 'pharmacy1', label: 'Pharmacy 1' },
                            { value: 'pharmacy2', label: 'Pharmacy 2' },
                            { value: 'pharmacy3', label: 'Pharmacy 3' },
                        ]}
                    />

                    <Button
                        icon={<BsPlusLg size={18} />}
                        style={{
                            height: 42,
                        }}
                        type="primary"
                        onClick={() => setOpenModal(true)}
                    >
                        Add
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
                title={shippingProfile ? 'Update Shipping Setting' : 'Add Shipping Setting'}
                open={openModal}
                setOpen={setOpenModal}
                body={shippingProfileForm}
                width={600}
            />
            <Modal
                title="View Shipping Setting"
                open={openViewModal}
                setOpen={setOpenViewModal}
                body={viewShippingProfileModal}
                width={600}
            />
        </div>
    );
};

export default ShippingSetting;
