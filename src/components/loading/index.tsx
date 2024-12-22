import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
