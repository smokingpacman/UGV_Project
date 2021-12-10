import { Button, Input } from 'antd';
import * as mobx from 'mobx';
import * as React from 'react';
import styles from './CommandLine.module.css';

export class CommandLineState {
  command = '';
  isDisabled = false;

  constructor() {
    mobx.makeObservable(this, {
      command: mobx.observable,
      isDisabled: mobx.observable,
      setIsDisabled: mobx.action,
    });
  }

  setIsDisabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}

interface CommandLineProps {
  command: string;
  isDisabled: boolean;
  onChangeValue: React.ChangeEventHandler<HTMLInputElement>;
  onSend: () => void;
}

export function CommandLine({
  command,
  isDisabled,
  onChangeValue,
  onSend,
}: CommandLineProps) {
  return (
    <div className={styles.commandLine}>
      <Input
        placeholder="Command line"
        value={command}
        disabled={isDisabled}
        onChange={onChangeValue}
      />
      <div className={styles.commandLineSpacer} />
      <Button disabled={isDisabled} onClick={onSend}>
        Send
      </Button>
    </div>
  );
}
