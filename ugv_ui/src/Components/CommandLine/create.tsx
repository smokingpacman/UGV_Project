import * as React from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react-lite';
import { CommandLine, CommandLineState } from './CommandLine';

interface CreateCommandLineParams {
  onSend: (command: string) => void;
}

export function createCommandLine(params: CreateCommandLineParams) {
  const commandLineState = new CommandLineState();

  const updateCommand = mobx.action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      commandLineState.command = event.currentTarget.value;
    }
  );

  function onSend() {
    params.onSend(commandLineState.command);
  }

  return {
    CommandLineElement: mobxReact.observer(() => (
      <CommandLine
        command={commandLineState.command}
        onChangeValue={updateCommand}
        onSend={onSend}
        isDisabled={commandLineState.isDisabled}
      />
    )),
    commandLineState,
  };
}
