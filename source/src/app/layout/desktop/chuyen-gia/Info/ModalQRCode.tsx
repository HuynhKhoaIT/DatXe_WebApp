import { Box, Button, CopyButton, Group, Input, Modal } from "@mantine/core";

import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import Logo from "@/assets/images/avatar.png";
import { IconDownload } from "@tabler/icons-react";
export default function ModalQRCode({ openModal, close, src, logoUrl }: any) {
  // const [qr, setqr] = useState("");
  // const [url, seturl] = useState("oga.datxe.com");
  const QrCodeDownload = async () => {
    const canvas: any = (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      const a = document.createElement("a");
      a.download = "QrCode.png";
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const QrCodeCopy = () => {
    navigator.clipboard.writeText(src);
  };
  return (
    <Modal
      title="QR Code"
      opened={openModal}
      onClose={close}
      lockScroll
      centered
      radius={0}
      size={360}
    >
      <div
        id="canvas"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QRCodeCanvas
          value={src}
          size={300}
          bgColor={"#ffffff"}
          fgColor={"#0a75ad"}
          level={"H"}
          includeMargin={false}
          imageSettings={{
            src: logoUrl,
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 10,
        }}
      >
        <Input readOnly value={src} w={"calc(100% - 100px)"} />
        <CopyButton value={src}>
          {({ copied, copy }) => (
            <Button
              color={copied ? "teal" : "var(--primary-color)"}
              onClick={copy}
              variant="outline"
              radius="xl"
            >
              {copied ? "Copied url" : "Copy url"}
            </Button>
          )}
        </CopyButton>
      </div>

      <Group mt={10} justify="end">
        <Button
          leftSection={<IconDownload size={16} />}
          color="var(--primary-color)"
          onClick={() => QrCodeDownload()}
        >
          Tải về
        </Button>
      </Group>
    </Modal>
  );
}
