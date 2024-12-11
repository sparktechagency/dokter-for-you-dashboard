import { Button, Table, Tooltip, Popconfirm } from 'antd';
import { useState } from 'react';
import Modal from '../../../components/shared/Modal';
import { LuChevronRight } from 'react-icons/lu';
import { BsEye } from 'react-icons/bs';

// Sample data
const data = [
    {
        key: '1',
        userName: 'Christine Brooks',
        profile: '/user.svg',
        cityTown: 'New York City',
        review: 'Excellent service! The doctor was very professional and caring. The whole experience was smooth and efficient.',
        rating: 5,
        isPublished: false,
    },
    {
        key: '2',
        userName: 'Rosie Pearson',
        profile: '/user.svg',
        cityTown: 'Los Angeles',
        review: 'Very satisfied with the consultation. The doctor took time to explain everything clearly.',
        rating: 4,
        isPublished: false,
    },
    {
        key: '3',
        userName: 'Darrell Caldwell',
        profile: '/user.svg',
        cityTown: 'Chicago',
        review: 'Great experience overall. The platform is user-friendly and the doctor was very knowledgeable.',
        rating: 5,
        isPublished: true,
    },
];

const UserReviews = () => {
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<any>(null);

    const handlePublish = (record: any) => {
        console.log('Publishing review:', record);
        // Add your publish logic here
    };

    const columns = [
        {
            title: 'S.No',
            key: 'index',
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "User's Name",
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'City/Town',
            dataIndex: 'cityTown',
            key: 'cityTown',
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            render: (text: string) => (
                <div className="max-w-md">{text.length > 100 ? `${text.substring(0, 100)}...` : text}</div>
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
                        onConfirm={() => handlePublish(record)}
                        okText="Yes"
                        cancelText="No"
                    >
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
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const reviewModal = (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <img src={selectedReview?.profile} alt="" className="size-20 object-cover rounded-full" />
                    <div>
                        <h1 className="text-[#0A2369] text-lg">{selectedReview?.userName}</h1>
                        <p className="text-primary">{selectedReview?.cityTown}</p>
                    </div>
                </div>
                <div>
                    <Popconfirm
                        title="Are you sure to publish this review?"
                        onConfirm={() => handlePublish(selectedReview)}
                        okText="Yes"
                        cancelText="No"
                    >
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
                    </Popconfirm>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">Review</h3>
                <p className="text-gray-600">{selectedReview?.review}</p>
            </div>
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

            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" pagination={{ pageSize: 10 }} />

            <Modal
                body={reviewModal}
                open={viewModalOpen}
                setOpen={setViewModalOpen}
                title="Review Details"
                width={600}
            />
        </div>
    );
};

export default UserReviews;
