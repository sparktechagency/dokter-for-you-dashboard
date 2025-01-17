import { Form, Input, Select, Button } from 'antd';
import whiteBg from '../../../assets/whiteBg.png';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMedicineByIdQuery, useUpdateMedicineMutation } from '../../../redux/apiSlices/medicineSlice';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

interface SubCategory {
  _id: string;
  name: string;
}

const EditMedication = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [unitInput, setUnitInput] = useState('');
  const [dosageInput, setDosageInput] = useState('');
  const [units, setUnits] = useState<string[]>([]);
  const [dosages, setDosages] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log(file);

  console.log(id);
  const { data: getMedicineById, isFetching } = useGetMedicineByIdQuery(id);
  const [updateMedicine] = useUpdateMedicineMutation();

  const medicineData = getMedicineById?.data;
  useEffect(() => {
    if (medicineData) {
      setUnits(medicineData.unitPerBox || []);
      setDosages(medicineData.dosage || []);
      setImgURL(`${import.meta.env.VITE_BASE_URL}${medicineData?.image}`);
      setSubCategories(medicineData.subCategories || []);
    }
  }, [medicineData]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  console.log(medicineData);

  const defaultValues = {
    name: medicineData?.name,
    company: medicineData?.company,
    subCategory: medicineData?.subCategory?._id,
    country: medicineData?.country,
    medicineType: medicineData?.medicineType,
    form: medicineData?.form,
    description: medicineData?.description,
    purchaseCost: medicineData?.purchaseCost?.toString() || '',
    tax: medicineData?.tax?.toString() || '',
    externalExpenses: medicineData?.externalExpenses?.toString() || '',
    profitMargin: medicineData?.profitMargin?.toString() || '',
    profitPercentage: medicineData?.profitPercentage?.toString() || '',
    sellingPrice: medicineData?.sellingPrice?.toString() || '',
    unitPerBox: medicineData?.unitPerBox || [],
    dosage: medicineData?.dosage || [],
    image: imgURL,
  };

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

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('company', values.company);
    formData.append('subCategory', values.subCategory);
    formData.append('country', values.country);
    formData.append('medicineType', values.medicineType);
    formData.append('form', values.form);
    formData.append('description', values.description || '');
    units.forEach((unit) => formData.append('unitPerBox[]', unit));
    dosages.forEach((dosage) => formData.append('dosage[]', dosage));
    formData.append('purchaseCost', values.purchaseCost);
    formData.append('tax', values.tax);
    formData.append('externalExpenses', values.externalExpenses);
    formData.append('sellingPrice', values.sellingPrice);

    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await updateMedicine({ data: formData, id }).unwrap();
      if (response?.success) {
        toast.success('Medication updated successfully!');
        navigate('/medicine-service');
      } else {
        toast.error('Failed to update medication.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the medication.');
    }
  };

  //   const handleImageClick = (imageUrl) => {
  //     setSelectedImage(imageUrl);
  //     setIsAddModalVisible(true);
  //   };

  const onChangeImage = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    } else {
      toast.error('Please upload a valid image file.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Medication</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={defaultValues} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Form.Item
              label="Medicine Name"
              name="name"
              rules={[{ required: true, message: 'Please enter medicine name' }]}
            >
              <Input placeholder="Medicine Name" />
            </Form.Item>

            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>

            <Form.Item
              label="Sub Category"
              name="subCategory"
              rules={[{ required: true, message: 'Please select sub category' }]}
            >
              <Select placeholder="Select Sub Category">
                {subCategories?.map((subCategory) => (
                  <Select.Option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter country' }]}>
              <Input placeholder="Country" />
            </Form.Item>
            <Form.Item label="Image">
              <div className="flex flex-col items-center mb-4">
                <input onChange={onChangeImage} type="file" id="img" style={{ display: 'none' }} />
                <label
                  htmlFor="img"
                  className="relative w-full h-80 cursor-pointer border border-gray-300 bg-white bg-cover bg-center shadow-sm hover:shadow-lg transition-shadow duration-300"
                  style={{
                    backgroundImage: `url(${imgURL ? imgURL : whiteBg})`,
                  }}
                >
                  {!imgURL && (
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <MdOutlineAddPhotoAlternate size={60} className="text-gray-600" />
                    </div>
                  )}
                </label>
                <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
              </div>
            </Form.Item>
          </div>

          <div className="space-y-4">
            <Form.Item
              label="Units per Box"
              name="unitPerBox"
              rules={[{ required: units.length === 0, message: 'Please enter units per box' }]}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input placeholder="Units per Box" value={unitInput} onChange={(e) => setUnitInput(e.target.value)} />
                  <Button type="primary" onClick={handleAddUnit}>
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {units.map((unit, index) => (
                    <Button key={index} className="bg-gray-200 border px-2">
                      {unit}
                      <span onClick={() => handleRemoveUnit(index)} className="ml-2 cursor-pointer">
                        &times;
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </Form.Item>

            <Form.Item
              label="Dosages"
              name="dosage"
              rules={[{ required: dosages.length === 0, message: 'Please enter dosage amount' }]}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Dosage Amount"
                    value={dosageInput}
                    onChange={(e) => setDosageInput(e.target.value)}
                  />
                  <Button type="primary" onClick={handleAddDosage}>
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {dosages.map((dosage, index) => (
                    <Button key={index} className="bg-gray-200 border px-2">
                      {dosage}
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
              <Input placeholder="Medicine Type" />
            </Form.Item>

            <Form.Item label="Form" name="form" rules={[{ required: true, message: 'Please select form' }]}>
              <Select
                options={[
                  { value: 'tablet', label: 'Tablet' },
                  { value: 'capsule', label: 'Capsule' },
                  { value: 'syrup', label: 'Syrup' },
                ]}
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} placeholder="Description" />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
          <Form.Item name="purchaseCost" label="Purchase Cost">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name="tax" label="Tax">
            <Input className="w-full" />
          </Form.Item>
          <Form.Item name="externalExpenses" label="External Expenses">
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="sellingPrice" label="Selling Price">
            <Input className="w-full" />
          </Form.Item>
        </div>

        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Update Medication
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditMedication;
