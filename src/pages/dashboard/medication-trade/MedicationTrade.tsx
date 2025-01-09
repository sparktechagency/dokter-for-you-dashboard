import { Table, Badge, Button, Tooltip, Popconfirm, Select, DatePicker, Input } from 'antd';
import { BsEye, BsSearch } from 'react-icons/bs';
import { LiaHandPointRightSolid } from 'react-icons/lia';
import { useGetConsultationsQuery } from '../../../redux/apiSlices/patientServiceSlice';

const MedicationTrade = () => {
  const { data: getConsultations, isFetching } = useGetConsultationsQuery(undefined);

  if (isFetching) return <div>Loading...</div>;
  const consultationData = getConsultations?.data;

  // Medication columns
  const medicationColumns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Reg No.',
      dataIndex: '_id',
      key: 'regNo',
      render: (regNo: string) => (
        <span className="font-mono">
          <Tooltip title={regNo}># {regNo.slice(0, 8)}</Tooltip>
        </span>
      ),
    },
    {
      title: 'Consult for',
      dataIndex: ['subCategory', 'name'],
      key: 'consultFor',
    },
    {
      title: 'Pharmacy',
      dataIndex: 'Pharmacy',
      key: 'Pharmacy',
      render: () => 'Dokter For You',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => <span className="font-mono">{new Date(createdAt).toLocaleDateString()}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'medicins',

      key: 'price',
      render: (medicins: any) => (
        <span>
          € {medicins?.map((medicin: any) => medicin?._id?.sellingPrice).reduce((a: number, b: number) => a + b, 0)}
        </span>
      ),
    },
    {
      title: 'Profit',
      dataIndex: 'medicins',

      key: 'medicins',
      render: (medicins: any) => {
        if (!medicins || medicins.length === 0) {
          return <span>€ 0</span>;
        }
        const totalSellingPrice = medicins
          .map((medicin: any) => medicin?._id?.sellingPrice || 0)
          .reduce((a: number, b: number) => a + b, 0);

        const totalPurchaseCost = medicins
          .map((medicin: any) => medicin?._id?.purchaseCost || 0) // Default to 0 if undefined
          .reduce((a: number, b: number) => a + b, 0);

        return <span>€ {totalSellingPrice - totalPurchaseCost}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'Loading...' ? 'processing' : status === 'Reported' ? 'success' : 'default'}
          text={
            <span
              style={{
                color: status === 'Loading...' ? '#FAAD14' : status === 'Reported' ? '#52C41A' : '#1890FF',
                fontWeight: 'bold',
              }}
            >
              {status}
            </span>
          }
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="Details">
            <Button
              href={`/medication-trade/details/${record._id}`}
              type="text"
              shape="circle"
              icon={<BsEye size={20} />}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure to poke your therapist?"
            onConfirm={() => console.log('Poked')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" shape="circle" icon={<LiaHandPointRightSolid color="#00B3CC" size={20} />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-title">Medication trade</h1>
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <Input
            type="text"
            prefix={<BsSearch className="mx-2" size={20} />}
            placeholder="Search"
            style={{ width: 200 }}
          />
          <Select
            placeholder="Status"
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'pending', label: 'Pending' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
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
          <DatePicker style={{ width: 200 }} placeholder="Order Date" />
          <DatePicker style={{ width: 200 }} placeholder="Delivery Date" />
        </div>
      </div>

      <div>
        <Table columns={medicationColumns} rowKey="_id" dataSource={consultationData} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default MedicationTrade;
