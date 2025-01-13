import { Button, Table, Tooltip, Popconfirm } from 'antd';
import { useState } from 'react';
import Modal from '../../../components/shared/Modal';
import { LuChevronRight } from 'react-icons/lu';
import { BsEye } from 'react-icons/bs';
import { useGetReviewQuery, useUpdateReviewMutation } from '../../../redux/apiSlices/shippingAndDiscountSlice';
import toast from 'react-hot-toast';

const UserReviews = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const { data: reviews, isFetching } = useGetReviewQuery(undefined);
  const [updateReview] = useUpdateReviewMutation();

  if (isFetching) return <div>Loading...</div>;
  const reviewData = reviews?.data || [];
  console.log(reviewData);

  const handlePublish = async (id: any) => {
    const value = {
      status: 'approved',
    };

    try {
      const response = await updateReview({ id, data: value }).unwrap();
      if (response?.success) {
        toast.success('Review published successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id: any) => {
    const value = {
      status: 'rejected',
    };

    try {
      const response = await updateReview({ id, data: value }).unwrap();
      if (response?.success) {
        toast.success('Review rejected successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'S.No',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "User's Name",
      dataIndex: 'user',
      key: 'user',
      render: (record: any) => (
        <div className="max-w-md">
          {record?.firstName} {record?.lastName}
        </div>
      ),
    },
    {
      title: 'City/Town',
      dataIndex: ['user', 'location'],
      key: 'location',
    },
    {
      title: 'Review',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <div className="max-w-md line-clamp-1"> {text}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div
          className={`px-3 py-1 rounded-full text-white ${
            status === 'approved' ? 'bg-green-600' : status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
          }`}
        >
          {status}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Tooltip title="View Review">
            <Button
              onClick={() => {
                setSelectedReview(record);
                setViewModalOpen(true);
              }}
              type="text"
              icon={<BsEye size={20} className="text-blue-600" />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to publish this review?"
            onConfirm={() => handlePublish(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              iconPosition="end"
              icon={<LuChevronRight size={18} />}
              style={{
                height: 42,
                backgroundColor: record.isPublished ? 'green' : undefined,
              }}
              type="primary"
              className={`${
                record.status === 'rejected' || record.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Publish
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const reviewModal = (
    <div className="space-y-6 my-10">
      {selectedReview ? (
        <>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <img
                src={
                  selectedReview?.user?.profile.startsWith('http')
                    ? selectedReview?.user?.profile
                    : `${import.meta.env.VITE_BASE_URL}${selectedReview?.user?.profile}`
                }
                alt=""
                className="size-20 object-cover rounded-full"
              />
              <div>
                <h1 className="text-[#0A2369] text-lg">{selectedReview?.user?.firstName}</h1>
                <p className="text-primary">{selectedReview?.user?.location}</p>
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  handlePublish(selectedReview?._id);
                }}
                iconPosition="end"
                icon={<LuChevronRight size={18} />}
                className={`bg-primary text-white py-4 px-10 ${
                  selectedReview?.status === 'rejected' || selectedReview?.status === 'approved'
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Publish
              </Button>
              <Button
                onClick={() => {
                  handleReject(selectedReview?._id);
                }}
                iconPosition="end"
                icon={<LuChevronRight size={18} />}
                className={`bg-red-600 text-white py-4 px-10 ${
                  selectedReview?.status === 'rejected' || selectedReview?.status === 'approved'
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Reject
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Review</h3>
            <p className="text-gray-600">{selectedReview?.description}</p>
          </div>
        </>
      ) : (
        <p>No review selected.</p>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-title">Patient Reviews</h1>
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <Button
            iconPosition="end"
            icon={<LuChevronRight size={18} />}
            style={{
              height: 42,
            }}
            type="primary"
          >
            Publish
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={reviewData} rowClassName="hover:bg-gray-100" pagination={{ pageSize: 10 }} />

      <Modal body={reviewModal} open={viewModalOpen} setOpen={setViewModalOpen} title="Review Details" width={600} />
    </div>
  );
};

export default UserReviews;
