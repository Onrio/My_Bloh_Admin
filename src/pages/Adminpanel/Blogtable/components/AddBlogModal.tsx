import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useAddBlogMutation } from '@/react-query/mutations/admin/blog';

type AddBlogModalProps = {
  onSuccess: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const AddBlogModal: React.FC<AddBlogModalProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const mutation = useAddBlogMutation();

  const handleSave = async () => {
    try {
      const newBlog = await form.validateFields();
      mutation.mutate(newBlog, {
        onSuccess: () => {
          message.success('Blog added successfully');
          form.resetFields();
          onClose();
        },
        onError: (error: any) => {
          message.error(`Failed to add blog: ${error?.message}`);
        },
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Add Blog"
      open={isOpen}
      onOk={handleSave}
      onCancel={onClose}
      okText="Add"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
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

export default AddBlogModal;
