import { useState } from 'react';
import { Table, Tooltip, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AddBlogModal from './components/AddBlogModal';
import EditBlogModal from './components/EditBlogModal';
import { useBlogsQuery } from '@/react-query/query/admin/blog';
import { useQueryClient } from 'react-query';

type Blog = {
  id: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  created_at: string;
};

const BlogTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const { data: blogs, isLoading } = useBlogsQuery();
  const queryClient = useQueryClient();
  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Title (KA)',
      dataIndex: 'title_ka',
      key: 'title_ka',
      render: (text: string) => (
        <Tooltip title={text}>
          {text.length > 30 ? `${text.substring(0, 30)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: 'Title (EN)',
      dataIndex: 'title_en',
      key: 'title_en',
      render: (text: string) => (
        <Tooltip title={text}>
          {text.length > 30 ? `${text.substring(0, 30)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: 'Description (KA)',
      dataIndex: 'description_ka',
      key: 'description_ka',
      render: (text: string) => (
        <Tooltip title={text}>
          {text.length > 30 ? `${text.substring(0, 30)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: 'Description (EN)',
      dataIndex: 'description_en',
      key: 'description_en',
      render: (text: string) => (
        <Tooltip title={text}>
          {text.length > 30 ? `${text.substring(0, 30)}...` : text}
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
      title: 'Action',
      key: 'action',
      render: (_: any, record: Blog) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Table</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsAddModalOpen(true)}
        className="mb-4"
      >
        Add Blog
      </Button>
      <Table
        columns={columns}
        dataSource={blogs}
        loading={isLoading}
        rowKey={(record) => record.id}
        pagination={false}
      />

      {editingBlog && (
        <EditBlogModal
          isOpen={isModalOpen}
          blog={editingBlog}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries('blog');
            setIsModalOpen(false);
            setEditingBlog(null);
          }}
        />
      )}

      <AddBlogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries('blog');
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default BlogTable;
