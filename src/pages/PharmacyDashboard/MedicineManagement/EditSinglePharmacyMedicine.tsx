import { Form, Input, Select, Button, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BackButton from '../../../components/ui/BackButton';

const EditSinglePharmacyMedicine = () => {
  const data = {
    medicineName: 'Paracetamol',
    company: 'GSK',
    dosage: '250 mg',
    country: 'United Kingdom',
    unitsPerBox: '50pcs/Box',
    medicineType: 'Vitamin C',
    form: 'Tablet',
    image: '',
    purchaseCost: 10,
    tax: 2,
    externalExpenses: 3,
    profitMargin: 5,
    profitPercentage: 50,
    sellingPrice: 20,
  };
  const [form] = Form.useForm();
  const {
    medicineName,
    company,
    dosage,
    country,
    unitsPerBox,
    medicineType,
    form: selectedForm,
    image,
    purchaseCost,
    tax,
    externalExpenses,
    profitMargin,
    profitPercentage,
    sellingPrice,
  } = data;
  const handleFinish = (values: any) => {
    // console.log('Form Values:', values);
  };

  return (
    <div className="">
      <div>
        <BackButton />
      </div>
      <h2 className="text-2xl font-semibold mb-6">Edit Medication</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="grid grid-cols-2 gap-6"
        initialValues={{
          medicineName,
          company,
          dosage,
          country,
          unitsPerBox,
          medicineType,
          form: selectedForm,
          image,
          purchaseCost,
          tax,
          externalExpenses,
          profitMargin,
          profitPercentage,
          sellingPrice,
        }}
      >
        {/* Medicine Details */}
        <Form.Item name="medicineName" label={<p>Medicine Name</p>}>
          <Input placeholder="Enter medicine name" />
        </Form.Item>

        <Form.Item name="company" label="Company">
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item name="dosage" label="Dosage">
          <Input placeholder="Enter dosage (e.g., 250 mg)" />
        </Form.Item>

        <Form.Item name="country" label="Country">
          <Input placeholder="Enter country" />
        </Form.Item>

        <Form.Item name="unitsPerBox" label="Units per Box">
          <Input placeholder="Enter units per box (e.g., 50pcs/Box)" />
        </Form.Item>

        <Form.Item name="medicineType" label="Medicine Type">
          <Select placeholder="Select medicine type">
            <Select.Option value="Vitamin C">Vitamin C</Select.Option>
            <Select.Option value="Antibiotic">Antibiotic</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="form" label="From">
          <Select placeholder="Select form">
            <Select.Option value="Tablet">Tablet</Select.Option>
            <Select.Option value="Syrup">Syrup</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="image" label="Image" style={{ width: '100%', height: '42px' }}>
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
            <Form.Item name="purchaseCost" label="Purchase Cost">
              <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
            </Form.Item>

            <Form.Item name="tax" label="Tax">
              <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
            </Form.Item>

            <Form.Item name="externalExpenses" label="External Expenses">
              <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
            </Form.Item>

            <Form.Item name="profitMargin" label="Profit Margin">
              <InputNumber placeholder="€" className="w-full" min={0} prefix="€" />
            </Form.Item>

            <Form.Item name={'profitPercentage'} label="Profit Percentage">
              <InputNumber type="number" placeholder="%" className="w-full" min={0} max={100} />
            </Form.Item>
            <Form.Item name={'sellingPrice'} label="Selling Price">
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
            Update Medication
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditSinglePharmacyMedicine;
