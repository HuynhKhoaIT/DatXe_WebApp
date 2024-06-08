"use client";
import React from "react";
import { useState } from "react";
import { Button, Group, Modal } from "@mantine/core";
import styles from "./index.module.scss";
const BasicModal = ({
  top,
  children,
  title,
  onCloseModal,
  style,
  isOpen,
  onOkModal,
  onCancelModal,
  size = "600",
  footer,
  classNames,
  centered = false,
  okText = "Ok",
  cancelText = "Cancel",
  withCloseButton = true,
  fullScreen,
  radius,
}: any) => {
  return (
    <Modal
      size={size}
      style={{ top: top || "auto" }}
      opened={isOpen}
      onClose={onCloseModal}
      title={title}
      classNames={classNames}
      lockScroll={true}
      centered={centered}
      withCloseButton={withCloseButton}
      fullScreen={fullScreen}
      zIndex={999}
      radius={radius}
    >
      <div className={styles.modalContent}>{children}</div>
      {footer && (
        <Group mt={20} justify="flex-end" className={styles.modalFooter}>
          <Button
            size="lg"
            radius={0}
            className={styles.cancelButton}
            onClick={() => {
              onCancelModal();
              onCloseModal();
            }}
            color="gray"
            variant="transparent"
          >
            {cancelText}
          </Button>
          <Button
            size="lg"
            radius={0}
            className={styles.okButton}
            onClick={onOkModal}
          >
            {okText}
          </Button>
        </Group>
      )}
    </Modal>
  );
};

export default BasicModal;
