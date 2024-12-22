import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useUpdateBlogMutation } from '@/react-query/mutations/admin/blog';

type EditBlogModalProps = {
  onSuccess: () => void;
  isOpen: boolean;
  blog: {
    id: string;
    title_ka: string;
    title_en: string;
    description_ka: string;
    description_en: string;
  };
  onClose: () => void;
};

const EditBlogModal: React.FC<EditBlogModalProps> = ({
  isOpen,
  blog,
  onClose,
}) => {
  const [form] = Form.useForm();
  const mutation = useUpdateBlogMutation();

  const handleSave = async () => {
    try {
      const updatedBlog = await form.validateFields();
      mutation.mutate(
        { ...blog, ...updatedBlog },
        {
          onSuccess: () => {
            message.success('Blog updated successfully');
            onClose();
          },
          onError: (error: any) => {
            message.error(`Failed to update blog: ${error.message}`);
          },
        }
      );
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Edit Blog"
      open={isOpen}
      onOk={handleSave}
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" initialValues={blog}>
        <Form.Item
          label="Title (KA)"
          name="title_ka"
          rules={[
            { required: true, message: 'Please enter the Georgian title' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Title (EN)"
          name="title_en"
          rules={[
            { required: true, message: 'Please enter the English title' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description (KA)"
          name="description_ka"
          rules={[
            {
              required: true,
              message: 'Please enter the Georgian description',
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Description (EN)"
          name="description_en"
          rules={[
            { required: true, message: 'Please enter the English description' },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBlogModal;
