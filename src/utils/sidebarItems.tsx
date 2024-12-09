import { TSidebarItem } from './generateSidebarItems';
import {
    AiOutlineDashboard,
    AiOutlineUser,
    AiOutlineMedicineBox,
    AiOutlineRollback,
    AiOutlinePlusCircle,
    AiOutlineSetting,
    AiOutlineLayout,
    AiOutlineTeam,
    AiOutlineLogout,
} from 'react-icons/ai';

const adminSidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <AiOutlineDashboard size={24} />,
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
        label: 'Medication trade',
        path: 'medication-trade',
        icon: <AiOutlineMedicineBox size={24} />,
    },
    {
        key: 'refund',
        label: 'Refund',
        path: 'refund',
        icon: <AiOutlineRollback size={24} />,
    },
    {
        key: 'add-medicine',
        label: 'Add Medicine',
        path: 'add-medicine',
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
            },
            {
                key: 'consultation-subcategory',
                label: 'Consultation Subcategory',
                path: 'consultation-subcategory',
            },
            {
                key: 'shipping-setting',
                label: 'Shipping Setting',
                path: 'shipping-setting',
            },
            {
                key: 'discount-price',
                label: 'Discount Price',
                path: 'discount-price',
            },
        ],
    },
    {
        key: 'interface-setting',
        label: 'Interface Setting',
        path: 'interface-setting',
        icon: <AiOutlineLayout size={24} />,
        children: [
            {
                key: 'user-review',
                label: 'User Review',
                path: 'user-review',
            },
            {
                key: 'about',
                label: 'About',
                path: 'about',
            },
            {
                key: 'set-article',
                label: 'Set Article',
                path: 'set-article',
            },
            {
                key: 'terms-conditions',
                label: 'Terms & Conditions',
                path: 'terms-conditions',
            },
            {
                key: 'user-agreement',
                label: 'User Agreement',
                path: 'user-agreement',
            },
            {
                key: 'faq',
                label: 'FAQ',
                path: 'faq',
            },
        ],
    },
    {
        key: 'service-provider',
        label: 'Service Provider',
        path: 'service-provider',
        icon: <AiOutlineTeam size={24} />,
        children: [
            {
                key: 'doctors-details',
                label: 'Doctors Details',
                path: 'doctors-details',
            },
            {
                key: 'pharmacy-details',
                label: 'Pharmacy Details',
                path: 'pharmacy-details',
            },
            {
                key: 'admin-details',
                label: 'Admin Details',
                path: 'admin-details',
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
