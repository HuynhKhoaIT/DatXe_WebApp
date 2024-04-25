import { Button, Card, Flex } from "@mantine/core";
import ImageItem from "./ImageItem";
import { IconPlus } from "@tabler/icons-react";

export default function DropZone({
  setImagesUrl,
  imagesUrl,
  uploadFile,
  handleChangeImage,
}: any) {
  console.log(imagesUrl);
  const addImage = () => {
    if (imagesUrl.length < 4) {
      setImagesUrl([...imagesUrl, ""]);
    }
  };
  return (
    <Flex gap={10}>
      {imagesUrl?.map((item: any, index: number) => (
        <ImageItem
          key={index}
          dataDetail={item}
          index={index}
          setImagesUrl={setImagesUrl}
          imagesUrl={imagesUrl}
          uploadFile={uploadFile}
          handleChangeImage={handleChangeImage}
        />
      ))}
      {imagesUrl?.length < 4 && (
        <Button size="lg" radius={0} onClick={addImage}>
          <IconPlus size={16} />
        </Button>
      )}
    </Flex>
  );
}
