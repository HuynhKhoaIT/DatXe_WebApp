import AntdImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import edit from "@assets/icons/edit_icon.png";
function CropImageLink({
  shape,
  url,
  onCompleted,
  onError,
  aspect,
  onModalCancel,
  show,
  name,
  uploadFileThumbnail,
  defaultImage,
  placeholder,
  required,
  className,
  preFix,
  bgColor,
  color,
  showRequired,
  showEditButton,
  srcIcon,
  idUpload = "image-uploader",
  idResult = "image-result",
  idImageContainer = "image-container",
  onChange,
}: any) {
  return (
    <div className={className}>
      <AntdImgCrop
        cropShape={shape}
        aspect={aspect}
        onModalCancel={onModalCancel}
      >
        <Component
          uploadFileThumbnail={uploadFileThumbnail}
          show={show}
          url={url}
          onError={onError}
          onFinish={onCompleted}
          name={name}
          defaultImage={defaultImage}
          placeholder={placeholder}
          required={required}
          preFix={preFix}
          bgColor={bgColor}
          color={color}
          showRequired={showRequired}
          showEditButton={showEditButton}
          srcIcon={srcIcon}
          idUpload={idUpload}
          idResult={idResult}
          idImageContainer={idImageContainer}
          onChange={onChange}
        />
      </AntdImgCrop>
    </div>
  );
}
const getFile = (idUpload = "image-uploader") => {
  document?.getElementById(idUpload)?.click();
};
function Component({
  bgColor,
  preFix,
  beforeUpload,
  onFinish,
  name,
  uploadFileThumbnail,
  defaultImage,
  placeholder,
  required,
  color,
  showRequired,
  showEditButton,
  srcIcon,
  idUpload,
  idResult,
  idImageContainer,
  onChange,
}: any) {
  const [isEdit, setEdit] = useState(defaultImage && defaultImage !== "");
  useEffect(() => {
    if (defaultImage && defaultImage !== "") {
      const imageContainer: any = document.getElementById(idImageContainer);
      imageContainer.style.display = "none";
      const imagePreview: any = document.getElementById(idResult);
      imagePreview.style.display = "block";
    }
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.round}
          id={idImageContainer}
          onClick={() => getFile(idUpload)}
          style={{ backgroundColor: bgColor, color: color }}
        >
          {preFix && <img src={preFix} alt="" className={styles.preFix} />}
          <span style={{ fontSize: "14px" }}> {placeholder}</span>
        </div>

        {required && showRequired && <Required />}
      </div>

      <input
        type="file"
        name={name}
        accept="image/png, image/jpeg"
        id={idUpload}
        className={styles.imageUploader}
        onChange={async (e: any) => {
          const files = Array.from(e.target.files)[0];
          const filePreview = await beforeUpload(files, []);
          console.log(filePreview);
          try {
            const imagePreview: any = document.getElementById(idResult);
            const imageContainer: any = document.getElementById(
              idImageContainer
            );
            imagePreview.style.display = "block";
            imagePreview.src = URL.createObjectURL(filePreview);
            const res = await uploadFileThumbnail(filePreview);
            if (onChange) {
              onChange.handleChangeImage(onChange.index, res);
            }
            imageContainer.style.display = "none";
            setEdit(true);
            onFinish?.(filePreview);
          } catch (error) {
            console.log(error);
          }
        }}
      />
      <div className={styles.imagePreviewContaier}>
        <img
          id={idResult}
          className={styles.imagePreview}
          src={defaultImage}
          height="150"
          alt="Image preview"
          onClick={() => getFile(idUpload)}
        />
        {srcIcon && (
          <img
            src={srcIcon}
            onClick={() => getFile(idUpload)}
            className={styles.editIcon}
          />
        )}
      </div>
    </>
  );
}

const Required = () => {
  return (
    <span style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>
      *
    </span>
  );
};

export default CropImageLink;
