import React, { useState } from 'react';
import { BookOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Blogtable from '@/pages/Adminpanel/Blogtable';
import Usertable from '@/pages/Adminpanel/Usertable';

const { Content, Sider } = Layout;

const items2: MenuProps['items'] = [
  {
    key: 'blogs',
    icon: React.createElement(BookOutlined),
    label: 'Blogs',
  },
  {
    key: 'users',
    icon: React.createElement(TeamOutlined),
    label: 'Users',
  },
];

const Adminlayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState('blogs');

  const renderContent = () => {
    switch (selectedKey) {
      case 'blogs':
        return <Blogtable />;
      case 'users':
        return <Usertable />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <Layout>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['blogs']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={(e) => setSelectedKey(e.key)}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: '80vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Adminlayout;
