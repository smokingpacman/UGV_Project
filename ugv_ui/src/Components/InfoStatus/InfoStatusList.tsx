import { Space } from 'antd';
import * as React from 'react';
import { InfoStatus } from './InfoStatus';
import { SocketMessage } from 'src/Shared/types';

interface InfoStatusListProps {
  messages: SocketMessage[];
}

export function InfoStatusList({ messages }: InfoStatusListProps) {
  return (
    <Space direction="vertical">
      {messages.map((message, index) => (
        <InfoStatus key={index} {...message} />
      ))}
    </Space>
  );
}
