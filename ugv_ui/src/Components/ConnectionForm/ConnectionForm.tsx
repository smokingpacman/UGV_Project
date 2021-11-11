import { WifiOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React from 'react';

export function ConnectionForm() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Connect
        </Button>
      </Form.Item>
    </Form>
  );
}
