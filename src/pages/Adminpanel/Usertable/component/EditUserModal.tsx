import { Modal, Form, Input, message } from 'antd';
import { useMutation } from 'react-query';
import { supabase } from '@/supabase';

type UserProfile = {
  id: string;
  username: string;
  georgian_name: string;
  mobile: string;
  about: string;
};

type EditUserModalProps = {
  isOpen: boolean;
  user: UserProfile;
  onClose: () => void;
  onSuccess: () => void;
};

const updateUser = async ({
  id,
  updates,
}: {
  id: string;
  updates: Partial<UserProfile>;
}) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

const EditUserModal = ({
  isOpen,
  user,
  onClose,
  onSuccess,
}: EditUserModalProps) => {
  const [form] = Form.useForm();

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      message.success('User updated successfully');
      onSuccess();
    },
    onError: (error: any) => {
      message.error(`Failed to update user: ${error.message}`);
    },
  });

  const handleSave = async () => {
    try {
      const updatedUser = await form.validateFields();
      mutation.mutate({ id: user.id, updates: updatedUser });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={isOpen}
      onOk={handleSave}
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" initialValues={user}>
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
      </Form>
    </Modal>
  );
};

export default EditUserModal;
