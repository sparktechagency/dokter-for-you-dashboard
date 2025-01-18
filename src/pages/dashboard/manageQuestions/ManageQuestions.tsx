import { useState } from 'react';
import { Table, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetConsultationSubcategoryQuery } from '../../../redux/apiSlices/consultationSlice';

const ManageQuestions = () => {
  const [subCategoryFilter, setSubCategoryFilter] = useState<string | undefined>(undefined);

  const { data: getSubCategories, isFetching } = useGetConsultationSubcategoryQuery(undefined);

  if (isFetching) return <div>Loading...</div>;

  const subCategories = getSubCategories?.data;
  console.log(subCategories);

  const columns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Sub-Category',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Total Questions',
      dataIndex: 'totalQuestions',
      key: 'totalQuestions',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <Link to={`/question-details-page/${record._id}`}>
          <ArrowRightOutlined />
        </Link>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div className="flex justify-between my-5">
        <h1 className="text-2xl font-semibold w-[30%]">Manage Questions For Sub-Categories</h1>
        <Input
          placeholder="Search by subCategory name"
          onChange={(e) => setSubCategoryFilter(e.target.value)}
          value={subCategoryFilter}
          style={{ width: 400 }}
        />
      </div>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={subCategories?.filter((subCategory: any) =>
          subCategory.name.toLowerCase().includes(subCategoryFilter?.toLowerCase() || ''),
        )}
      />
    </div>
  );
};

export default ManageQuestions;
