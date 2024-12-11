import { TSidebarItem } from './generateSidebarItems';
import {
    AiOutlineUser,
    AiOutlineMedicineBox,
    AiOutlinePlusCircle,
    AiOutlineSetting,
    AiOutlineUnorderedList,
    AiOutlineLogout,
    AiOutlineSearch,
    AiOutlineStar,
} from 'react-icons/ai';
import { MdOutlineCategory, MdOutlineLocalShipping, MdOutlineArticle, MdOutlineDescription } from 'react-icons/md';
import { FiUsers, FiArrowRightCircle, FiArrowLeftCircle } from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';

const adminSidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <LuLayoutDashboard size={24} />,
    },
    {
        key: 'user-details',
        label: 'User Details',
        path: 'user-details',
        icon: <AiOutlineUser size={24} />,
    },
    {
        key: 'patient-services',
        label: 'Patient Services',
        path: 'patient-services',
        icon: <AiOutlineMedicineBox size={24} />,
    },
    {
        key: 'medication-trade',
        label: 'Medication Trade',
        path: 'medication-trade',
        icon: <AiOutlineMedicineBox size={24} />,
    },
    {
        key: 'refund',
        label: 'Refund',
        path: 'refund',
        icon: <AiOutlineUnorderedList size={24} />,
    },
    {
        key: 'medicine-service',
        label: 'Add Medicine',
        path: 'medicine-service',
        icon: <AiOutlinePlusCircle size={24} />,
    },
    {
        key: 'service-setting',
        label: 'Service Setting',
        path: 'service-setting',
        icon: <AiOutlineSetting size={24} />,
        children: [
            {
                key: 'consultation-category',
                label: 'Consultation Category',
                path: 'consultation-category',
                icon: <MdOutlineCategory size={24} />,
            },
            {
                key: 'consultation-subcategory',
                label: 'Consultation Subcategory',
                path: 'consultation-subcategory',
                icon: <FiArrowRightCircle size={24} />,
            },
            {
                key: 'shipping-setting',
                label: 'Shipping Setting',
                path: 'shipping-setting',
                icon: <MdOutlineLocalShipping size={24} />,
            },
            {
                key: 'discount-price',
                label: 'Discount Price',
                path: 'discount-price',
                icon: <AiOutlineStar size={24} />,
            },
        ],
    },
    {
        key: 'interface-setting',
        label: 'Interface Setting',
        path: 'interface-setting',
        icon: <AiOutlineSetting size={24} />,
        children: [
            {
                key: 'user-review',
                label: 'User Review',
                path: 'user-review',
                icon: <AiOutlineSearch size={24} />,
            },
            {
                key: 'about',
                label: 'About',
                path: 'about',
                icon: <MdOutlineDescription size={24} />,
            },
            {
                key: 'set-article',
                label: 'Set Article',
                path: 'set-article',
                icon: <MdOutlineArticle size={24} />,
            },
            {
                key: 'terms-conditions',
                label: 'Terms & Conditions',
                path: 'terms-conditions',
                icon: <FiArrowLeftCircle size={24} />,
            },
            {
                key: 'user-agreement',
                label: 'User Agreement',
                path: 'user-agreement',
                icon: <AiOutlineStar size={24} />,
            },
            {
                key: 'faq',
                label: 'FAQ',
                path: 'faq',
                icon: <AiOutlineSearch size={24} />,
            },
        ],
    },
    {
        key: 'service-provider',
        label: 'Service Provider',
        path: 'service-provider',
        icon: <FiUsers size={24} />,
        children: [
            {
                key: 'doctors-details',
                label: 'Doctors Details',
                path: 'doctors-details',
                icon: <AiOutlineUser size={24} />,
            },
            {
                key: 'pharmacy-details',
                label: 'Pharmacy Details',
                path: 'pharmacy-details',
                icon: <AiOutlineMedicineBox size={24} />,
            },
            {
                key: 'admin-details',
                label: 'Admin Details',
                path: 'admin-details',
                icon: <AiOutlineUser size={24} />,
            },
        ],
    },
    {
        key: 'logout',
        label: 'Log Out',
        path: 'logout',
        icon: <AiOutlineLogout size={24} />,
    },
];

export default adminSidebarItems;
