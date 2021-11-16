import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { LoadState } from 'src/Shared/types';
import './ConnectionModal.scss';

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
        <div className="spinner">
          <Spin indicator={loadIcon} tip="Connecting to socket" />
        </div>
      )}
    </Modal>
  );
}
