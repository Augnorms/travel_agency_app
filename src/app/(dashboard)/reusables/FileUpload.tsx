import React, { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";

type FileInterface = {
  style:string;
  fileInput: string;
  fileData: File[];
  setUpdateCounter: React.Dispatch<React.SetStateAction<number>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export const FilesUploads = (props: FileInterface) => {
  const [, setDragging] = useState(false);
  const [maxFile, setMaxfile] = useState<boolean>(false);

  const handleDragEnter = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragging(false);

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    handleFiles(files);
  };

  // const handleFiles = (files: FileList | null) => {
  //   if (files) {
  //     // Convert FileList to array of File objects
  //     const fileListArray: File[] = Array.from(files);

  //     // Check file size before adding to fileData
  //     const isValidSize = fileListArray.every(
  //       (file) => file.size <= 50 * 1024 * 1024,
  //     ); // 5 MB in bytes
  //     // Check file types before adding to fileData
  //     const isValidFiles = fileListArray.every((file) => {
  //       const isImage = file.type.startsWith("image/");
  //       const isPdf = file.type === "application/pdf";
  //       const isWord = file.type === "application/msword";
  //       const isExcel =
  //         file.type ===
  //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //         file.type === "application/vnd.ms-excel";

  //       return (
  //         file.size <= 50 * 1024 * 1024 &&
  //         (isImage || isPdf || isWord || isExcel)
  //       );
  //     });

  //     if (isValidSize && isValidFiles) {
  //       setMaxfile(false);

  //       props.setFiles((prevFiles) => [...prevFiles, ...fileListArray]);
  //       // Trigger a re-render
  //       props.setUpdateCounter((prev) => prev + 1);
  //     } else {
  //       setMaxfile(true);
  //     }
  //   }
  // };

  const handleFiles = (files: FileList | null) => {
    if (files) {
      // Convert FileList to array of File objects
      const fileListArray: File[] = Array.from(files);

      // Check file types before adding to fileData
      const isValidFiles = fileListArray.every((file) => {
        const isImage = file.type.startsWith("image/");
        const isPdf = file.type === "application/pdf";
        const isWord = file.type === "application/msword";
        const isExcel =
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "application/vnd.ms-excel";
        const isVideo = file.type.startsWith("video/"); // Check if the file is a video

        return isImage || isPdf || isWord || isExcel || isVideo;
      });

      if (isValidFiles) {
        setMaxfile(false);

        props.setFiles((prevFiles) => [...prevFiles, ...fileListArray].slice(0, 1));//forcing to take only one file at a time
        // Trigger a re-render
        props.setUpdateCounter((prev) => prev + 1);
      } else {
        setMaxfile(true);
      }
    }
  };


  const handleSplice = (index: number) => {
    // Create a shallow copy of the array
    const updatedFiles = [...props.fileData];

    // Splice the array to remove the element at the specified index
    updatedFiles.splice(index, 1);

    // Update the state to trigger a re-render
    props.setFiles(updatedFiles); // Update the state directly with the new array
    props.setUpdateCounter((prev) => prev + 1); // Increment the update counter
  };

  return (
    <div
      className={`border border-dashed border-[dodgerblue] text-center p-2 ${props.style}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {props.fileData.length === 0 ? (
        <div className="w-full">
          <div className="w-full flex justify-center">
            <div className="">
              {/*image here*/}
              <FaCloudDownloadAlt size={30} color={"dodgerblue"} />
            </div>
          </div>
          <p className="font-bold text-xs text-[#131313] mt-2">
            {"images, pdf, word, excel format 5mb maxfile size"}
          </p>
          <p className="mt-2">You can drag and drop your document here</p>
        </div>
      ) : (
        <div className="w-full">
          {props.fileData.map((data, idx) => (
            <div key={idx} className="flex justify-center">
              <p>{data.name.substring(0, 30) + "..."}</p>
              <CiTrash
                style={{
                  marginTop: "5px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => handleSplice(idx)}
              />
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        id={props.fileInput}
        className="hidden"
        onChange={handleFileInputChange}
        multiple
        accept="image/*, video/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />
      <button
        className="p-2 rounded bg-gray-50"
        onClick={() => {
          const fileInput = document.getElementById(props.fileInput);
          if (fileInput) fileInput.click();
        }}
      >
        Browse Files
      </button>
      {maxFile ? (
        <div className="mt-2 text-red-500">File exceeds 5mb</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
