import { Form, Input, Select, Button, Upload, InputNumber, Card, Space } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { useGetConsultationSubcategoryQuery } from '../../../redux/apiSlices/consultationSlice';
import { useCreateMedicineMutation } from '../../../redux/apiSlices/medicineSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const countries = [
  { label: 'Belgium', value: 'Belgium' },
  { label: 'Denmark', value: 'Denmark' },
  { label: 'Germany', value: 'Germany' },
  { label: 'France', value: 'France' },
  { label: 'Luxembourg', value: 'Luxembourg' },
  { label: 'Netherlands', value: 'Netherlands' },
  { label: 'Austria', value: 'Austria' },
  { label: 'Poland', value: 'Poland' },
  { label: 'Portugal', value: 'Portugal' },
  { label: 'Romania', value: 'Romania' },
  { label: 'Switzerland', value: 'Switzerland' },
  { label: 'Finland', value: 'Finland' },
  { label: 'Sweden', value: 'Sweden' },
  { label: 'Lithuania', value: 'Lithuania' },
  { label: 'Spain', value: 'Spain' },
];

interface Unit {
  unitPerBox: string;
  sellingPrice: number;
}

interface Variation {
  dosage: string;
  units: Unit[];
}

const AddMedication = () => {
  const [form] = Form.useForm();
  const [variations, setVariations] = useState<Variation[]>([
    { dosage: '', units: [{ unitPerBox: '', sellingPrice: 0 }] },
  ]);
  const navigate = useNavigate();
  const { data: getAllSubCategories, isFetching } = useGetConsultationSubcategoryQuery(undefined);
  const [createMedicine] = useCreateMedicineMutation();

  const editor = useRef(null);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const subCategories = getAllSubCategories?.data || [];

  const addVariation = () => {
    setVariations([...variations, { dosage: '', units: [{ unitPerBox: '', sellingPrice: 0 }] }]);
  };

  const removeVariation = (variationIndex: number) => {
    if (variations.length > 1) {
      setVariations(variations.filter((_, index) => index !== variationIndex));
    }
  };

  const updateVariationDosage = (variationIndex: number, dosage: string) => {
    const newVariations = [...variations];
    newVariations[variationIndex].dosage = dosage;
    setVariations(newVariations);
  };

  const addUnit = (variationIndex: number) => {
    const newVariations = [...variations];
    newVariations[variationIndex].units.push({ unitPerBox: '', sellingPrice: 0 });
    setVariations(newVariations);
  };

  const removeUnit = (variationIndex: number, unitIndex: number) => {
    const newVariations = [...variations];
    if (newVariations[variationIndex].units.length > 1) {
      newVariations[variationIndex].units = newVariations[variationIndex].units.filter(
        (_, index) => index !== unitIndex,
      );
      setVariations(newVariations);
    }
  };

  const updateUnit = (variationIndex: number, unitIndex: number, field: keyof Unit, value: string | number) => {
    const newVariations = [...variations];
    newVariations[variationIndex].units[unitIndex][field] = value as never;
    setVariations(newVariations);
  };

  const validateVariations = () => {
    for (let i = 0; i < variations.length; i++) {
      const variation = variations[i];
      if (!variation.dosage.trim()) {
        toast.error(`Please enter dosage for variation ${i + 1}`);
        return false;
      }
      for (let j = 0; j < variation.units.length; j++) {
        const unit = variation.units[j];
        if (!unit.unitPerBox.trim()) {
          toast.error(`Please enter unit per box for variation ${i + 1}, unit ${j + 1}`);
          return false;
        }
        if (unit.sellingPrice <= 0) {
          toast.error(`Please enter a valid selling price for variation ${i + 1}, unit ${j + 1}`);
          return false;
        }
      }
    }
    return true;
  };

  const onFinish = async (values: any) => {
    if (!validateVariations()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('company', 'Apotheek Zaandam Oost');
    formData.append('country', values.country);
    formData.append('image', values.image?.fileList[0]?.originFileObj || '');
    formData.append('form', values.from);
    formData.append('description', values.description);
    formData.append('subDescription', values.subDescription);
    formData.append('subCategory', values.subCategory);
    formData.append('variations', JSON.stringify(variations));

    try {
      const response = await createMedicine(formData).unwrap();
      if (response?.success) {
        toast.success('Medicine added successfully!');
        navigate('/medicine-service');
      } else {
        toast.error('Failed to add medicine.');
      }
    } catch (error) {
      toast.error('Failed to add medicine.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add Medication</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
          {/* Left Column */}
          <div className="space-y-4">
            <Form.Item
              label="Medicine Name"
              name="name"
              rules={[{ required: true, message: 'Please enter medicine name' }]}
            >
              <Input placeholder="Ceevit" className="w-full" />
            </Form.Item>

            <Form.Item label="Company" name="company">
              <Input placeholder="Apotheek Zaandam Oost" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Sub Category"
              name="subCategory"
              rules={[{ required: true, message: 'Please select sub category' }]}
            >
              <Select placeholder="Select a sub category" className="w-full">
                {subCategories.map((category: any) => (
                  <Select.Option key={category.id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Country" name="country">
              <Select placeholder="Select a country" className="w-full">
                {countries.map((country) => (
                  <Select.Option key={country.value} value={country.value}>
                    {country.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please upload image' }]}>
              <Upload listType="picture-card">
                <div className="text-center">
                  <UploadOutlined className="text-2xl" />
                  <div className="mt-2">Upload Image</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item label="From" name="from" rules={[{ required: true, message: 'Please select form' }]}>
              <Select
                placeholder="Select form"
                options={[
                  { value: 'tablet', label: 'Tablet' },
                  { value: 'retard-tablet', label: 'retard-tablet' },
                  { value: 'capsule', label: 'capsule' },
                  { value: 'liquid', label: 'liquid' },
                  { value: 'sublingual-tablet', label: 'Sublingual Tablet' },
                  { value: 'ovule', label: 'Ovule' },
                  { value: 'inhaler', label: 'Inhaler' },
                  { value: 'ointment', label: 'Ointment' },
                  { value: 'injection', label: 'Injection' },
                  { value: 'drops', label: 'Drops' },
                  { value: 'spray', label: 'Spray' },
                  { value: 'creams', label: 'Creams' },
                  { value: 'shampoo', label: 'Shampoo' },
                  { value: 'gel', label: 'Gel' },
                  { value: 'foam', label: 'Foam' },
                ]}
              />
            </Form.Item>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Form.Item label="Medicine Description" name="description">
              <JoditEditor
                config={{
                  readonly: false,
                  height: 400,
                }}
                ref={editor}
                value={form.getFieldValue('description')}
                onChange={(value) => form.setFieldValue('description', value)}
              />
            </Form.Item>
            <Form.Item required={false} label="Sub Description" name="subDescription">
              <JoditEditor
                config={{
                  readonly: false,
                  height: 400,
                }}
                ref={editor}
                value={form.getFieldValue('subDescription')}
                onChange={(value) => form.setFieldValue('subDescription', value)}
              />
            </Form.Item>
          </div>
        </div>

        {/* Variations Section */}
        <div className="col-span-2 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Medicine Variations</h3>
            <Button
              type="dashed"
              onClick={addVariation}
              icon={<PlusOutlined />}
              className="bg-blue-50 border-blue-300 text-blue-600"
            >
              Add Dosage Variation
            </Button>
          </div>

          <div className="space-y-6">
            {variations.map((variation, variationIndex) => (
              <Card
                key={variationIndex}
                className="border-2 border-gray-200"
                title={
                  <div className="flex justify-between items-center">
                    <span>Dosage Variation {variationIndex + 1}</span>
                    {variations.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeVariation(variationIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove Dosage
                      </Button>
                    )}
                  </div>
                }
              >
                <div className="space-y-4">
                  {/* Dosage Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosage <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g., 500mg, 250mg, 1g"
                      value={variation.dosage}
                      onChange={(e) => updateVariationDosage(variationIndex, e.target.value)}
                      className="w-full max-w-md"
                    />
                  </div>

                  {/* Units Section */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Units & Prices <span className="text-red-500">*</span>
                      </label>
                      <Button
                        type="dashed"
                        size="small"
                        onClick={() => addUnit(variationIndex)}
                        icon={<PlusOutlined />}
                        className="text-blue-600 border-blue-300"
                      >
                        Add Unit
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {variation.units.map((unit, unitIndex) => (
                        <div key={unitIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Unit per Box</label>
                            <Input
                              placeholder="e.g., 10 tablets, 20 capsules"
                              value={unit.unitPerBox}
                              onChange={(e) => updateUnit(variationIndex, unitIndex, 'unitPerBox', e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Selling Price (€)</label>
                            <InputNumber
                              placeholder="0.00"
                              min={0}
                              step={0.01}
                              value={unit.sellingPrice}
                              onChange={(value) => updateUnit(variationIndex, unitIndex, 'sellingPrice', value || 0)}
                              className="w-full"
                              formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={(value) => parseFloat(value!.replace(/€\s?|(,*)/g, '')) || 0}
                            />
                          </div>
                          {variation.units.length > 1 && (
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => removeUnit(variationIndex, unitIndex)}
                              className="text-red-500 hover:text-red-700 flex-shrink-0"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Form.Item className="flex justify-end mt-8">
          <Space>
            <Button onClick={() => navigate('/medicine-service')} className="h-10 px-6">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="h-10 px-6 bg-blue-600 hover:bg-blue-700">
              Upload Medication
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMedication;
