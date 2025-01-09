import { useState } from 'react';
import { Table, Select, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Option } = Select;

const ManageQuestions = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [subCategoryFilter, setSubCategoryFilter] = useState<string | undefined>(undefined);

  // Dummy data for the table
  const data = [
    {
      key: '1',
      subCategory: 'General Health',
      category: 'For Men',
      totalQuestions: 10,
    },
    {
      key: '2',
      subCategory: 'Pregnancy',
      category: 'For Women',
      totalQuestions: 5,
    },
    {
      key: '3',
      subCategory: 'Child Growth',
      category: 'For Children',
      totalQuestions: 8,
    },
    {
      key: '4',
      subCategory: 'Mental Health',
      category: 'For Men',
      totalQuestions: 12,
    },
    {
      key: '5',
      subCategory: 'Nutrition',
      category: 'For Women',
      totalQuestions: 6,
    },
  ];

  const columns = [
    {
      title: 'Srl No',
      dataIndex: 'key',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Sub-Category',
      dataIndex: 'subCategory',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Total Questions',
      dataIndex: 'totalQuestions',
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Link to={`/question-details-page/${record?._id}`}>
          <ArrowRightOutlined size={24} className="text-blue-600 font-bold" />
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageQuestions;
