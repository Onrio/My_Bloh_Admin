import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/'); // Redirect to the home or login page
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default Unauthorized;
