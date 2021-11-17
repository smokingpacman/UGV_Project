import { Button } from 'antd';
import * as React from 'react';
import './CommandList.scss';

interface CommandListProps {
  isDisabled: boolean;
  onClickCommandLine?: () => void;
  onClickRandom?: () => void;
  onClickRotate?: () => void;
}

export function CommandList({
  isDisabled,
  onClickCommandLine,
  onClickRandom,
  onClickRotate,
}: CommandListProps) {
  const commonProps = {
    className: 'command-button',
    disabled: isDisabled,
  };
  return (
    <div className="command-list">
      {onClickRandom && (
        <Button {...commonProps} onClick={onClickRandom} type="primary">
          Test Random
        </Button>
      )}
      {onClickRotate && (
        <Button {...commonProps} onClick={onClickRotate} type="primary">
          Test Rotate
        </Button>
      )}
      {onClickCommandLine && (
        <Button {...commonProps} onClick={onClickCommandLine} type="primary">
          Test Command Line
        </Button>
      )}
    </div>
  );
}
