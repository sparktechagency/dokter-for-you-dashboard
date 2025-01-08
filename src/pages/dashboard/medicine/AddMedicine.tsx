import { Form, Input, Select, Button, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const AddMedication = () => {
  const [form] = Form.useForm();
  const [units, setUnits] = useState<string[]>([]);
  const [unitInput, setUnitInput] = useState('');
  const [dosages, setDosages] = useState<string[]>([]);
  const [dosageInput, setDosageInput] = useState('');

  const handleAddUnit = () => {
    setUnits([...units, unitInput]);
    setUnitInput('');
  };

  const handleRemoveUnit = (index: number) => {
    setUnits(units.filter((_unit, i) => i !== index));
  };

  const handleAddDosage = () => {
    setDosages([...dosages, dosageInput]);
    setDosageInput('');
  };

  const handleRemoveDosage = (index: number) => {
    setDosages(dosages.filter((_dosage, i) => i !== index));
  };

  const onFinish = (values: any) => {
    console.log('Form Values:', { ...values, units, dosages });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Medication</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <Form.Item
              label="Medicine Name"
              name="medicineName"
              rules={[{ required: true, message: 'Please enter medicine name' }]}
            >
              <Input placeholder="Ceevit" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Square" className="w-full" />
            </Form.Item>

            <Form.Item label="Dosage" name="dosage" rules={[{ required: true, message: 'Please enter dosage' }]}>
              <Input placeholder="250 mg" className="w-full" />
            </Form.Item>

            <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter country' }]}>
              <Input placeholder="Netherlands" className="w-full" />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <Upload listType="picture-card">
                <div className="text-center">
                  <UploadOutlined className="text-2xl" />
                  <div className="mt-2">Upload Image</div>
                </div>
              </Upload>
            </Form.Item>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Form.Item
              label="Units per Box"
              name="unitPerBox"
              rules={[{ required: true, message: 'Please enter units per box' }]}
            >
              <div className="flex flex-col w-full items-center gap-2">
                <div className="flex-grow w-full flex items-center gap-2">
                  <Input
                    placeholder="50pcs/Box"
                    className="flex-grow"
                    value={unitInput}
                    onChange={(e) => setUnitInput(e.target.value)}
                  />
                  <Button type="primary" className="bg-blue-800 h-[39px]" onClick={() => handleAddUnit()}>
                    Add
                  </Button>
                </div>
                <div className="flex justify-start flex-wrap gap-2">
                  {units.map((unit, index) => (
                    <Button key={index} className="bg-gray-200 border border-gray-400 rounded-md px-2 py-1">
                      {unit}{' '}
                      <span onClick={() => handleRemoveUnit(index)} className="ml-2 cursor-pointer">
                        &times;
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </Form.Item>

            <Form.Item
              label="Dosage"
              name="dosageAmount"
              rules={[{ required: true, message: 'Please enter dosage amount' }]}
            >
              <div className="flex flex-col w-full items-center gap-2">
                <div className="flex-grow w-full flex items-center gap-2">
                  <Input
                    placeholder="250 gm"
                    className="flex-grow"
                    value={dosageInput}
                    onChange={(e) => setDosageInput(e.target.value)}
                  />
                  <Button type="primary" className="bg-blue-800  h-[39px]" onClick={() => handleAddDosage()}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dosages.map((dosage, index) => (
                    <Button key={index} className="bg-gray-200 border border-gray-400 rounded-md px-2 py-1">
                      {dosage}{' '}
                      <span onClick={() => handleRemoveDosage(index)} className="ml-2 cursor-pointer">
                        &times;
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </Form.Item>

            <Form.Item
              label="Medicine Type"
              name="medicineType"
              rules={[{ required: true, message: 'Please select medicine type' }]}
            >
              <Input placeholder="Vitamin C" className="w-full" />
            </Form.Item>

            <Form.Item label="From" name="from" rules={[{ required: true, message: 'Please select form' }]}>
              <Select
                placeholder="Select form"
                options={[
                  { value: 'tablet', label: 'Tablet' },
                  { value: 'capsule', label: 'Capsule' },
                  { value: 'syrup', label: 'Syrup' },
                ]}
              />
            </Form.Item>

            <Form.Item label="Medicine Description" name="description">
              <Input.TextArea
                rows={4}
                placeholder="Where your health is concerned, we believe you have the right to decide what to do with your body..."
                className="w-full"
              />
            </Form.Item>
          </div>
        </div>

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

export default AddMedication;
