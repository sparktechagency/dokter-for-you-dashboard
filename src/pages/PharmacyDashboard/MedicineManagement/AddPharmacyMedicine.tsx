import { Form, Input, Select, Button, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BackButton from '../../../components/ui/BackButton';

const AddPharmacyMedicine = () => {
    const handleFinish = (values: any) => {
        console.log('Form Values:', values);
    };

    return (
        <div className="">
            <div>
                <BackButton />
            </div>
            <h2 className="text-2xl font-semibold mb-6">Add Pharmacy Medication</h2>
            <Form requiredMark={false} layout="vertical" onFinish={handleFinish} className="grid grid-cols-2 gap-6">
                {/* Medicine Details */}
                <Form.Item
                    name="medicineName"
                    label={<p>Medicine Namessss</p>}
                    rules={[{ required: true, message: 'Please enter the medicine name' }]}
                >
                    <Input placeholder="Enter medicine name" />
                </Form.Item>

                <Form.Item
                    name="company"
                    label="Company"
                    rules={[{ required: true, message: 'Please enter the company name' }]}
                >
                    <Input placeholder="Enter company name" />
                </Form.Item>

                <Form.Item
                    name="dosage"
                    label="Dosage"
                    rules={[{ required: true, message: 'Please enter the dosage' }]}
                >
                    <Input placeholder="Enter dosage (e.g., 250 mg)" />
                </Form.Item>

                <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: 'Please enter the country' }]}
                >
                    <Input placeholder="Enter country" />
                </Form.Item>

                <Form.Item
                    name="unitsPerBox"
                    label="Units per Box"
                    rules={[{ required: true, message: 'Please enter the units per box' }]}
                >
                    <Input placeholder="Enter units per box (e.g., 50pcs/Box)" />
                </Form.Item>

                <Form.Item
                    name="medicineType"
                    label="Medicine Type"
                    rules={[{ required: true, message: 'Please select a medicine type' }]}
                >
                    <Select placeholder="Select medicine type">
                        <Select.Option value="Vitamin C">Vitamin C</Select.Option>
                        <Select.Option value="Antibiotic">Antibiotic</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="form" label="From" rules={[{ required: true, message: 'Please select a form' }]}>
                    <Select placeholder="Select form">
                        <Select.Option value="Tablet">Tablet</Select.Option>
                        <Select.Option value="Syrup">Syrup</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    rules={[{ required: true, message: 'Please upload an image' }]}
                    style={{ width: '100%', height: '42px' }}
                >
                    <Upload listType="picture" maxCount={1}>
                        <Button icon={<UploadOutlined />} style={{ width: '100%', height: '42px' }}>
                            Upload Image
                        </Button>
                    </Upload>
                </Form.Item>

                {/* Pricing Details */}
                <div className="col-span-2">
                    <h3 className="text-lg font-medium mb-4">Price</h3>
                    <div className="grid grid-cols-6 gap-4">
                        <Form.Item
                            name="purchaseCost"
                            label="Purchase Cost"
                            rules={[{ required: true, message: 'Enter purchase cost' }]}
                        >
                            <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
                        </Form.Item>

                        <Form.Item name="tax" label="Tax" rules={[{ required: true, message: 'Enter tax amount' }]}>
                            <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
                        </Form.Item>

                        <Form.Item
                            name="externalExpenses"
                            label="External Expenses"
                            rules={[{ required: true, message: 'Enter external expenses' }]}
                        >
                            <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
                        </Form.Item>

                        <Form.Item
                            name="profitMargin"
                            label="Profit Margin"
                            rules={[{ required: true, message: 'Enter profit margin' }]}
                        >
                            <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
                        </Form.Item>

                        <Form.Item
                            name={'profitPercentage'}
                            label="Profit Percentage"
                            rules={[{ required: true, message: 'Enter profit percentage' }]}
                        >
                            <InputNumber type="number" placeholder="%" className="w-full" min={0} max={100} />
                        </Form.Item>
                        <Form.Item
                            name={'sellingPrice'}
                            label="Selling Price"
                            rules={[{ required: true, message: 'Enter selling price' }]}
                        >
                            <InputNumber type="number" placeholder="€" className="w-full" min={0} />
                        </Form.Item>
                    </div>
                </div>

                <Form.Item className="flex justify-start">{/*  */}</Form.Item>
                <Form.Item className="flex justify-end">
                    <Button
                        style={{
                            height: 42,
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        Upload Medication
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddPharmacyMedicine;
