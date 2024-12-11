import { Button, Card, Checkbox, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface CategoryCardProps {
    icon: string;
    title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title }) => {
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

    return (
        <Card className="relative mb-4">
            <Checkbox className="absolute right-4 top-4" />
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#002B90] rounded-full flex items-center justify-center">
                    <img src={icon} alt="" />
                </div>
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <div className="flex gap-2">
                <Popconfirm
                    title="Delete Category"
                    description="Are you sure to delete this category?"
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<DeleteOutlined />} className="flex items-center">
                        Delete
                    </Button>
                </Popconfirm>
                <Button
                    onClick={() => setOpenEditCategoryModal(true)}
                    type="primary"
                    icon={<EditOutlined />}
                    className="flex items-center bg-[#002B90]"
                >
                    Edit
                </Button>
            </div>
        </Card>
    );
};

export default CategoryCard;
