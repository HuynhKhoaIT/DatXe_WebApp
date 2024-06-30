import CropImageLink from "@/app/components/common/CropImage";
import ImageUpload from "@/assets/icons/image.svg";
import { AppConstants } from "@/constants";

export default function ImageItem({
  dataDetail,
  setImagesUrl,
  imagesUrl,
  uploadFile,
  index,
  handleChangeImage,
}: any) {
  return (
    <CropImageLink
      shape="rect"
      placeholder={"Cập nhật ảnh bìa"}
      defaultImage={dataDetail && `${AppConstants.contentRootUrl}${dataDetail}`}
      uploadFileThumbnail={uploadFile}
      aspect={1 / 1}
      idUpload={`image-uploader-${index}`}
      idResult={`image-result-${index}`}
      idImageContainer={`image-container-${index}`}
      name="banner"
      handleChangeImage
      onChange={{
        handleChangeImage,
        index,
      }}
    />
  );
}
