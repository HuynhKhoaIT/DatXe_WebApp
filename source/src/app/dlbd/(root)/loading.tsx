import { Box, LoadingOverlay } from "@mantine/core";

export default function Loading() {
  return (
    <Box pos="relative" h={"100vh"}>
      <LoadingOverlay
        visible={true}
        loaderProps={{ color: "blue", type: "dots" }}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
}
