import React from 'react';
import { Modal, Form, Input, Radio, message } from 'antd';
import { useMutation } from 'react-query';
import { supabase } from '@/supabase';

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type UserProfile = {
  username: string;
  georgian_name: string;
  mobile: string;
  about: string;
  status: 'admin' | 'user';
};

const addUser = async (user: UserProfile) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) {
    throw new Error('User not authenticated');
  }

  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', session.user.id)
    .single();

  if (existingProfile) {
    throw new Error('A profile for this user already exists');
  }

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error('Error checking existing profile');
  }

  const { error } = await supabase.from('profiles').insert({
    id: session.user.id,
    ...user,
  });

  if (error) {
    throw new Error(error.message);
  }
};

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      message.success('User added successfully');
      onSuccess();
    },
    onError: (error: any) => {
      message.error(`Failed to add user: ${error.message}`);
    },
  });

  const handleSave = async () => {
    try {
      const newUser = await form.validateFields();
      mutation.mutate(newUser);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Add User"
      open={isOpen}
      onOk={handleSave}
      onCancel={onClose}
      okText="Add"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter the username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Georgian Name"
          name="georgian_name"
          rules={[
            { required: true, message: 'Please enter the Georgian name' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[
            { required: true, message: 'Please enter the mobile number' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="About" name="about">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Radio.Group>
            <Radio value="admin">Admin</Radio>
            <Radio value="user">User</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
