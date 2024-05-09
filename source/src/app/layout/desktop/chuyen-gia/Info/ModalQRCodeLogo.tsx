import { Box, Button, CopyButton, Group, Input, Modal } from "@mantine/core";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import Logo from "@/assets/images/avatar.jpeg";
import { QRCode } from "react-qrcode-logo";
import { IconDownload } from "@tabler/icons-react";
export default function ModalQRCodeLogo({
  openModal,
  close,
  src,
  logoUrl,
}: any) {
  const getCanvas = () => {
    const qr = document.getElementById("QR");
    if (!qr) return;

    return html2canvas(qr, {
      onclone: (snapshot) => {
        const qrElement = snapshot.getElementById("QR");
        if (!qrElement) return;
        qrElement.style.display = "block";
      },
    });
  };

  const downloadCode = async () => {
    const canvas = await getCanvas();

    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QR.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QRCode
          id="QR"
          value={src}
          size={300}
          bgColor={"#ffffff"}
          fgColor={"#0a75ad"}
          // ecLevel={"L"}
          logoImage={logoUrl}
          logoWidth={40}
          logoHeight={40}
          logoOpacity={1}
          removeQrCodeBehindLogo={true}
          enableCORS={true}
          // qrStyle="dots"
          // eyeRadius={40}
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
          onClick={() => downloadCode()}
        >
          Tải về
        </Button>
      </Group>
    </Modal>
  );
}
