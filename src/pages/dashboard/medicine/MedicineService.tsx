import { Table, Button, Tooltip, Select, Input } from 'antd';
import { BsEye, BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useState } from 'react';
import { useDeleteMedicineMutation, useGetMedicineQuery } from '../../../redux/apiSlices/medicineSlice';
import toast from 'react-hot-toast';
import { useGetCurrentUserProfileQuery } from '../../../redux/apiSlices/authSlice';

const MedicineService = () => {
  const { data: getMedicine, isFetching, refetch } = useGetMedicineQuery(undefined);

  const { data: currentUser, isLoading } = useGetCurrentUserProfileQuery(undefined);

  const [deleteMedicine] = useDeleteMedicineMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDosage, setFilterDosage] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');

  if (isFetching || isLoading) {
    return <h1>Loading...</h1>;
  }

  const getMedicineData = getMedicine?.data;
  const userProfile = currentUser?.data;
  console.log(userProfile);

  // Filtered data
  const filteredData = getMedicineData?.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDosage = filterDosage === 'all' || item.dosage === filterDosage;
    const matchesCountry = filterCountry === 'all' || item.country.toLowerCase() === filterCountry.toLowerCase();
    return matchesSearch && matchesDosage && matchesCountry;
  });

  const handleDeleteMedicine = async (medicineId: string) => {
    try {
      const response = await deleteMedicine(medicineId).unwrap();
      if (response?.success) {
        toast.success('Medicine deleted successfully!');
        refetch();
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  // Medication columns
  const medicationColumns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Medicine Id',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <span className="font-mono">
          <Tooltip title={id}># {id.slice(0, 8)}</Tooltip>
        </span>
      ),
    },
    {
      title: 'Medicine Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Form',
      dataIndex: 'form',
      key: 'form',
    },
    {
      title: 'Medicine Type',
      dataIndex: 'medicineType',
      key: 'medicineType',
    },
    {
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="View">
            <Button
              href={`/medicine-service/details-medicine/${record._id}`}
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              href={`/medicine-service/edit-medicine/${record._id}`}
              type="text"
              shape="circle"
              icon={<CiEdit color="#004B56" size={20} />}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              onClick={() => handleDeleteMedicine(record._id)}
              type="text"
              shape="circle"
              icon={<BsTrash size={20} color="red" />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-title">Medicine Lists</h1>
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <Input
            type="text"
            prefix={<BsSearch className="mx-2" size={20} />}
            placeholder="Search"
            style={{ width: 200 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            placeholder="Dosage"
            style={{ width: 200 }}
            value={filterDosage}
            onChange={(value) => setFilterDosage(value)}
            options={[
              { value: 'all', label: 'All Dosages' },
              { value: 'mg', label: 'mg' },
              { value: 'ml', label: 'ml' },
              { value: 'tablet', label: 'Tablet' },
              { value: 'capsule', label: 'Capsule' },
            ]}
          />
          <Select
            placeholder="Country"
            style={{ width: 200 }}
            value={filterCountry}
            onChange={(value) => setFilterCountry(value)}
            options={[
              { value: 'all', label: 'All Countries' },
              { value: 'netherlands', label: 'Netherlands' },
              { value: 'egypt', label: 'Egypt' },
              { value: 'france', label: 'France' },
            ]}
          />
          {userProfile?.role === 'ADMIN' && (
            <Button
              href="/medicine-service/add-medicine"
              icon={<BsPlusLg size={18} />}
              style={{
                height: 42,
              }}
              type="primary"
            >
              Add Medicine
            </Button>
          )}
        </div>
      </div>

      <div>
        <Table rowKey="_id" columns={medicationColumns} dataSource={filteredData} pagination={{ pageSize: 10 }} />
      </div>
    </div>
  );
};

export default MedicineService;
