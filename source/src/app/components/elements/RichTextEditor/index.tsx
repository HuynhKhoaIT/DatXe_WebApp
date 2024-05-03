/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Quill from "quill";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
  }
);
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ImageResize from "quill-image-resize-module-react";

import "react-quill/dist/quill.snow.css"; // Add css for snow theme
import axios from "axios";
// import '../scss/modules/_editor.scss';
Quill.register("modules/imageResize", ImageResize);

export default function QuillEditor({
  value,
  setValue,
  defaultValue,
  placeholder,
  className,
  theme,
  style,
  disabled,
  label,
}: {
  value: string;
  setValue: (value: string) => void;
  defaultValue?: string;
  theme: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  style?: any;
  label?: string | null;
}): JSX.Element {
  const editor = useRef<any>();
  var quill;
  const quillRef = useRef<any>();

  const imageHandler = useCallback(() => {
    const editor = quillRef.current.getEditor();

    const selectLocalImage = () => {
      const input: any = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute(
        "accept",
        "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
      );
      input.click();

      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0];

        // file type is only image.
        if (/^image\//.test(file.type)) {
          uploadToServer(file);
        } else {
          console.warn("You could only upload images.");
        }
      };
    };

    const uploadToServer = async (file: any) => {
      try {
        const baseURL = "https://up-image.dlbd.vn/api/image";
        const options = { headers: { "Content-Type": "multipart/form-data" } };

        const formData = new FormData();
        if (file) {
          formData.append("image", file);
        }
        const response = await axios.post(baseURL, formData, options);

        console.log(response.data);
        insertToEditor(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const insertToEditor = (url: any) => {
      // push image url to rich editor.
      console.log("url", url);
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", url);
    };

    selectLocalImage();
  }, []);
  const modules = useMemo(
    () => ({
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          [{ color: [] }, { background: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          // handlers object will be merged with default handlers object
          image: imageHandler,
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (defaultValue) {
      const delta = editor?.current?.editor?.clipboard.convert(defaultValue);
      editor?.current?.editor.setContents(delta, "silent");
    }
  }, [defaultValue]);

  return (
    <div className={`${className}`} style={{ height: 500, fontSize: "1rem" }}>
      {label && (
        <span style={{ fontSize: 16, fontWeight: 600, color: "#3d4465" }}>
          {label}
        </span>
      )}
      <ReactQuill
        theme={theme}
        modules={{ ...modules }}
        value={value}
        forwardedRef={quillRef}
        onChange={setValue}
        placeholder={placeholder}
        readOnly={disabled}
        style={style}
      />
    </div>
  );
}
