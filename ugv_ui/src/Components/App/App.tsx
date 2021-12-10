import React from 'react';
import styles from './App.module.css';

interface AppProps {
  ConnectionModalComponent: React.ComponentType;
  SocketStatusComponent: React.ComponentType;
  InformationChannelComponent: React.ComponentType;
  CommandComponent: React.ComponentType;
}

export function App({
  ConnectionModalComponent,
  SocketStatusComponent,
  InformationChannelComponent,
  CommandComponent,
}: AppProps) {
  return (
    <>
      <ConnectionModalComponent />
      <div className={styles.layoutWrapper}>
        <div className={styles.statusWrapper}>
          <SocketStatusComponent />
        </div>
        <div className={styles.content}>
          <div>
            <InformationChannelComponent />
          </div>
          <div>
            <CommandComponent />
          </div>
        </div>
      </div>
    </>
  );
}
