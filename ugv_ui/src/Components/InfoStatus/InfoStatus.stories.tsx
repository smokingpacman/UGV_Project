import { Space } from 'antd';
import * as React from 'react';
import { SeverityLevel } from 'src/Shared/types';
import { InfoStatus } from './InfoStatus';

export default {
  component: InfoStatus,
  title: 'Components/InfoStatus',
};

export const Examples = () => (
  <Space direction="vertical">
    <InfoStatus
      severityLevel={SeverityLevel.SUCCESS}
      message="Success message"
    />
    <InfoStatus
      severityLevel={SeverityLevel.INFO}
      message="Information message"
    />
    <InfoStatus
      severityLevel={SeverityLevel.WARNING}
      message="Warning message"
    />
    <InfoStatus severityLevel={SeverityLevel.ERROR} message="Error message" />
    <InfoStatus
      severityLevel={SeverityLevel.CRITICAL_ERROR}
      message="Critical error message"
    />
  </Space>
);
