import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import { Button, Group } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

const ReactPrint = ({ children }: any) => {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ReactToPrint
        content={() => componentRef.current}
        copyStyles={true}
        trigger={() => (
          <Group justify="end">
            <Button
              leftSection={<IconPrinter />}
              variant="outline"
              color="blue"
            >
              In
            </Button>
          </Group>
        )}
      />
      <div ref={componentRef}>{children}</div>
    </div>
  );
};

export default ReactPrint;
