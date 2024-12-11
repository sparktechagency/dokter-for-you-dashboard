import { Table, Button, Tooltip, Popconfirm, Select, Input } from 'antd';
import { BsEye, BsPlusLg, BsSearch, BsTrash } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';

const MedicineService = () => {
    // Medication columns
    const medicationColumns = [
        {
            title: 'S.no',
            dataIndex: 'sno',
            key: 'sno',
        },
        {
            title: 'Medicine Name',
            dataIndex: 'medicineName',
            key: 'medicineName',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
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
                            href={`/medicine-service/details-medicine/${record.sno}`}
                            type="text"
                            shape="circle"
                            icon={<BsEye size={20} />}
                        />
                    </Tooltip>

                    <Tooltip title="Edit">
                        <Button
                            href={`/medicine-service/edit-medicine/${record.sno}`}
                            type="text"
                            shape="circle"
                            icon={<CiEdit color="#004B56" size={20} />}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    const medicationData = [
        {
            sno: 1,
            medicineName: 'Amoxicillin',
            country: 'China',
            from: '2024-12-10',
            medicineType: 'Tablet',
            dosage: '500mg',
            sellingPrice: '€ 25.00',
        },
        {
            sno: 4,
            medicineName: 'Amoxicillin',
            country: 'China',
            from: '2024-12-10',
            medicineType: 'Tablet',
            dosage: '500mg',
            sellingPrice: '€ 25.00',
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
                <Table columns={medicationColumns} dataSource={medicationData} pagination={{ pageSize: 5 }} />
            </div>
        </div>
    );
};

export default MedicineService;
