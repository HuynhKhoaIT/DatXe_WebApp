import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
  return (
    <body style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <LoadingOverlay visible={true} />
    </body>
  );
}
