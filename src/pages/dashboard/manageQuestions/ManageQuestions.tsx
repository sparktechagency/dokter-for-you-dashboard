import { useState } from 'react';
import { Table, Select, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetConsultationSubcategoryQuery } from '../../../redux/apiSlices/consultationSlice';

const { Option } = Select;

const ManageQuestions = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
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
        <Row justify="end" style={{ marginBottom: '20px' }}>
          <Col>
            <Select
              placeholder="Select Category"
              style={{ width: 200, marginRight: '10px' }}
              onChange={setCategoryFilter}
            >
              <Option value="For Men">For Men</Option>
              <Option value="For Women">For Women</Option>
              <Option value="For Children">For Children</Option>
            </Select>
          </Col>
          <Col>
            <Select placeholder="Select Sub-Category" style={{ width: 200 }} onChange={setSubCategoryFilter}>
              <Option value="General Health">General Health</Option>
              <Option value="Pregnancy">Pregnancy</Option>
              <Option value="Child Growth">Child Growth</Option>
              <Option value="Mental Health">Mental Health</Option>
              <Option value="Nutrition">Nutrition</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <Table columns={columns} rowKey="_id" dataSource={subCategories} />
    </div>
  );
};

export default ManageQuestions;
