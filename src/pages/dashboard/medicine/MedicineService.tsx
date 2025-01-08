import { Table, Button, Tooltip, Popconfirm, Select, Input } from 'antd';
import { BsEye, BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { useGetMedicineQuery } from '../../../redux/apiSlices/medicineSlice';

const MedicineService = () => {
  const { data: getMedicine, isFetching } = useGetMedicineQuery(undefined);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }
  const getMedicineData = getMedicine?.data;
  console.log(getMedicineData);

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
          <Popconfirm
            title="Are you sure to delete this medication?"
            onConfirm={() => console.log('Deleted')}
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
            placeholder="Dosage"
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'All Dosages' },
              { value: 'mg', label: 'mg' },
              { value: 'ml', label: 'ml' },
              { value: 'tablet', label: 'Tablet' },
              { value: 'capsule', label: 'Capsule' },
            ]}
          />
          <Select
            placeholder="Price"
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'All Prices' },
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
          />
          <Select
            placeholder="Country"
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'All Countries' },
              { value: 'india', label: 'India' },
              { value: 'usa', label: 'USA' },
              { value: 'uk', label: 'UK' },
            ]}
          />
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
        </div>
      </div>

      <div>
        <Table rowKey="_id" columns={medicationColumns} dataSource={getMedicineData} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default MedicineService;
