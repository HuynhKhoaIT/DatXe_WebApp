import axios from "axios";

export const uploadFileImage = async (file: File) => {
  try {
    const options = { headers: { "Content-Type": "multipart/form-data" } };
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    const response = await axios.post("/api/upload", formData, options);
    return response.data[0];
  } catch (error) {
    console.error("Error:", error);
  }
};
