import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { LoadState } from 'src/Shared/types';
import styles from './ConnectionModal.module.css';

const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface ConnectionModalProps {
  ConnectionFormElement: React.ComponentType;
  SocketStatusElement: React.ComponentType;
  isModalVisible: boolean;
  loadState: LoadState;
}

export function ConnectionModal({
  ConnectionFormElement,
  SocketStatusElement,
  isModalVisible,
  loadState,
}: ConnectionModalProps) {
  return (
    <Modal
      title="Connect to socket server"
      visible={isModalVisible}
      closable={false}
      footer={null}
    >
      <SocketStatusElement />
      <br />
      {loadState === LoadState.Loaded ? (
        <ConnectionFormElement />
      ) : (
        <div className={styles.spinner}>
          <Spin indicator={loadIcon} tip="Connecting to socket" />
        </div>
      )}
    </Modal>
  );
}
