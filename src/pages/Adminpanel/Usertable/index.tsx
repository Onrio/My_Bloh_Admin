import React, { useState } from 'react';
import { Table, Tooltip, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useUsersQuery } from '@/react-query/query/admin/users';
import AddUserModal from './component/AdduserModal';
import EditUserModal from './component/EditUserModal';

const UserTable: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const { data: users, isLoading } = useUsersQuery();

  const handleAddUser = () => setIsAddModalOpen(true);
  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Georgian Name',
      dataIndex: 'georgian_name',
      key: 'georgian_name',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
      render: (text: string) => (
        <Tooltip title={text}>
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleEditUser(record)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Table</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddUser}
        className="mb-4"
      >
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey={(record) => record.id}
        pagination={false}
      />
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => setIsAddModalOpen(false)}
      />
      {editingUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          user={editingUser}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserTable;
