// import React from 'react';
// import { Table, Button, Space, Tooltip, Popconfirm } from 'antd';
// import { BsEye } from 'react-icons/bs';
// import { CiLock, CiUnlock } from 'react-icons/ci';
// import type { ColumnsType } from 'antd/es/table';
// import { UserDataType } from '../types/types';

// interface Props {
//     data: UserDataType[];
//     onViewDetails: (id: string) => void;
// }

// const UserTable: React.FC<Props> = ({ data, onViewDetails(id) }) => {
//     const columns: ColumnsType<UserDataType> = [
//         {
//             title: 'S.no',
//             dataIndex: 'index',
//             key: 'sno',
//             render: (_: any, __: any, index: number) => index + 1,
//             width: '80px',
//         },
//         {
//             title: 'Name',
//             dataIndex: 'firstName',
//             key: 'firstName',
//             render: (_, record: UserDataType) => `${record?.firstName} ${record?.lastName}`,
//         },
//         {
//             title: 'email',
//             dataIndex: 'email',
//             key: 'email',
//         },
//         {
//             title: 'Phone Number',
//             dataIndex: 'contact',
//             key: 'contact',
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_, record, index: number) => (
//                 <Space size="middle">
//                     <Tooltip title="View Details">
//                         <Button onClick={() => onViewDetails(record?._id)} type="text" icon={<BsEye size={20} />} />
//                     </Tooltip>
//                     {index % 2 === 0 ? (
//                         <Tooltip title="Unlock">
//                             <Popconfirm
//                                 title="Are you sure to unlock this account?"
//                                 onConfirm={() => console.log('Unlock')}
//                                 okText="Yes"
//                                 cancelText="No"
//                             >
//                                 <Button type="text" icon={<CiUnlock size={20} />} style={{ color: 'green' }} />
//                             </Popconfirm>
//                         </Tooltip>
//                     ) : (
//                         <Tooltip title="Lock">
//                             <Popconfirm
//                                 title="Are you sure to lock this account?"
//                                 onConfirm={() => console.log('Lock')}
//                                 okText="Yes"
//                                 cancelText="No"
//                             >
//                                 <Button type="text" icon={<CiLock size={20} />} style={{ color: 'red' }} />
//                             </Popconfirm>
//                         </Tooltip>
//                     )}
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <Table
//             columns={columns}
//             dataSource={data}
//             rowSelection={{
//                 type: 'checkbox',
//                 onChange: (selectedRowKeys: any, selectedRows: any) => {
//                     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//                 },
//             }}
//             pagination={{
//                 pageSize: 10,
//             }}
//         />
//     );
// };

// export default UserTable;
