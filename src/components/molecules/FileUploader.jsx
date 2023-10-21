import { useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";
import "./FileUploader.css";

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const inputRef = useRef();

  const saveImage = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      const tmpFileList = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const preview_URL = URL.createObjectURL(file);
        const fileType = file.type.split("/")[0];
        if (fileType === "image") {
          tmpFileList.push({
            fileObject: files[i],
            preview_URL: preview_URL,
            type: fileType,
          });
        }
      }
      setFileList([...tmpFileList, ...fileList]);
    }
  };

  const deleteImage = (index) => {
    const tmpFileList = [...fileList];
    tmpFileList.splice(index, 1);
    setFileList(tmpFileList);
  };

  useEffect(() => {
    return () => {
      fileList?.forEach((item) => {
        URL.revokeObjectURL(item.preview_URL);
      });
    };
  }, []);

  return (
    <div className="w-96">
      <div className="flex justify-between">
        <label className="text-gray-700">매장사진</label>
        <Button style="addPhoto" onClick={() => inputRef.current.click()}>
          + 추가
        </Button>
      </div>
      <div className="flex gap-4 file-container">
        {fileList?.map((item, index) => (
          <div className="file-wrapper" key={index}>
            {item.type === "image" ? (
              <img
                src={item.preview_URL}
                alt={`Preview of ${index}`}
                className="square-image"
              />
            ) : null}
            <Button
              style="deletePhoto"
              className="delete-button"
              onClick={() => {
                deleteImage(index);
              }}>
              ×
            </Button>
          </div>
        ))}
      </div>

      <input
        type="file"
        multiple={true}
        accept="image/*"
        onChange={saveImage}
        onClick={(e) => (e.target.value = null)}
        ref={inputRef}
        className="hidden"
      />
    </div>
  );
};

export default FileUploader;
