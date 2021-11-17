import { Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import type { BaseType } from 'antd/lib/typography/Base';
import * as React from 'react';
import { SeverityLevel } from 'src/Shared/types';

const { Text } = Typography;

interface GenericMessage {
  severityLevel: SeverityLevel;
  message: string;
}

export function InfoStatus({ severityLevel, message }: GenericMessage) {
  const textProps: { type?: BaseType; strong?: boolean } = {};

  if (severityLevel < SeverityLevel.INFO) {
    textProps.type = 'success';
  } else if (severityLevel < SeverityLevel.WARNING) {
    textProps.type = undefined;
  } else if (severityLevel < SeverityLevel.ERROR) {
    textProps.type = 'warning';
  } else if (severityLevel < SeverityLevel.CRITICAL_ERROR) {
    textProps.type = 'danger';
  } else {
    textProps.type = 'danger';
    textProps.strong = true;
  }

  return (
    <Text {...textProps}>
      {message} (
      {severityLevel === SeverityLevel.SUCCESS ? (
        <CheckOutlined />
      ) : (
        severityLevel
      )}
      )
    </Text>
  );
}
