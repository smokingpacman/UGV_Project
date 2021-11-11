import { Button } from 'antd';
import * as React from 'react';
import './CommandList.scss';

interface CommandListProps {
  isDisabled: boolean;
  onClickRandom: () => void;
  onClickRotate: () => void;
}

export function CommandList({
  isDisabled,
  onClickRandom,
  onClickRotate,
}: CommandListProps) {
  const commonProps = {
    className: 'command-button',
    disabled: isDisabled,
  };
  return (
    <div className="command-list">
      <Button {...commonProps} onClick={onClickRandom} type="primary">
        Test Random
      </Button>
      <Button {...commonProps} onClick={onClickRotate} type="primary">
        Test Rotate
      </Button>
    </div>
  );
}
