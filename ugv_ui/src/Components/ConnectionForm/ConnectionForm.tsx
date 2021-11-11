import { WifiOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import './ConnectionForm.scss';

interface ConnectionFormProps {
  saveSocketUrl(socketUrl: string): void;
}

interface FormValues {
  socketUrl: string;
}

const { Title } = Typography;

export function ConnectionForm({ saveSocketUrl }: ConnectionFormProps) {
  const onFinish = ({ socketUrl }: FormValues) => {
    saveSocketUrl(socketUrl);
  };

  return (
    <Form
      name="normal_login"
      className="connection-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={3}>Establish connection with socket</Title>
      <Form.Item
        name="socketUrl"
        rules={[{ required: true, message: 'Please input an URL!' }]}
      >
        <Input
          prefix={<WifiOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Socket Url"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="connection-form-button"
        >
          Connect
        </Button>
      </Form.Item>
    </Form>
  );
}
